'use client';

import React, { useEffect, useRef, useMemo } from 'react';

// --- Constants & Types ---

const PatternShapes = {
    Checks: 0,
    Stripes: 1,
    Edge: 2,
};

// Default preset from Framer
const DEFAULT_PRESET = {
    name: "Default",
    params: {
        scale: 1,
        rotation: 0,
        speed: 20,
        seed: 0,
        color1: { r: 15, g: 15, b: 15 }, // #050505 approx
        color2: { r: 102, g: 179, b: 255 }, // #66B3FF approx
        color3: { r: 255, g: 255, b: 255 }, // #FFFFFF
        proportion: 0.35,
        softness: 1,
        distortion: 0.25,
        swirl: 0.8,
        swirlIterations: 10,
        shapeScale: 0.1,
        shape: PatternShapes.Checks,
    },
};

// --- Shaders ---

const vertexShaderSource = `#version 300 es
layout(location = 0) in vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;

const warpFragmentShader = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv_original = uv;

    float t = .5 * u_time;
    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);

    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

// --- Utils ---

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
        a: 1
    } : { r: 0, g: 0, b: 0, a: 1 };
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return null;
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}

// --- Component ---

interface AnimatedLiquidBackgroundProps {
    className?: string;
    speed?: number;
    scale?: number;
    rotation?: number;
    color1?: string; // hex
    color2?: string; // hex
    color3?: string; // hex
    proportion?: number;
    softness?: number;
    distortion?: number;
    swirl?: number;
    swirlIterations?: number;
    shapeScale?: number;
    shape?: 'Checks' | 'Stripes' | 'Edge';
}

const AnimatedLiquidBackground: React.FC<AnimatedLiquidBackgroundProps> = ({
    className,
    speed = 25,
    scale = 1,
    rotation = 0,
    color1 = "#262626",
    color2 = "#75c1f0",
    color3 = "#ffffff",
    proportion = 35,
    softness = 100,
    distortion = 12,
    swirl = 80,
    swirlIterations = 10,
    shapeScale = 10,
    shape = "Checks",
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Convert settings to uniforms
    const uniforms = useMemo(() => {
        const c1 = hexToRgb(color1);
        const c2 = hexToRgb(color2);
        const c3 = hexToRgb(color3);

        return {
            u_scale: scale,
            u_rotation: rotation * Math.PI / 180,
            u_color1: [c1.r, c1.g, c1.b, c1.a],
            u_color2: [c2.r, c2.g, c2.b, c2.a],
            u_color3: [c3.r, c3.g, c3.b, c3.a],
            u_proportion: proportion / 100,
            u_softness: softness / 100,
            u_distortion: distortion / 50,
            u_swirl: swirl / 100,
            u_swirlIterations: swirlIterations,
            u_shapeScale: shapeScale / 100,
            u_shape: PatternShapes[shape],
        };
    }, [scale, rotation, color1, color2, color3, proportion, softness, distortion, swirl, swirlIterations, shapeScale, shape]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl2");
        if (!gl) return;

        const program = createProgram(gl, vertexShaderSource, warpFragmentShader);
        if (!program) return;

        // Attribute setup
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1
        ]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Uniform locations
        const uniformLocations: Record<string, WebGLUniformLocation | null> = {
            u_time: gl.getUniformLocation(program, "u_time"),
            u_pixelRatio: gl.getUniformLocation(program, "u_pixelRatio"),
            u_resolution: gl.getUniformLocation(program, "u_resolution"),
        };

        // Store locations for specialized uniforms
        Object.keys(uniforms).forEach(key => {
            uniformLocations[key] = gl.getUniformLocation(program, key);
        });

        let rafId: number;
        let totalTime = 0;
        let lastTime = performance.now();

        const render = (time: number) => {
            const dt = time - lastTime;
            lastTime = time;
            totalTime += dt * (speed / 100); // Scale speed

            // Resize
            const displayWidth = canvas.clientWidth * window.devicePixelRatio;
            const displayHeight = canvas.clientHeight * window.devicePixelRatio;

            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
            }

            gl.useProgram(program);

            // Default uniforms
            gl.uniform1f(uniformLocations.u_time, totalTime * 0.001);
            gl.uniform1f(uniformLocations.u_pixelRatio, window.devicePixelRatio);
            gl.uniform2f(uniformLocations.u_resolution, canvas.width, canvas.height);

            // Custom uniforms
            Object.entries(uniforms).forEach(([key, value]) => {
                const loc = uniformLocations[key];
                if (loc) {
                    if (typeof value === 'number') {
                        gl.uniform1f(loc, value);
                    } else if (Array.isArray(value)) {
                        if (value.length === 4) gl.uniform4fv(loc, value);
                        else if (value.length === 3) gl.uniform3fv(loc, value);
                        else if (value.length === 2) gl.uniform2fv(loc, value);
                    }
                }
            });

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            rafId = requestAnimationFrame(render);
        };

        rafId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(rafId);
            gl.deleteProgram(program);
        };
    }, [uniforms, speed]);

    return (
        <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%' }} />
    );
};

export default AnimatedLiquidBackground;

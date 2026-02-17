import React, { useEffect, useRef } from 'react';

interface NovaGlowProps {
    className?: string;
    hue?: number;
    hoverIntensity?: number;
    rotateOnHover?: boolean;
    colors?: [string, string, string];
}

const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255
        ]
        : [0, 0, 0];
};

export const NovaGlow: React.FC<NovaGlowProps> = ({
    className = "",
    hue = 0,
    hoverIntensity = 0.2,
    rotateOnHover = true,
    colors = ["#9C43FE", "#4CC2E9", "#101499"] // Default purple/blue theme
}) => {
    const ctnDom = useRef<HTMLDivElement>(null);

    // Shaders
    const vert = `
        precision highp float;
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const frag = `
        precision highp float;

        uniform float iTime;
        uniform vec3 iResolution;
        uniform float hue;
        uniform float hover;
        uniform float rot;
        uniform float hoverIntensity;
        // New color uniforms
        uniform vec3 baseColor1;
        uniform vec3 baseColor2;
        uniform vec3 baseColor3;
        
        varying vec2 vUv;

        vec3 rgb2yiq(vec3 c) {
            float y = dot(c, vec3(0.299, 0.587, 0.114));
            float i = dot(c, vec3(0.596, -0.274, -0.322));
            float q = dot(c, vec3(0.211, -0.523, 0.312));
            return vec3(y, i, q);
        }

        vec3 yiq2rgb(vec3 c) {
            float r = c.x + 0.956 * c.y + 0.621 * c.z;
            float g = c.x - 0.272 * c.y - 0.647 * c.z;
            float b = c.x - 1.106 * c.y + 1.703 * c.z;
            return vec3(r, g, b);
        }

        vec3 adjustHue(vec3 color, float hueDeg) {
            float hueRad = hueDeg * 3.14159265 / 180.0;
            vec3 yiq = rgb2yiq(color);
            float cosA = cos(hueRad);
            float sinA = sin(hueRad);
            float i = yiq.y * cosA - yiq.z * sinA;
            float q = yiq.y * sinA + yiq.z * cosA;
            yiq.y = i;
            yiq.z = q;
            return yiq2rgb(yiq);
        }

        vec3 hash33(vec3 p3) {
            p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
            p3 += dot(p3, p3.yxz + 19.19);
            return -1.0 + 2.0 * fract(vec3(
                p3.x + p3.y,
                p3.x + p3.z,
                p3.y + p3.z
            ) * p3.zyx);
        }

        float snoise3(vec3 p) {
            const float K1 = 0.333333333;
            const float K2 = 0.166666667;
            vec3 i = floor(p + (p.x + p.y + p.z) * K1);
            vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
            vec3 e = step(vec3(0.0), d0 - d0.yzx);
            vec3 i1 = e * (1.0 - e.zxy);
            vec3 i2 = 1.0 - e.zxy * (1.0 - e);
            vec3 d1 = d0 - (i1 - K2);
            vec3 d2 = d0 - (i2 - K1);
            vec3 d3 = d0 - 0.5;
            vec4 h = max(0.6 - vec4(
                dot(d0, d0),
                dot(d1, d1),
                dot(d2, d2),
                dot(d3, d3)
            ), 0.0);
            vec4 n = h * h * h * h * vec4(
                dot(d0, hash33(i)),
                dot(d1, hash33(i + i1)),
                dot(d2, hash33(i + i2)),
                dot(d3, hash33(i + 1.0))
            );
            return dot(vec4(31.316), n);
        }



        const float innerRadius = 0.6;
        const float noiseScale = 0.65;

        float light1(float intensity, float attenuation, float dist) {
            return intensity / (1.0 + dist * attenuation);
        }
        float light2(float intensity, float attenuation, float dist) {
            return intensity / (1.0 + dist * dist * attenuation);
        }

        vec4 draw(vec2 uv) {
            vec3 color1 = adjustHue(baseColor1, hue);
            vec3 color2 = adjustHue(baseColor2, hue);
            vec3 color3 = adjustHue(baseColor3, hue);

            float ang = atan(uv.y, uv.x);
            float len = length(uv);
            float invLen = len > 0.0 ? 1.0 / len : 0.0;

            float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
            float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
            float d0 = distance(uv, (r0 * invLen) * uv);
            float v0 = light1(1.0, 10.0, d0);
            v0 *= smoothstep(r0 * 1.05, r0, len);
            float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;

            float a = iTime * -1.0;
            vec2 pos = vec2(cos(a), sin(a)) * r0;
            float d = distance(uv, pos);
            float v1 = light2(1.5, 5.0, d);
            v1 *= light1(1.0, 50.0, d0);

            float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
            float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

            vec3 col = mix(color1, color2, cl);
            col = mix(color3, col, v0);
            
            // Calculate shape factor from geometry
            float shape = v2 * v3;
            
            // Add highlights but keep specialized masking if needed, or let alpha handle it
            // Original logic: col = (col + v1) * v2 * v3;
            // New: apply shape to alpha, keep col unmasked here so main multiplies it correctly
            col = col + v1;
            
            col = clamp(col, 0.0, 1.0);

            // Return color with shape as alpha
            // This ensures main() renders: (col * shape), which restores the original thin profile
            return vec4(col, shape);
        }

        vec4 mainImage(vec2 fragCoord) {
            vec2 center = iResolution.xy * 0.5;
            float size = min(iResolution.x, iResolution.y);
            vec2 uv = (fragCoord - center) / size * 2.0;

            float angle = rot;
            float s = sin(angle);
            float c = cos(angle);
            uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);

            uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
            uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);

            return draw(uv);
        }

        void main() {
            vec2 fragCoord = vUv * iResolution.xy;
            vec4 col = mainImage(fragCoord);
            gl_FragColor = vec4(col.rgb * col.a, col.a);
        }
    `;

    useEffect(() => {
        const container = ctnDom.current;
        if (!container) return;

        let cleanup: (() => void) | null = null;

        const initWebGL = () => {
            try {
                const canvas = document.createElement("canvas");
                const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
                if (!gl) {
                    console.error("WebGL not supported");
                    return;
                }

                gl.clearColor(0, 0, 0, 0);
                container.appendChild(canvas);

                // Create shaders
                const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
                    const shader = gl.createShader(type);
                    if (!shader) return null;
                    gl.shaderSource(shader, source);
                    gl.compileShader(shader);
                    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
                        gl.deleteShader(shader);
                        return null;
                    }
                    return shader;
                };

                const vertexShader = createShader(gl, gl.VERTEX_SHADER, vert);
                const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, frag);

                if (!vertexShader || !fragmentShader) return;

                // Create program
                const program = gl.createProgram();
                if (!program) return;
                gl.attachShader(program, vertexShader);
                gl.attachShader(program, fragmentShader);
                gl.linkProgram(program);

                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    console.error("Program link error:", gl.getProgramInfoLog(program));
                    gl.deleteProgram(program);
                    return;
                }

                // Create geometry
                const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
                const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);

                const positionBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

                const uvBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);

                // Locations
                const positionLocation = gl.getAttribLocation(program, "position");
                const uvLocation = gl.getAttribLocation(program, "uv");
                const iTimeLocation = gl.getUniformLocation(program, "iTime");
                const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
                const hueLocation = gl.getUniformLocation(program, "hue");
                const hoverLocation = gl.getUniformLocation(program, "hover");
                const rotLocation = gl.getUniformLocation(program, "rot");
                const hoverIntensityLocation = gl.getUniformLocation(program, "hoverIntensity");
                // Color locations
                const baseColor1Location = gl.getUniformLocation(program, "baseColor1");
                const baseColor2Location = gl.getUniformLocation(program, "baseColor2");
                const baseColor3Location = gl.getUniformLocation(program, "baseColor3");

                // Resize
                const resize = () => {
                    if (!container) return;
                    const dpr = window.devicePixelRatio || 1;
                    const width = container.clientWidth;
                    const height = container.clientHeight;
                    canvas.width = width * dpr;
                    canvas.height = height * dpr;
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    gl.viewport(0, 0, canvas.width, canvas.height);
                };
                window.addEventListener("resize", resize);
                resize();

                // Mouse interaction
                let targetHover = 0;
                let currentHover = 0;
                let lastTime = 0;
                let currentRot = 0;
                const rotationSpeed = 0.3;

                const handleMouseMove = (e: MouseEvent) => {
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const width = rect.width;
                    const height = rect.height;
                    const size = Math.min(width, height);
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const uvX = (x - centerX) / size * 2;
                    const uvY = (y - centerY) / size * 2;

                    if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {
                        targetHover = 1;
                    } else {
                        targetHover = 0;
                    }
                };

                const handleMouseLeave = () => {
                    targetHover = 0;
                };

                container.addEventListener("mousemove", handleMouseMove);
                container.addEventListener("mouseleave", handleMouseLeave);

                // Convert colors
                const rgb1 = hexToRgb(colors[0]);
                const rgb2 = hexToRgb(colors[1]);
                const rgb3 = hexToRgb(colors[2]);

                // Animation loop
                let rafId: number;
                const update = (t: number) => {
                    rafId = requestAnimationFrame(update);
                    const dt = (t - lastTime) * 0.001;
                    lastTime = t;

                    const effectiveHover = targetHover;
                    currentHover += (effectiveHover - currentHover) * 0.1;

                    if (rotateOnHover && effectiveHover > 0.5) {
                        currentRot += dt * rotationSpeed;
                    }

                    gl.clear(gl.COLOR_BUFFER_BIT);
                    gl.useProgram(program);

                    // Set uniforms
                    gl.uniform1f(iTimeLocation, t * 0.001);
                    gl.uniform3f(iResolutionLocation, canvas.width, canvas.height, canvas.width / canvas.height);
                    gl.uniform1f(hueLocation, hue);
                    gl.uniform1f(hoverLocation, currentHover);
                    gl.uniform1f(rotLocation, currentRot);
                    gl.uniform1f(hoverIntensityLocation, hoverIntensity);

                    // Set color uniforms
                    gl.uniform3f(baseColor1Location, rgb1[0], rgb1[1], rgb1[2]);
                    gl.uniform3f(baseColor2Location, rgb2[0], rgb2[1], rgb2[2]);
                    gl.uniform3f(baseColor3Location, rgb3[0], rgb3[1], rgb3[2]);

                    // Set attributes
                    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                    gl.enableVertexAttribArray(positionLocation);
                    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

                    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
                    gl.enableVertexAttribArray(uvLocation);
                    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

                    // Draw
                    gl.drawArrays(gl.TRIANGLES, 0, 3);
                };
                rafId = requestAnimationFrame(update);

                cleanup = () => {
                    cancelAnimationFrame(rafId);
                    window.removeEventListener("resize", resize);
                    container.removeEventListener("mousemove", handleMouseMove);
                    container.removeEventListener("mouseleave", handleMouseLeave);
                    if (container.contains(canvas)) {
                        container.removeChild(canvas);
                    }
                    gl.getExtension("WEBGL_lose_context")?.loseContext();
                };

            } catch (error) {
                console.error("Failed to initialize WebGL:", error);
            }
        };

        const timeoutId = setTimeout(initWebGL, 100); // Small delay to ensure container is ready
        return () => {
            clearTimeout(timeoutId);
            if (cleanup) cleanup();
        };
    }, [hue, hoverIntensity, rotateOnHover, colors]); // Added colors to dependency array

    return (
        <div
            ref={ctnDom}
            className={`w-full h-full relative overflow-hidden ${className}`}
        />
    );
};

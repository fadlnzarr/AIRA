'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// --- Shader Code ---

const vertexShader = `
    varying vec2 vUv;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.);
        vUv = uv;
    }
`;

// Smooth noise-based gradient shader — no orbiting blobs
const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform float uSpeed;
    uniform float uIntensity;
    uniform float uGrainIntensity;
    uniform vec3 uBackground;

    varying vec2 vUv;

    // --- Simplex-style noise ---
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                                    + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                 dot(x12.zw,x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    // Fractal Brownian Motion for layered noise
    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for (int i = 0; i < 5; i++) {
            value += amplitude * snoise(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    // Film grain
    float grain(vec2 uv, float time) {
        return fract(sin(dot(uv * uResolution * 0.5 + time, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
    }

    void main() {
        vec2 uv = vUv;
        float t = uTime * uSpeed * 0.3;

        // Create multiple noise layers with different scales and speeds
        float n1 = fbm(uv * 2.0 + vec2(t * 0.4, t * 0.3));
        float n2 = fbm(uv * 3.0 + vec2(-t * 0.3, t * 0.5) + 50.0);
        float n3 = fbm(uv * 1.5 + vec2(t * 0.2, -t * 0.4) + 100.0);

        // Normalize noise to 0-1 range
        n1 = n1 * 0.5 + 0.5;
        n2 = n2 * 0.5 + 0.5;
        n3 = n3 * 0.5 + 0.5;

        // Blend colors using noise values for smooth transitions
        vec3 color = uBackground;
        color = mix(color, uColor1, n1 * 0.6 * uIntensity);
        color = mix(color, uColor2, n2 * 0.5 * uIntensity);
        color = mix(color, uColor3, n3 * 0.4 * uIntensity);

        // Add a subtle 4th color using combined noise
        float n4 = snoise(uv * 4.0 + vec2(t * 0.6, -t * 0.2) + 200.0) * 0.5 + 0.5;
        color = mix(color, uColor4, n4 * 0.3 * uIntensity);

        // Enhance saturation slightly
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 1.2);

        // Apply grain for that smooth noisy texture
        float grainValue = grain(uv, uTime);
        color += grainValue * uGrainIntensity;

        // Subtle organic color shifting
        float ts = uTime * 0.3;
        color.r += sin(ts) * 0.01;
        color.g += cos(ts * 1.4) * 0.01;
        color.b += sin(ts * 1.2) * 0.01;

        color = clamp(color, vec3(0.0), vec3(1.0));
        gl_FragColor = vec4(color, 1.0);
    }
`;

// --- Helpers ---

function hexToRgb(hex: string): THREE.Vector3 {
    if (hex.startsWith('rgb')) {
        const matches = hex.match(/\d+/g);
        if (matches && matches.length >= 3) {
            return new THREE.Vector3(
                parseInt(matches[0]) / 255,
                parseInt(matches[1]) / 255,
                parseInt(matches[2]) / 255
            );
        }
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return new THREE.Vector3(
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255
        );
    }
    return new THREE.Vector3(0.545, 0.361, 0.965);
}

// --- Component ---

export interface LiquidGradientCardBgProps {
    color1?: string;
    color2?: string;
    color3?: string;
    color4?: string;
    backgroundColor?: string;
    speed?: number;
    intensity?: number;
    className?: string;
}

export function LiquidGradientCardBg({
    color1 = '#8B5CF6',
    color2 = '#6366F1',
    color3 = '#8B5CF6',
    color4 = '#6366F1',
    backgroundColor = '#0a0a1e',
    speed = 1.0,
    intensity = 0.9,
    className,
}: LiquidGradientCardBgProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const width = container.clientWidth || 400;
        const height = container.clientHeight || 600;

        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'display:block;width:100%;height:100%;position:absolute;top:0;left:0;';
        container.appendChild(canvas);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' });
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 50;

        const clock = new THREE.Clock();

        const fovRad = camera.fov * Math.PI / 180;
        const viewHeight = Math.abs(camera.position.z * Math.tan(fovRad / 2) * 2);
        const viewWidth = viewHeight * camera.aspect;

        const geometry = new THREE.PlaneGeometry(viewWidth, viewHeight, 1, 1);
        const uniforms = {
            uTime: { value: Math.random() * 100 }, // Random offset so each card looks different
            uResolution: { value: new THREE.Vector2(width, height) },
            uColor1: { value: hexToRgb(color1) },
            uColor2: { value: hexToRgb(color2) },
            uColor3: { value: hexToRgb(color3) },
            uColor4: { value: hexToRgb(color4) },
            uSpeed: { value: speed },
            uIntensity: { value: intensity },
            uGrainIntensity: { value: 0.05 },
            uBackground: { value: hexToRgb(backgroundColor) },
        };

        const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer.render(scene, camera);

        let rafId: number;
        const animate = () => {
            const delta = Math.min(clock.getDelta(), 0.1);
            uniforms.uTime.value += delta;
            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        };
        animate();

        const resizeObserver = new ResizeObserver(() => {
            const w = container.clientWidth || 400;
            const h = container.clientHeight || 600;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
            uniforms.uResolution.value.set(w, h);

            const newFovRad = camera.fov * Math.PI / 180;
            const newViewHeight = Math.abs(camera.position.z * Math.tan(newFovRad / 2) * 2);
            const newViewWidth = newViewHeight * camera.aspect;
            mesh.geometry.dispose();
            mesh.geometry = new THREE.PlaneGeometry(newViewWidth, newViewHeight, 1, 1);
        });
        resizeObserver.observe(container);

        return () => {
            cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        };
    }, [color1, color2, color3, color4, backgroundColor, speed, intensity]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        />
    );
}

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import { RoundedBox, Float, Sparkles, Ring } from '@react-three/drei';
import * as THREE from 'three';

const AILogo = () => {
    // Premium "Obsidian Glass" Shader
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                distort: { value: 0.3 },
                speed: { value: 2 },
                emissiveIntensity: { value: 1.0 },
            },
            vertexShader: `
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;
                varying vec2 vUv;
                
                void main() {
                    vPosition = position;
                    vNormal = normalize(normalMatrix * normal);
                    vUv = uv;
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float distort;
                uniform float speed;
                uniform float emissiveIntensity;
                
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;
                varying vec2 vUv;
                
                // Obsidian / Smoked Glass Colors
                vec3 baseColor = vec3(0.02, 0.02, 0.02);   // Pure Black
                vec3 rimColor = vec3(1.0, 1.0, 1.0);       // White Rim
                
                // Smooth noise for subtle surface variation
                float noise(vec3 p) {
                    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
                }
                
                float smoothNoise(vec3 p) {
                    vec3 i = floor(p);
                    vec3 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    
                    float n = mix(
                        mix(mix(noise(i), noise(i + vec3(1.0, 0.0, 0.0)), f.x),
                            mix(noise(i + vec3(0.0, 1.0, 0.0)), noise(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
                        mix(mix(noise(i + vec3(0.0, 0.0, 1.0)), noise(i + vec3(1.0, 0.0, 1.0)), f.x),
                            mix(noise(i + vec3(0.0, 1.0, 1.0)), noise(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z
                    );
                    return n;
                }
                
                void main() {
                    vec3 normal = normalize(vNormal);
                    vec3 viewDir = normalize(-vWorldPosition);
                    
                    // 1. Distortion (Subtle Liquid feel)
                    float t = time * speed * 0.5;
                    float n = smoothNoise(vPosition * 2.0 + vec3(t)) * 0.5 + 0.5;
                    
                    // 2. Base Color (Dark Obsidian)
                    vec3 color = baseColor;
                    
                    // 3. Fresnel (Glass Rim Effect) - Sharp and bright
                    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
                    color += rimColor * fresnel * 0.5; // Add white rim
                    
                    // 4. Specular Highlight (Polished Gloss)
                    vec3 lightDir = normalize(vec3(10.0, 10.0, 10.0)); // Main light source
                    vec3 halfVector = normalize(lightDir + viewDir);
                    float NdotH = max(dot(normal, halfVector), 0.0);
                    float specular = pow(NdotH, 64.0); // High exponent for sharp gloss
                    
                    // Secondary light/reflection
                    vec3 lightDir2 = normalize(vec3(-5.0, -5.0, -5.0));
                    vec3 halfVector2 = normalize(lightDir2 + viewDir);
                    float NdotH2 = max(dot(normal, halfVector2), 0.0);
                    float specular2 = pow(NdotH2, 32.0);
                    
                    color += vec3(1.0) * specular * 0.8; // Sharp primary reflection
                    color += vec3(0.5) * specular2 * 0.3; // Softer secondary reflection
                    
                    // 5. Opacity (Glassy)
                    // Center is transparent (0.2), edges are opaque (fresnel)
                    float alpha = 0.2 + (fresnel * 0.8);
                    alpha = clamp(alpha, 0.2, 0.95);
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        });
    }, []);

    const logoRef = useRef<THREE.Group>(null);
    const groupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [isHovered, setIsHovered] = useState(false);
    const hoverScale = useRef(1);
    const hoverDistort = useRef(0.4);
    const hoverEmissive = useRef(1.2);
    const hoverState = useRef(false);

    // Entrance Animation State
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    // Refs for individual pillars to animate them
    const centerRef = useRef<THREE.Mesh>(null);
    const midLeftRef = useRef<THREE.Mesh>(null);
    const midRightRef = useRef<THREE.Mesh>(null);
    const outerLeftRef = useRef<THREE.Mesh>(null);
    const outerRightRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (!logoRef.current || !groupRef.current || !materialRef.current) return;

        // Entrance Animation: Lerp from bottom (-15) to 0
        const targetY = loaded ? 0 : -15;

        groupRef.current.position.y = THREE.MathUtils.lerp(
            groupRef.current.position.y,
            targetY,
            0.05 // Smooth ease-out
        );

        const { x, y } = state.pointer;
        const stableHovered = hoverState.current;
        const t = state.clock.elapsedTime;

        // --- Voice Waveform Animation ---
        const intensity = stableHovered ? 1.5 : 0.8;
        const speed = stableHovered ? 12 : 8;

        if (centerRef.current) {
            centerRef.current.scale.y = 1 + Math.sin(t * speed) * 0.15 * intensity;
        }
        if (midLeftRef.current) {
            midLeftRef.current.scale.y = 1 + Math.sin(t * speed * 0.9 + 1) * 0.2 * intensity;
        }
        if (midRightRef.current) {
            midRightRef.current.scale.y = 1 + Math.sin(t * speed * 0.9 + 2) * 0.2 * intensity;
        }
        if (outerLeftRef.current) {
            outerLeftRef.current.scale.y = 1 + Math.sin(t * speed * 1.2 + 3) * 0.25 * intensity;
        }
        if (outerRightRef.current) {
            outerRightRef.current.scale.y = 1 + Math.sin(t * speed * 1.2 + 4) * 0.25 * intensity;
        }

        // Update shader time
        materialRef.current.uniforms.time.value += delta;

        // Interaction Logic: Rotate the logo group based on mouse
        const rotationIntensity = stableHovered ? 1.2 : 0.8;
        logoRef.current.rotation.x = THREE.MathUtils.lerp(
            logoRef.current.rotation.x,
            y * rotationIntensity,
            0.1
        );
        logoRef.current.rotation.y = THREE.MathUtils.lerp(
            logoRef.current.rotation.y,
            x * rotationIntensity,
            0.1
        );

        // Parallax position shift
        const positionIntensity = stableHovered ? 0.8 : 0.5;
        logoRef.current.position.x = THREE.MathUtils.lerp(
            logoRef.current.position.x,
            x * positionIntensity,
            0.05
        );
        logoRef.current.position.y = THREE.MathUtils.lerp(
            logoRef.current.position.y,
            y * positionIntensity,
            0.05
        );

        // Hover scale
        const targetScale = stableHovered ? 1.15 : 1;
        hoverScale.current = THREE.MathUtils.lerp(hoverScale.current, targetScale, 0.08);
        groupRef.current.scale.set(
            hoverScale.current,
            hoverScale.current,
            hoverScale.current
        );

        // Hover distortion
        const targetDistort = stableHovered ? 0.7 : 0.4;
        hoverDistort.current = THREE.MathUtils.lerp(hoverDistort.current, targetDistort, 0.08);
        materialRef.current.uniforms.distort.value = hoverDistort.current;

        // Hover emissive
        const targetEmissive = stableHovered ? 1.8 : 1.2;
        hoverEmissive.current = THREE.MathUtils.lerp(hoverEmissive.current, targetEmissive, 0.08);
        materialRef.current.uniforms.emissiveIntensity.value = hoverEmissive.current;

        // Hover speed (shader)
        const targetSpeed = stableHovered ? 4 : 3;
        materialRef.current.uniforms.speed.value = THREE.MathUtils.lerp(
            materialRef.current.uniforms.speed.value,
            targetSpeed,
            0.08
        );
    });

    const handlePointerEnter = (e: any) => {
        e.stopPropagation();
        setIsHovered(true);
        hoverState.current = true;
    };

    const handlePointerLeave = (e: any) => {
        e.stopPropagation();
        setIsHovered(false);
        hoverState.current = false;
    };

    return (
        <group ref={groupRef} position={[0, -15, 0]}>
            <Float
                speed={isHovered ? 3 : 2}
                rotationIntensity={isHovered ? 0.8 : 0.5}
                floatIntensity={isHovered ? 0.7 : 0.5}
                floatingRange={[-0.2, 0.2]}
            >
                <group
                    ref={logoRef}
                    scale={0.8}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                >
                    {/* Central Pillar */}
                    <RoundedBox ref={centerRef} args={[0.5, 3.0, 0.5]} radius={0.15} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow>
                        <primitive ref={materialRef} object={shaderMaterial} attach="material" />
                    </RoundedBox>

                    {/* Mid Pillars */}
                    <RoundedBox ref={midLeftRef} args={[0.5, 1.33, 0.5]} radius={0.15} smoothness={4} position={[-0.83, 0, 0]} castShadow receiveShadow>
                        <primitive object={shaderMaterial} attach="material" />
                    </RoundedBox>
                    <RoundedBox ref={midRightRef} args={[0.5, 1.33, 0.5]} radius={0.15} smoothness={4} position={[0.83, 0, 0]} castShadow receiveShadow>
                        <primitive object={shaderMaterial} attach="material" />
                    </RoundedBox>

                    {/* Outer Pillars */}
                    <RoundedBox ref={outerLeftRef} args={[0.5, 0.33, 0.5]} radius={0.15} smoothness={4} position={[-1.66, 0, 0]} castShadow receiveShadow>
                        <primitive object={shaderMaterial} attach="material" />
                    </RoundedBox>
                    <RoundedBox ref={outerRightRef} args={[0.5, 0.33, 0.5]} radius={0.15} smoothness={4} position={[1.66, 0, 0]} castShadow receiveShadow>
                        <primitive object={shaderMaterial} attach="material" />
                    </RoundedBox>

                    {/* Invisible Hitbox for continuous interaction */}
                    <mesh>
                        <boxGeometry args={[4.5, 3.5, 1]} />
                        <meshBasicMaterial color="red" transparent opacity={0} depthWrite={false} />
                    </mesh>
                </group>

                {/* Internal Light - Crisp White/Blue tint for glass look */}
                <pointLight
                    intensity={isHovered ? 20 : 15}
                    color={isHovered ? "#ffffff" : "#e0e0e0"}
                    distance={isHovered ? 6 : 5}
                    decay={2}
                />
            </Float>

            {/* Orbiting Particles - Subtle glass glints */}
            <Sparkles
                count={isHovered ? 200 : 100}
                scale={isHovered ? 7 : 6}
                size={isHovered ? 2.0 : 1.5}
                speed={isHovered ? 0.4 : 0.2}
                opacity={isHovered ? 0.8 : 0.5}
                color="#ffffff"
            />

            {/* Tech Rings - Dark Grey */}
            <group rotation={[Math.PI / 3, 0, 0]}>
                <Ring
                    args={[2.5, 2.52, 64]}
                    opacity={0.1}
                    transparent
                    raycast={() => null}
                >
                    <meshBasicMaterial color="#000000" side={THREE.DoubleSide} transparent opacity={0.15} />
                </Ring>
            </group>
            <group rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
                <Ring
                    args={[3, 3.02, 64]}
                    opacity={0.05}
                    transparent
                    raycast={() => null}
                >
                    <meshBasicMaterial color="#333333" side={THREE.DoubleSide} transparent opacity={0.1} />
                </Ring>
            </group>
        </group>
    );
};

export const HeroAIOrb: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "200px" });

    return (
        <div ref={containerRef} className="w-full h-full absolute inset-0 z-10">
            {isInView && (
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    shadows
                    dpr={[1, 2]}
                    gl={{
                        powerPreference: "high-performance",
                        antialias: false,
                        stencil: false,
                        depth: true
                    }}
                >
                    {/* Global Lighting - Cooler and Sharp for Glass */}
                    <ambientLight intensity={0.4} />

                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.5}
                        penumbra={0.5} // Sharper shadows
                        intensity={8}
                        castShadow
                        color="#ffffff"
                    />

                    {/* Fill light - Blue tint for cool glass effect */}
                    <pointLight position={[-10, -10, -10]} intensity={3} color="#e0f0ff" />

                    {/* Back light - Strong rim light */}
                    <pointLight position={[0, -5, -10]} intensity={5} color="#ffffff" />

                    <AILogo />

                    {/* Light Fog */}
                    <fog attach="fog" args={['#F2F2F0', 5, 20]} />
                </Canvas>
            )}
        </div>
    );
};

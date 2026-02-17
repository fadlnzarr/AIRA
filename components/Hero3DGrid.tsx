import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const CubeGrid = () => {
    const groupRef = useRef<THREE.Group>(null);

    // Grid Configuration
    const rows = 6;
    const cols = 4;
    const gap = 1.2;

    // Calculate grid positions to center it
    const grid = useMemo(() => {
        const positions = [];
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                positions.push({
                    position: [
                        (x - (cols - 1) / 2) * gap,
                        (y - (rows - 1) / 2) * gap,
                        0
                    ] as [number, number, number],
                    key: `${x}-${y}`
                });
            }
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Smooth rotation based on mouse position
        const { x, y } = state.pointer;

        // Lerp rotation for smooth follow effect
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.2, 0.1);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.2, 0.1);
    });

    return (
        <group ref={groupRef}>
            {/* Central Red Glow Light */}
            <pointLight position={[0, 0, -2]} intensity={2} color="#ff3300" distance={10} decay={2} />

            {grid.map((item, i) => (
                <Float
                    key={item.key}
                    speed={2}
                    rotationIntensity={0.1}
                    floatIntensity={0.2}
                    floatingRange={[-0.1, 0.1]}
                >
                    <RoundedBox
                        args={[1, 1, 1]} // Width, Height, Depth
                        radius={0.15}
                        smoothness={4}
                        position={item.position}
                        castShadow
                        receiveShadow
                    >
                        <meshStandardMaterial
                            color="#ffffff"
                            roughness={0.1}
                            metalness={0.1}
                            envMapIntensity={1}
                        />
                    </RoundedBox>
                </Float>
            ))}
        </group>
    );
};

export const Hero3DGrid: React.FC = () => {
    return (
        <div className="w-full h-full absolute inset-0 z-10">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 35 }}
                shadows
                dpr={[1, 2]} // optimize for high DPI screens
            >
                {/* Lighting Environment */}
                <ambientLight intensity={0.2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />

                {/* 3D Content */}
                <CubeGrid />

                {/* Environment for Reflections */}
                <Environment preset="city" />

                {/* Soft Contact Shadow underneath */}
                {/* <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} /> */}
            </Canvas>
        </div>
    );
};

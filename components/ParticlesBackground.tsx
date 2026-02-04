import React, { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, ISourceOptions } from '@tsparticles/engine';

export const ParticlesBackground: React.FC = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(async (container?: Container) => {
        // Particles loaded
    }, []);

    const options: ISourceOptions = {
        background: {
            color: {
                value: 'transparent',
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'grab',
                    parallax: {
                        enable: true,
                        force: 60,
                        smooth: 10,
                    },
                },
                onClick: {
                    enable: true,
                    mode: 'push',
                },
            },
            modes: {
                grab: {
                    distance: 200,
                    links: {
                        opacity: 0.3,
                        color: '#ffffff',
                    },
                },
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: '#ffffff',
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.08,
                width: 1,
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: {
                    default: 'out',
                },
                random: true,
                speed: 0.8,
                straight: false,
                attract: {
                    enable: false,
                },
            },
            number: {
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080,
                },
                value: 80,
            },
            opacity: {
                value: {
                    min: 0.1,
                    max: 0.5,
                },
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                },
            },
            shape: {
                type: 'circle',
            },
            size: {
                value: {
                    min: 1,
                    max: 3,
                },
                animation: {
                    enable: true,
                    speed: 2,
                    sync: false,
                },
            },
            twinkle: {
                particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1,
                    color: {
                        value: '#ffffff',
                    },
                },
            },
        },
        detectRetina: true,
        smooth: true,
    };

    if (!init) return null;

    return (
        <div className="absolute inset-0 z-0">
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />
        </div>
    );
};

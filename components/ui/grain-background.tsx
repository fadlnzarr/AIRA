import React from 'react';

/**
 * GrainBackground — A global noise/grain overlay for the dark theme.
 * Uses an inline SVG feTurbulence filter for a self-contained, performant grain effect.
 * No external image dependencies.
 */
export const GrainBackground: React.FC = () => {
    return (
        <>
            {/* SVG filter definition (hidden, used by the overlay div) */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden>
                <filter id="grain-filter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
            </svg>

            {/* Noise overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    zIndex: 50,
                    pointerEvents: 'none',
                    filter: 'url(#grain-filter)',
                    opacity: 0.04,
                    mixBlendMode: 'overlay',
                }}
            />

            {/* Black base background */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -10,
                    pointerEvents: 'none',
                    backgroundColor: '#000000',
                }}
            />
        </>
    );
};

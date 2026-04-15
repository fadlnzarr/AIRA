
import React, { useState, useCallback } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface DataStatusBarProps {
    loading: boolean;
    error: string | null;
    lastUpdated: Date | null;
    onRefresh: () => void;
}

function timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 10) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export const DataStatusBar: React.FC<DataStatusBarProps> = ({ loading, error, lastUpdated, onRefresh }) => {
    const [, setTick] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);

    // Re-render every 10s to update "time ago"
    React.useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 10_000);
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = useCallback(() => {
        setIsSpinning(true);
        onRefresh();
        // Keep spinning for at least 800ms for a satisfying animation
        setTimeout(() => setIsSpinning(false), 800);
    }, [onRefresh]);

    const spinning = isSpinning || loading;

    return (
        <div className="flex items-center gap-3 text-xs text-[#1A1A1A]/50">
            {error && (
                <span className="flex items-center gap-1 text-red-500">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </span>
            )}

            {lastUpdated && !error && (
                <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Live · Updated {timeAgo(lastUpdated)}
                </span>
            )}

            <button
                onClick={handleRefresh}
                disabled={spinning}
                className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-[#1A1A1A]/5 active:scale-95 transition-all duration-200 disabled:opacity-60"
                title="Refresh data"
            >
                <RefreshCw
                    className="w-3.5 h-3.5 transition-transform duration-700 ease-in-out group-hover:rotate-45"
                    style={{
                        transform: spinning ? 'rotate(360deg)' : undefined,
                        animation: spinning ? 'refresh-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : undefined,
                    }}
                />
                <span className="transition-colors group-hover:text-[#1A1A1A]/70">
                    {spinning ? 'Syncing…' : 'Refresh'}
                </span>
            </button>

            {/* Inline keyframes for the spin animation */}
            <style>{`
                @keyframes refresh-spin {
                    0% { transform: rotate(0deg) scale(1); }
                    25% { transform: rotate(120deg) scale(1.15); }
                    50% { transform: rotate(240deg) scale(1.1); }
                    100% { transform: rotate(360deg) scale(1); }
                }
            `}</style>
        </div>
    );
};

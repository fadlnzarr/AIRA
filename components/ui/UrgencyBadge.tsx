
import React from 'react';

type UrgencyLevel = 'high' | 'medium' | 'low';

interface UrgencyBadgeProps {
    level: UrgencyLevel;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ level }) => {
    const getStyles = () => {
        switch (level) {
            case 'high':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'medium':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'low':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        }
    };

    const getLabel = () => {
        switch (level) {
            case 'high': return 'High Priority';
            case 'medium': return 'Medium';
            case 'low': return 'Low';
        }
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles()}`}>
            {level === 'high' && (
                <span className="relative flex h-1.5 w-1.5 mr-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                </span>
            )}
            {getLabel()}
        </span>
    );
};

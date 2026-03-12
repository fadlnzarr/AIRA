
import React from 'react';

type StatusType = 'success' | 'neutral' | 'warning' | 'error';

interface StatusBadgeProps {
    status: StatusType;
    children: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children }) => {
    const getStyles = () => {
        switch (status) {
            case 'success':
                return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'warning':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'error':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'neutral':
            default:
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        }
    };

    const getDotColor = () => {
        switch (status) {
            case 'success': return 'bg-green-400';
            case 'warning': return 'bg-amber-400';
            case 'error': return 'bg-red-400';
            case 'neutral': default: return 'bg-blue-400';
        }
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles()}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`} />
            {children}
        </span>
    );
};

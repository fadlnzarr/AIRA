
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
}

interface CustomDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    value,
    onChange,
    placeholder,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(o => o.value === value);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <div ref={ref} className={`relative ${className}`}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                    border transition-all duration-200 min-w-[140px] justify-between
                    ${isOpen
                        ? 'bg-white border-[#1A1A1A]/20 shadow-lg shadow-black/5 text-[#1A1A1A]'
                        : 'bg-[#1A1A1A]/5 border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/8 hover:border-[#1A1A1A]/15 hover:text-[#1A1A1A]'
                    }
                `}
            >
                <span className={`truncate ${!selectedOption ? 'text-[#1A1A1A]/40' : ''}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute top-full left-0 mt-2 w-full min-w-[200px] z-50"
                    style={{
                        animation: 'dropdown-enter 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <div className="bg-white/95 backdrop-blur-xl border border-[#1A1A1A]/10 rounded-xl shadow-2xl shadow-black/10 overflow-hidden">
                        {/* Options */}
                        <div className="py-1.5 max-h-[240px] overflow-y-auto">
                            {/* Default "All" option */}
                            <button
                                onClick={() => { onChange(''); setIsOpen(false); }}
                                className={`
                                    w-full flex items-center gap-3 px-3.5 py-2.5 text-sm transition-all duration-150
                                    ${!value
                                        ? 'bg-[#1A1A1A]/5 text-[#1A1A1A] font-medium'
                                        : 'text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/3 hover:text-[#1A1A1A]'
                                    }
                                `}
                            >
                                <span className="flex-1 text-left">{placeholder}</span>
                                {!value && <Check className="w-3.5 h-3.5 text-[#1A1A1A]/70" />}
                            </button>

                            {/* Divider */}
                            <div className="mx-3 my-1 h-px bg-[#1A1A1A]/5" />

                            {options.map((option, index) => (
                                <button
                                    key={option.value}
                                    onClick={() => { onChange(option.value); setIsOpen(false); }}
                                    className={`
                                        w-full flex items-center gap-3 px-3.5 py-2.5 text-sm transition-all duration-150
                                        ${value === option.value
                                            ? 'bg-[#1A1A1A]/5 text-[#1A1A1A] font-medium'
                                            : 'text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/3 hover:text-[#1A1A1A]'
                                        }
                                    `}
                                    style={{
                                        animation: `dropdown-item-enter 0.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s both`,
                                    }}
                                >
                                    {option.icon && (
                                        <span className="w-5 h-5 flex items-center justify-center rounded-md bg-[#1A1A1A]/5 text-[#1A1A1A]/50 flex-shrink-0">
                                            {option.icon}
                                        </span>
                                    )}
                                    <div className="flex-1 text-left">
                                        <span>{option.label}</span>
                                        {option.description && (
                                            <p className="text-[10px] text-[#1A1A1A]/40 mt-0.5">{option.description}</p>
                                        )}
                                    </div>
                                    {value === option.value && (
                                        <Check className="w-3.5 h-3.5 text-[#1A1A1A]/70 flex-shrink-0" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Keyframe Animations */}
            <style>{`
                @keyframes dropdown-enter {
                    0% {
                        opacity: 0;
                        transform: translateY(-4px) scale(0.97);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes dropdown-item-enter {
                    0% {
                        opacity: 0;
                        transform: translateX(-6px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
};

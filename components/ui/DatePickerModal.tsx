
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, addMonths, isBefore, startOfToday } from 'date-fns';
// Import default styles for react-day-picker but we'll override them with custom CSS/Tailwind
import 'react-day-picker/dist/style.css';

interface DatePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (date: Date, time: string) => void;
    initialDate?: Date;
    initialTime?: string;
}

const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00"
];

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
    isOpen,
    onClose,
    onSelect,
    initialDate,
    initialTime
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(initialTime);
    const [view, setView] = useState<'date' | 'time'>('date');

    // Reset state when opening
    React.useEffect(() => {
        if (isOpen) {
            setSelectedDate(initialDate);
            setSelectedTime(initialTime);
            setView('date');
        }
    }, [isOpen, initialDate, initialTime]);

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
            setView('time');
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        if (selectedDate) {
            onSelect(selectedDate, time);
            onClose();
        }
    };

    const handleBack = () => {
        setView('date');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative">
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-serif italic text-white">
                                        {view === 'date' ? 'Select Date' : 'Select Time'}
                                    </h2>
                                    <p className="text-sm text-white/50 font-sans mt-0.5">
                                        {selectedDate
                                            ? format(selectedDate, 'EEEE, MMMM do')
                                            : 'Choose a date for your call'}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    {view === 'date' ? (
                                        <motion.div
                                            key="date-view"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex justify-center"
                                        >
                                            <style>{`
                                                .rdp {
                                                    --rdp-cell-size: 40px;
                                                    --rdp-accent-color: #ffffff;
                                                    --rdp-background-color: rgba(255, 255, 255, 0.1);
                                                    margin: 0;
                                                }
                                                .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
                                                    background-color: white;
                                                    color: black;
                                                    font-weight: bold;
                                                }
                                                .rdp-day_today {
                                                    color: #ef4444; 
                                                    font-weight: bold;
                                                }
                                                .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                                                    background-color: rgba(255,255,255,0.1);
                                                }
                                                .rdp-head_cell {
                                                    color: rgba(255,255,255,0.5);
                                                    font-weight: normal;
                                                    font-size: 0.875rem;
                                                }
                                                .rdp-day {
                                                    color: white;
                                                }
                                                .rdp-day_disabled {
                                                    opacity: 0.25;
                                                }
                                                .rdp-caption_label {
                                                    color: white;
                                                    font-family: serif;
                                                    font-style: italic;
                                                    font-size: 1.1rem;
                                                }
                                                .rdp-nav_button {
                                                    color: white;
                                                }
                                            `}</style>
                                            <DayPicker
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={handleDateSelect}
                                                disabled={{ before: startOfToday() }}
                                                showOutsideDays
                                                modifiersClassNames={{
                                                    selected: 'my-selected',
                                                    today: 'my-today'
                                                }}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="time-view"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-4"
                                        >
                                            <button
                                                onClick={handleBack}
                                                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-4"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                                Back to Date
                                            </button>

                                            <div className="grid grid-cols-3 gap-3">
                                                {timeSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => handleTimeSelect(time)}
                                                        className={`
                                                            px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300
                                                            ${selectedTime === time
                                                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                                                            }
                                                        `}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

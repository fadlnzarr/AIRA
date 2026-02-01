import React, { useState, useRef, useEffect } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Play, Square, ChevronLeft, ChevronRight, ChevronDown, Clock, Check, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const DEMO_TRACKS = [
    { title: "Medical Appointment Booking", duration: "2:14", audioSrc: "/audio/Medical Appointment.mp3" },
    { title: "Real Estate Qualification", duration: "1:45", audioSrc: "/audio/Real Estate Qualification.mp3" },
    { title: "Restaurant Reservation", duration: "3:02", audioSrc: "/audio/Restaurant reservation.mp3" }
];

const TIME_SLOTS = [
    { display: "09:00 AM", value: "09:00" },
    { display: "09:30 AM", value: "09:30" },
    { display: "10:00 AM", value: "10:00" },
    { display: "10:30 AM", value: "10:30" },
    { display: "11:00 AM", value: "11:00" },
    { display: "11:30 AM", value: "11:30" },
    { display: "12:00 PM", value: "12:00" },
    { display: "12:30 PM", value: "12:30" },
    { display: "01:00 PM", value: "13:00" },
    { display: "01:30 PM", value: "13:30" },
    { display: "02:00 PM", value: "14:00" },
    { display: "02:30 PM", value: "14:30" },
    { display: "03:00 PM", value: "15:00" },
    { display: "03:30 PM", value: "15:30" },
    { display: "04:00 PM", value: "16:00" },
    { display: "04:30 PM", value: "16:30" }
];

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Animation variants for the calendar slide effect
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        scale: 0.95,
        filter: "blur(4px)"
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)"
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        scale: 0.95,
        filter: "blur(4px)"
    })
};

export const Demo: React.FC = () => {
    const navigate = useNavigate();
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Calendar State
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<{ display: string; value: string } | null>(null);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

    // Track direction for animation (-1 for prev, 1 for next)
    const [direction, setDirection] = useState(0);

    // Audio cleanup and event handlers
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Handle audio time updates
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => {
            setPlayingIndex(null);
            setCurrentTime(0);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [playingIndex]);

    // Calendar Logic
    const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Get day of week for the 1st of the month (0 = Mon, 6 = Sun)
    const getFirstDayOfMonth = (date: Date) => {
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const handlePrevMonth = () => {
        setDirection(-1);
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDirection(1);
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        setSelectedDate(newDate);
        // Reset time if date changes to ensure valid flow
        if (selectedDate?.getTime() !== newDate.getTime()) {
            setSelectedTime(null);
            setIsTimeDropdownOpen(true); // Auto open time dropdown
        }
    };

    const handleTimeSelect = (time: { display: string; value: string }) => {
        setSelectedTime(time);
        setIsTimeDropdownOpen(false);
    };

    const handleBookAppointment = () => {
        if (selectedDate && selectedTime) {
            // Format date as YYYY-MM-DD only
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            navigate('/contact', {
                state: {
                    bookingDate: formattedDate,
                    bookingTime: selectedTime.value
                }
            });
        }
    };

    const togglePlay = (index: number) => {
        // If clicking the same track that's playing, pause it
        if (playingIndex === index) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setPlayingIndex(null);
            return;
        }

        // Stop any currently playing audio
        if (audioRef.current) {
            audioRef.current.pause();
        }

        // Create new audio and play
        const track = DEMO_TRACKS[index];
        audioRef.current = new Audio(track.audioSrc);
        audioRef.current.play().catch(console.error);
        setPlayingIndex(index);
        setCurrentTime(0);
    };

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const daysInMonth = getDaysInMonth(viewDate);
    const startPadding = getFirstDayOfMonth(viewDate);

    // Check if a day is selected
    const isSelected = (day: number) => {
        return selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === viewDate.getMonth() &&
            selectedDate.getFullYear() === viewDate.getFullYear();
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                {/* Main Header */}
                <AnimatedSection className="mb-20 text-left">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic font-light text-white mb-8 md:whitespace-nowrap">Audible Intelligence.</h1>
                    <p className="text-xl text-white/60 font-sans max-w-3xl leading-relaxed">
                        Listen to raw, unedited conversations. No scripts. No cuts. Just pure autonomous capability handling complex human ambiguity in real-time.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Demo Audio List */}
                    <AnimatedSection className="flex flex-col h-full pt-4">
                        <div className="space-y-4">
                            {DEMO_TRACKS.map((track, i) => {
                                const isPlaying = playingIndex === i;
                                return (
                                    <motion.div
                                        key={i}
                                        layout
                                        onClick={() => togglePlay(i)}
                                        className={`border transition-all duration-500 cursor-pointer overflow-hidden ${isPlaying ? 'border-white bg-white/5' : 'border-white/10 hover:bg-white hover:text-black group'}`}
                                    >
                                        <motion.div layout className="flex items-center gap-6 p-6">
                                            <div className={`font-sans font-bold text-sm ${isPlaying ? 'text-white' : 'group-hover:text-black'}`}>0{i + 1}</div>
                                            <div className="text-left flex-grow">
                                                <div className={`text-lg font-serif italic ${isPlaying ? 'text-white' : 'group-hover:text-black'}`}>{track.title}</div>
                                            </div>
                                            <div className={`w-8 h-8 flex items-center justify-center border rounded-full transition-colors ${isPlaying ? 'border-white text-white' : 'border-current group-hover:bg-black group-hover:text-white group-hover:border-black'}`}>
                                                {isPlaying ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                                            </div>
                                        </motion.div>

                                        <AnimatePresence>
                                            {isPlaying && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="px-6 pb-6"
                                                >
                                                    <div className="pt-4 border-t border-white/10">
                                                        <div className="flex justify-between items-end mb-4">
                                                            <span className="text-xs font-sans uppercase tracking-widest text-white/40">Audio Output</span>
                                                            <span className="text-xs font-sans font-bold text-white">
                                                                {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : track.duration}
                                                            </span>
                                                        </div>

                                                        {/* Voice Waveform Visualizer */}
                                                        <div className="h-32 flex items-center justify-center gap-1 w-full my-4">
                                                            {[...Array(45)].map((_, barIndex) => (
                                                                <motion.div
                                                                    key={barIndex}
                                                                    className="w-1.5 bg-white rounded-full flex-shrink-0"
                                                                    initial={{ height: "10%" }}
                                                                    animate={{
                                                                        height: ["10%", `${Math.max(10, Math.random() * 100)}%`, "10%"]
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.3 + Math.random() * 0.2,
                                                                        repeat: Infinity,
                                                                        repeatType: "mirror",
                                                                        ease: "easeInOut",
                                                                        delay: Math.random() * 0.2
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>

                                                        {/* Progress Bar */}
                                                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className="h-full bg-white rounded-full"
                                                                initial={{ width: "0%" }}
                                                                animate={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }}
                                                                transition={{ duration: 0.1 }}
                                                            />
                                                        </div>

                                                        <div className="flex justify-between items-center mt-6">
                                                            <div className="text-xs text-white/30 font-sans tracking-wider uppercase">Now Playing</div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </AnimatedSection>

                    {/* Interactive Calendar Section */}
                    <AnimatedSection delay={0.2} className="bg-white text-black min-h-[600px] p-8 md:p-12 flex flex-col h-full shadow-2xl relative overflow-visible">
                        <div className="flex-grow flex flex-col">
                            <h3 className="font-serif italic font-light text-4xl mb-2">Book Strategy Call</h3>
                            <p className="text-black/60 mb-8 font-sans">Syncs with our real-time availability.</p>

                            {/* Calendar Container */}
                            <div className="w-full max-w-md mx-auto border border-black/10 p-6 bg-white shadow-lg space-y-6 z-10">

                                {/* Header: Month/Year Nav */}
                                <div className="flex justify-between items-center border-b border-black/10 pb-4">
                                    <div className="font-serif italic text-2xl w-40">
                                        <AnimatePresence mode="popLayout" custom={direction}>
                                            <motion.div
                                                key={viewDate.toISOString()}
                                                initial={{ y: direction > 0 ? 20 : -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: direction > 0 ? -20 : 20, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {MONTH_NAMES[viewDate.getMonth()]} <span className="font-sans font-bold not-italic text-lg ml-1">{viewDate.getFullYear()}</span>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={handlePrevMonth}
                                            className="w-8 h-8 flex items-center justify-center border border-black/10 hover:bg-black hover:text-white transition-colors rounded-full"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleNextMonth}
                                            className="w-8 h-8 flex items-center justify-center border border-black/10 hover:bg-black hover:text-white transition-colors rounded-full"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Days Grid - Animated Transition */}
                                <div className="space-y-2 overflow-hidden">
                                    {/* Day Labels */}
                                    <div className="grid grid-cols-7 gap-2 mb-2">
                                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                            <div key={i} className="text-xs font-bold text-black/30 text-center uppercase tracking-wider">{d}</div>
                                        ))}
                                    </div>

                                    {/* Animated Days Container */}
                                    <div className="relative min-h-[220px]">
                                        <AnimatePresence mode="popLayout" custom={direction}>
                                            <motion.div
                                                key={`${viewDate.getMonth()}-${viewDate.getFullYear()}`}
                                                custom={direction}
                                                variants={slideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{
                                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                                    opacity: { duration: 0.2 }
                                                }}
                                                className="grid grid-cols-7 gap-2 absolute w-full"
                                            >
                                                {/* Empty Slots */}
                                                {[...Array(startPadding)].map((_, i) => (
                                                    <div key={`empty-${i}`} className="aspect-square" />
                                                ))}

                                                {/* Actual Days */}
                                                {[...Array(daysInMonth)].map((_, i) => {
                                                    const day = i + 1;
                                                    const selected = isSelected(day);
                                                    return (
                                                        <motion.button
                                                            key={day}
                                                            onClick={() => handleDateClick(day)}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className={`relative aspect-square flex items-center justify-center text-sm font-sans transition-colors rounded-full z-0 ${selected ? 'text-white font-bold' : 'text-black/60 hover:bg-black/5'}`}
                                                        >
                                                            {selected && (
                                                                <motion.div
                                                                    layoutId="selectedDay"
                                                                    className="absolute inset-0 bg-black rounded-full z-[-1]"
                                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                                    animate={{ scale: 1, opacity: 1 }}
                                                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                                />
                                                            )}
                                                            {day}
                                                        </motion.button>
                                                    );
                                                })}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Time Selection & Booking Action */}
                                <div className="pt-4 border-t border-black/10 relative">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Available Time</label>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                                className="w-full border border-black/20 p-3 flex justify-between items-center bg-white hover:border-black transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-black/40" />
                                                    <span className={`font-sans ${selectedTime ? 'text-black font-bold' : 'text-black/40'}`}>
                                                        {selectedTime?.display || "Select a time"}
                                                    </span>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: isTimeDropdownOpen ? 180 : 0 }}
                                                >
                                                    <ChevronDown className="w-4 h-4 text-black/40" />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence>
                                                {isTimeDropdownOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, y: -10 }}
                                                        animate={{ height: "auto", opacity: 1, y: 0 }}
                                                        exit={{ height: 0, opacity: 0, y: -10 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/10 shadow-2xl overflow-hidden z-50 max-h-[200px] overflow-y-auto"
                                                    >
                                                        <div className="p-2 grid grid-cols-2 gap-1">
                                                            {TIME_SLOTS.map((time, index) => (
                                                                <motion.button
                                                                    key={time.value}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: index * 0.03 }}
                                                                    onClick={() => handleTimeSelect(time)}
                                                                    className={`p-2 text-sm text-left hover:bg-black hover:text-white transition-colors flex items-center justify-between group ${selectedTime?.value === time.value ? 'bg-black text-white' : 'text-black/60'}`}
                                                                >
                                                                    <span>{time.display}</span>
                                                                    {selectedTime?.value === time.value && <Check className="w-3 h-3" />}
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <AnimatePresence>
                                            {selectedDate && selectedTime && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, height: 0 }}
                                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                    exit={{ opacity: 0, y: 10, height: 0 }}
                                                >
                                                    <Button
                                                        variant="secondary"
                                                        className="w-full justify-between group"
                                                        onClick={handleBookAppointment}
                                                    >
                                                        <span>Confirm Booking</span>
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};
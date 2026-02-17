import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, Loader2, CheckCircle, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MetallicScrollBackground } from '../components/ui/metallic-scroll-background';

const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const AUDIO_FILES = {
    Healthcare: "/audio/Medical Appointment.mp3",
    Property: "/audio/Real Estate Qualification.mp3",
    Hospitality: "/audio/Restaurant reservation.mp3"
};

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
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<number | null>(null);
    const isPlayingRef = useRef<number | null>(null); // Ref to track playing state in loop
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [direction, setDirection] = useState(0);
    const [isBooking, setIsBooking] = useState(false);

    // Sync ref
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // Audio Visualization Refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const visualizerBarsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Get current date info
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const today = new Date();

    // Initialize Audio Context on first user interaction
    const initAudioContext = () => {
        if (!audioContextRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioContextClass();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256; // Defines data resolution

            if (audioRef.current) {
                // Ensure we only create the source once
                if (!sourceRef.current) {
                    sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
                    sourceRef.current.connect(analyserRef.current);
                    analyserRef.current.connect(audioContextRef.current.destination);
                }
            }
        } else if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    // Sync ref
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    const updateVisualizer = () => {
        if (!analyserRef.current || isPlayingRef.current === null) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Map frequency data to our 40 bars
        const BARS_PER_CARD = 40;
        const step = Math.floor(bufferLength / BARS_PER_CARD);
        const currentIndex = isPlayingRef.current || 0;
        const offset = currentIndex * BARS_PER_CARD;

        for (let i = 0; i < BARS_PER_CARD; i++) {
            const bar = visualizerBarsRef.current[offset + i];
            if (bar) {
                // Get average frequency for this bar's range
                let value = 0;
                for (let j = 0; j < step; j++) {
                    value += dataArray[i * step + j];
                }
                value = value / step;

                // Calculate height percentage (min 20%, max 100%)
                const heightPercent = Math.max(20, (value / 255) * 100);

                // Directly update specific bar style for performance
                bar.style.height = `${heightPercent}%`;
                bar.style.opacity = isPlaying !== null ? '1' : '0.3';
            }
        }

        if (isPlayingRef.current !== null) {
            animationFrameRef.current = requestAnimationFrame(updateVisualizer);
        }
    };

    useEffect(() => {
        if (isPlaying !== null) {
            updateVisualizer();
        } else {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            // Reset bars when stopped
            visualizerBarsRef.current.forEach(bar => {
                if (bar) {
                    bar.style.height = '20%';
                    bar.style.opacity = '0.3';
                }
            });
        }
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) setCurrentTime(0);
    };

    const handleEnded = () => {
        setIsPlaying(null);
        setCurrentTime(0);
    };

    const togglePlay = (index: number, category: string) => {
        initAudioContext(); // Ensure context is ready

        if (isPlaying === index) {
            audioRef.current?.pause();
            setIsPlaying(null);
        } else {
            if (audioRef.current) {
                const audioSrc = AUDIO_FILES[category as keyof typeof AUDIO_FILES];
                if (audioSrc && audioRef.current.src !== window.location.origin + audioSrc) {
                    audioRef.current.src = audioSrc;
                }
                // Reset if switching tracks
                if (isPlaying !== null && isPlaying !== index) {
                    audioRef.current.currentTime = 0;
                }

                // Need a slight delay to ensure src allows play if just changed? usually fine.
                // Actually if src changes, we might need to load.
                // Let's just set src and play.
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(index);
        }
    };


    // Calendar Logic
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    // Get day of week for the 1st of the month (0 = Mon, 6 = Sun)
    const getFirstDayOfMonth = (date: Date) => {
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1; // Adjust so Monday is 0
    };

    const handlePrevMonth = () => {
        setDirection(-1);
        setDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setDirection(1);
        setDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handleDateClick = (day: number) => {
        // Prevent selecting past dates
        const clickedDate = new Date(currentYear, currentMonth, day);
        if (clickedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;

        setSelectedDate(day);
        setSelectedTime(null); // Reset time when date changes
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleBookAppointment = () => {
        if (!selectedDate || !selectedTime) return;

        setIsBooking(true);
        // Simulate API call
        setTimeout(() => {
            setIsBooking(false);
            // Navigate to contact page with pre-filled data passed via state
            const bookingDate = new Date(currentYear, currentMonth, selectedDate);
            navigate('/contact', {
                state: {
                    bookingDate: bookingDate.toISOString(),
                    bookingTime: selectedTime
                }
            });
        }, 1500);
    };

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);

    // Check if a day is selected
    const isSelected = (day: number) => {
        return selectedDate === day &&
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear;
    };

    // Check if a day is today
    const isToday = (day: number) => {
        return day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();
    };

    // Check if a day is in the past
    const isPast = (day: number) => {
        const checkDate = new Date(currentYear, currentMonth, day);
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return checkDate < todayDate;
    };

    return (
        <div className="min-h-screen overflow-hidden">
            <MetallicScrollBackground>
                <div className="pt-32 pb-20">
                    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Hidden Audio Element - crossOrigin removed for same-origin localhost */}
                        <audio
                            ref={audioRef}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={handleEnded}
                            className="hidden"
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            {/* Left Column: Audio Demos */}
                            <div className="space-y-16">
                                <AnimatedSection>
                                    <h1
                                        className="text-5xl md:text-7xl font-serif italic font-light leading-none mb-8"
                                        style={{ color: 'var(--metallic-text)' }}
                                    >
                                        Hear the <br />
                                        <span className="font-sans font-bold not-italic">Difference.</span>
                                    </h1>
                                    <p
                                        className="text-xl leading-relaxed mb-12"
                                        style={{ color: 'var(--metallic-muted)' }}
                                    >
                                        Listen to actual calls handled by AIRA agents. <br />
                                        Indistinguishable from human staff.
                                    </p>
                                </AnimatedSection>

                                <div className="space-y-6">
                                    {[
                                        { title: "Medical Appointment", duration: "1:42", category: "Healthcare" },
                                        { title: "Real Estate Inquiry", duration: "2:15", category: "Property" },
                                        { title: "Restaurant Reservation", duration: "0:58", category: "Hospitality" }
                                    ].map((demo, i) => (
                                        <AnimatedSection key={i} delay={i * 0.1}>
                                            <div
                                                className={`group p-6 rounded-2xl transition-all duration-300 border ${isPlaying === i ? 'bg-white/5' : 'bg-white/5 hover:bg-white/10'}`}
                                                style={{ borderColor: isPlaying === i ? 'var(--metallic-text)' : 'var(--metallic-border)' }}
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <div
                                                            className="text-xs font-bold uppercase tracking-wider mb-1"
                                                            style={{ color: 'var(--metallic-muted)' }}
                                                        >
                                                            {demo.category}
                                                        </div>
                                                        <h3
                                                            className="text-xl font-serif italic"
                                                            style={{ color: 'var(--metallic-text)' }}
                                                        >
                                                            {demo.title}
                                                        </h3>
                                                    </div>
                                                    <button
                                                        onClick={() => togglePlay(i, demo.category)}
                                                        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform duration-300"
                                                    >
                                                        {isPlaying === i ? (
                                                            <div className="flex gap-1">
                                                                <div className="w-1 h-3 bg-black"></div>
                                                                <div className="w-1 h-3 bg-black"></div>
                                                            </div>
                                                        ) : (
                                                            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Audio Waveform Visualization */}
                                                <div className="relative h-12 flex items-center gap-0.5 overflow-hidden">
                                                    {Array.from({ length: 40 }).map((_, barIndex) => (
                                                        <div
                                                            key={barIndex}
                                                            ref={el => visualizerBarsRef.current[i * 40 + barIndex] = el}
                                                            className="w-1.5 rounded-full transition-[height] duration-75 ease-linear will-change-transform"
                                                            style={{
                                                                height: '20%',
                                                                backgroundColor: isPlaying === i ? 'var(--metallic-text)' : 'var(--metallic-muted)',
                                                                opacity: 0.3 // Controlled by visualizer loop
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                <div
                                                    className="flex justify-between text-xs font-mono mt-3"
                                                    style={{ color: 'var(--metallic-muted)' }}
                                                >
                                                    <span>{isPlaying === i ? formatTime(currentTime) : "0:00"}</span>
                                                    <span>{demo.duration}</span>
                                                </div>
                                            </div>
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Interactive Booking Calendar */}
                            <div className="relative">
                                {/* ... (Calendar code remains same as before) ... */}
                                <AnimatedSection delay={0.2}>
                                    <div
                                        className="rounded-3xl p-8 backdrop-blur-xl border relative overflow-hidden"
                                        style={{
                                            backgroundColor: 'rgba(0,0,0,0.2)',
                                            borderColor: 'var(--metallic-border)'
                                        }}
                                    >
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-8">
                                                <h3
                                                    className="text-2xl font-serif italic"
                                                    style={{ color: 'var(--metallic-text)' }}
                                                >
                                                    Book a Demo
                                                </h3>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handlePrevMonth}
                                                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                                        style={{ color: 'var(--metallic-text)' }}
                                                    >
                                                        <ChevronLeft className="w-5 h-5" />
                                                    </button>
                                                    <div
                                                        className="font-sans font-bold w-32 text-center"
                                                        style={{ color: 'var(--metallic-text)' }}
                                                    >
                                                        {MONTH_NAMES[currentMonth]} {currentYear}
                                                    </div>
                                                    <button
                                                        onClick={handleNextMonth}
                                                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                                        style={{ color: 'var(--metallic-text)' }}
                                                    >
                                                        <ChevronRight className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Calendar Grid */}
                                            <div className="mb-8">
                                                <div className="grid grid-cols-7 mb-4">
                                                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                                        <div
                                                            key={day}
                                                            className="text-center text-xs font-bold uppercase tracking-wider h-8 flex items-center justify-center"
                                                            style={{ color: 'var(--metallic-muted)' }}
                                                        >
                                                            {day}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="relative h-[280px]">
                                                    <AnimatePresence initial={false} custom={direction}>
                                                        <motion.div
                                                            key={currentMonth}
                                                            custom={direction}
                                                            variants={slideVariants}
                                                            initial="enter"
                                                            animate="center"
                                                            exit="exit"
                                                            transition={{
                                                                x: { type: "spring", stiffness: 300, damping: 30 },
                                                                opacity: { duration: 0.2 }
                                                            }}
                                                            className="grid grid-cols-7 gap-y-2 absolute w-full"
                                                        >
                                                            {/* Empty cells for start of month */}
                                                            {Array.from({ length: firstDay }).map((_, i) => (
                                                                <div key={`empty-${i}`} className="h-10 md:h-12" />
                                                            ))}

                                                            {/* Days */}
                                                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                                                const day = i + 1;
                                                                const selected = isSelected(day);
                                                                const today = isToday(day);
                                                                const past = isPast(day);

                                                                return (
                                                                    <div key={day} className="h-10 md:h-12 flex items-center justify-center relative group">
                                                                        <button
                                                                            onClick={() => handleDateClick(day)}
                                                                            disabled={past}
                                                                            className={`
                                                                            w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 relative z-10
                                                                            ${selected
                                                                                    ? 'bg-white text-black font-bold scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                                                                    : past
                                                                                        ? 'cursor-not-allowed'
                                                                                        : 'hover:bg-white/10'
                                                                                }
                                                                            ${today && !selected ? 'border border-white/30' : ''}
                                                                        `}
                                                                            style={selected ? {} : (past ? { color: 'var(--metallic-muted)', opacity: 0.3 } : { color: 'var(--metallic-text)' })}
                                                                        >
                                                                            {day}
                                                                            {today && !selected && (
                                                                                <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></div>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                );
                                                            })}
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {/* Time Selection - Only shows when date is selected */}
                                            <AnimatePresence>
                                                {selectedDate && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div
                                                            className="pt-6 mt-2 border-t"
                                                            style={{ borderColor: 'var(--metallic-border)' }}
                                                        >
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <Clock
                                                                    className="w-4 h-4"
                                                                    style={{ color: 'var(--metallic-text)' }}
                                                                />
                                                                <span
                                                                    className="text-sm font-bold uppercase tracking-wider"
                                                                    style={{ color: 'var(--metallic-text)' }}
                                                                >
                                                                    Available Times
                                                                </span>
                                                            </div>
                                                            <div className="grid grid-cols-4 gap-2 mb-8">
                                                                {TIME_SLOTS.map((time) => (
                                                                    <button
                                                                        key={time}
                                                                        onClick={() => handleTimeSelect(time)}
                                                                        className={`
                                                                        px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 border
                                                                        ${selectedTime === time
                                                                                ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                                                                                : 'bg-transparent hover:bg-white/10'
                                                                            }
                                                                    `}
                                                                        style={selectedTime === time ? {} : { color: 'var(--metallic-text)', borderColor: 'var(--metallic-border)' }}
                                                                    >
                                                                        {time}
                                                                    </button>
                                                                ))}
                                                            </div>

                                                            <div className="">
                                                                <Button
                                                                    variant="primary"
                                                                    className={`w-full py-4 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${selectedTime ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
                                                                    disabled={!selectedTime || isBooking}
                                                                    onClick={handleBookAppointment}
                                                                >
                                                                    {isBooking ? (
                                                                        <>
                                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                                            Checking Availability...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            Confirm Selection <CheckCircle className="w-4 h-4" />
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </div>
                </div>
            </MetallicScrollBackground>
        </div>
    );
};
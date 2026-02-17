import React, { useEffect } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { CheckCircle, Calendar, Clock, Home, ArrowRight, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MetallicScrollBackground } from '../components/ui/metallic-scroll-background';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export const BookingConfirmation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const { bookingDate, bookingTime } = location.state || {}; // Get passed data

    // Default to today/now if no data passed (for testing)
    const displayDate = bookingDate ? new Date(bookingDate) : new Date();
    const displayTime = bookingTime || "10:00 AM";

    // Format date nicely
    const formattedDate = displayDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen overflow-hidden">
            <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={200}
                gravity={0.15}
                colors={['#ffffff', '#e5e5e5', '#a3a3a3', '#525252']}
            />

            <MetallicScrollBackground>
                <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
                    <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">

                        <AnimatedSection>
                            <div className="mb-8 flex justify-center">
                                <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                    <CheckCircle className="w-12 h-12 text-green-400" />
                                </div>
                            </div>

                            <h1
                                className="text-5xl md:text-7xl font-serif italic font-light leading-none mb-6"
                                style={{ color: 'var(--metallic-text)' }}
                            >
                                Booking <br />
                                <span className="font-sans font-bold not-italic">Confirmed.</span>
                            </h1>

                            <p
                                className="text-xl leading-relaxed mb-12"
                                style={{ color: 'var(--metallic-muted)' }}
                            >
                                Your demo with AIRA has been scheduled. <br />
                                A calendar invitation has been sent to your email.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div
                                className="p-8 rounded-3xl backdrop-blur-xl border mb-12"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    borderColor: 'var(--metallic-border)'
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <Calendar className="w-8 h-8 mb-3 opacity-70" style={{ color: 'var(--metallic-text)' }} />
                                        <span className="text-xs uppercase tracking-wider font-bold opacity-50 mb-1" style={{ color: 'var(--metallic-muted)' }}>Date</span>
                                        <span className="text-lg font-medium" style={{ color: 'var(--metallic-text)' }}>{formattedDate}</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <Clock className="w-8 h-8 mb-3 opacity-70" style={{ color: 'var(--metallic-text)' }} />
                                        <span className="text-xs uppercase tracking-wider font-bold opacity-50 mb-1" style={{ color: 'var(--metallic-muted)' }}>Time</span>
                                        <span className="text-lg font-medium" style={{ color: 'var(--metallic-text)' }}>{displayTime}</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--metallic-border)' }}>
                                    <button
                                        className="flex items-center justify-center gap-2 mx-auto text-sm hover:underline transition-all"
                                        style={{ color: 'var(--metallic-muted)' }}
                                    >
                                        <Download className="w-4 h-4" />
                                        Add to Google Calendar
                                    </button>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="primary"
                                    onClick={() => navigate('/')}
                                    className="px-8 py-4 flex items-center justify-center gap-2"
                                >
                                    <Home className="w-4 h-4" />
                                    Return Home
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate('/how-it-works')}
                                    className="px-8 py-4 flex items-center justify-center gap-2"
                                >
                                    Prepare for your Call
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </AnimatedSection>

                    </div>
                </div>
            </MetallicScrollBackground>
        </div>
    );
};

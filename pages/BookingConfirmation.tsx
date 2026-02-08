import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { CheckCircle, Calendar, Clock, User, Building, Mail, ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingData {
    fullName: string;
    businessName: string;
    email: string;
    appointmentDate: string;
    appointmentTime: string;
}

export const BookingConfirmation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state as BookingData | null;

    // Redirect if accessed directly without booking data
    useEffect(() => {
        if (!bookingData) {
            navigate('/', { replace: true });
        }
    }, [bookingData, navigate]);

    // Don't render if no booking data
    if (!bookingData) {
        return null;
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="max-w-[1000px] mx-auto px-4 sm:px-8 lg:px-12">
                <AnimatedSection className="text-center mb-16">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2
                        }}
                        className="inline-flex items-center justify-center w-24 h-24 border-2 border-white rounded-full mb-8"
                    >
                        <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-serif italic font-light text-white mb-6">
                        Protocol Initiated.
                    </h1>
                    <p className="text-xl text-white/60 font-sans max-w-2xl mx-auto">
                        Your consultation has been successfully scheduled. Our automation architects will be in touch within 24 hours.
                    </p>
                </AnimatedSection>

                {/* Booking Details Card */}
                <AnimatedSection delay={0.3}>
                    <div className="bg-white text-black p-8 md:p-12 shadow-2xl">
                        <div className="flex items-center justify-between mb-8 border-b border-black/10 pb-4">
                            <div className="text-xs font-bold uppercase tracking-widest text-black/40 font-sans">
                                Booking Confirmation
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                                <span className="text-xs font-sans font-bold text-black/40 uppercase">Confirmed</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Date & Time */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-black/20 flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-black/40 font-sans mb-1">Date</div>
                                        <div className="text-xl font-serif italic">{formatDate(bookingData.appointmentDate)}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-black/20 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-black/40 font-sans mb-1">Time</div>
                                        <div className="text-xl font-serif italic">{bookingData.appointmentTime}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-black/20 flex items-center justify-center flex-shrink-0">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-black/40 font-sans mb-1">Name</div>
                                        <div className="text-xl font-serif italic">{bookingData.fullName}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-black/20 flex items-center justify-center flex-shrink-0">
                                        <Building className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-black/40 font-sans mb-1">Business</div>
                                        <div className="text-xl font-serif italic">{bookingData.businessName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Confirmation Notice */}
                        <div className="mt-8 pt-8 border-t border-black/10">
                            <div className="flex items-center gap-4 text-black/60">
                                <Mail className="w-5 h-5" />
                                <p className="font-sans text-sm">
                                    A confirmation email has been sent to <span className="font-bold text-black">{bookingData.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* What's Next Section */}
                <AnimatedSection delay={0.5} className="mt-16">
                    <h2 className="text-3xl font-serif italic font-light text-white mb-8 text-center">What Happens Next?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { step: '01', title: 'Confirmation Email', desc: 'Check your inbox for meeting details and calendar invite.' },
                            { step: '02', title: 'Pre-Call Brief', desc: 'Our team reviews your requirements before the consultation.' },
                            { step: '03', title: 'Strategy Session', desc: 'We discuss your automation goals and create a custom roadmap.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className="border border-white/10 p-6 hover:bg-white/5 transition-colors"
                            >
                                <div className="text-white/30 font-sans font-bold text-sm mb-3">{item.step}</div>
                                <h3 className="text-white font-serif italic text-xl mb-2">{item.title}</h3>
                                <p className="text-white/60 font-sans text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Action Buttons */}
                <AnimatedSection delay={0.7} className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        onClick={() => navigate('/')}
                        icon={<Home className="w-4 h-4" />}
                    >
                        Back to Home
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/demo')}
                        icon={<ArrowRight className="w-4 h-4" />}
                    >
                        Explore Our Demos
                    </Button>
                </AnimatedSection>
            </div>
        </div>
    );
};

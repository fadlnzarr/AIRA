import React, { useState } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { Mail, MessageSquare, Phone, Send, Loader2, CheckCircle, Calendar as CalendarIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { MetallicScrollBackground } from '../components/ui/metallic-scroll-background';
import { DatePickerModal } from '../components/ui/DatePickerModal';
import { format } from 'date-fns';

import { api } from '../src/lib/api';

export const Contact: React.FC = () => {
    const location = useLocation();
    const { bookingDate, bookingTime } = location.state || {}; // Get passed data

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        industry: '',
        message: '',
        date: bookingDate ? new Date(bookingDate) : undefined as Date | undefined,
        time: bookingTime || ''
    });

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleDateSelect = (date: Date, time: string) => {
        setFormState({
            ...formState,
            date,
            time
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            // Construct ISO date from date and time strings
            // Date is already a Date object in state now

            if (!formState.date || !formState.time) {
                throw new Error("Please select both a date and time.");
            }

            await api.post('/api/book-appointment', {
                fullName: formState.name,
                email: formState.email,
                businessName: formState.company,
                phone: formState.phone,
                industry: formState.industry,
                missionBrief: formState.message,
                appointmentDate: formState.date.toISOString(),
                appointmentTime: formState.time,
            });

            setIsSuccess(true);
            setFormState({ name: '', email: '', company: '', phone: '', industry: '', message: '', date: undefined, time: '' });
        } catch (error: any) {
            console.error("Submission failed:", error);
            setErrorMessage(error.message || "Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen overflow-hidden">
            <MetallicScrollBackground>
                <div className="pt-32 pb-20">
                    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            {/* Contact Info */}
                            <div>
                                <AnimatedSection>
                                    <h1
                                        className="text-5xl md:text-7xl font-serif italic font-light leading-none mb-8"
                                        style={{ color: 'var(--metallic-text)' }}
                                    >
                                        Let's Build <br />
                                        <span className="font-sans font-bold not-italic">Something Real.</span>
                                    </h1>
                                    <p
                                        className="text-xl leading-relaxed mb-12"
                                        style={{ color: 'var(--metallic-muted)' }}
                                    >
                                        Ready to automate your voice operations? <br />
                                        Our team is ready to architect your solution.
                                    </p>
                                </AnimatedSection>

                                <div className="space-y-8">
                                    <AnimatedSection delay={0.2}>
                                        <div className="flex items-start gap-6 group">
                                            <div
                                                className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-300 group-hover:bg-white group-hover:text-black"
                                                style={{ borderColor: 'var(--metallic-border)', color: 'var(--metallic-text)' }}
                                            >
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3
                                                    className="font-serif italic text-xl mb-1"
                                                    style={{ color: 'var(--metallic-text)' }}
                                                >
                                                    Email Us
                                                </h3>
                                                <p
                                                    className="font-sans"
                                                    style={{ color: 'var(--metallic-muted)' }}
                                                >
                                                    hello@aira.agency
                                                </p>
                                                <p
                                                    className="font-sans text-sm mt-1"
                                                    style={{ color: 'var(--metallic-muted)' }}
                                                >
                                                    For general inquiries and partnerships.
                                                </p>
                                            </div>
                                        </div>
                                    </AnimatedSection>


                                </div>
                            </div>

                            {/* Contact Form */}
                            <AnimatedSection delay={0.4}>
                                <div
                                    className="p-8 md:p-10 rounded-3xl backdrop-blur-xl border relative overflow-hidden"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.02)',
                                        borderColor: 'var(--metallic-border)'
                                    }}
                                >
                                    {/* Pre-filled booking info notice */}

                                    {/* Pre-filled booking info notice */}
                                    {bookingDate && (
                                        <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-bold">Completing Booking</p>
                                                <p className="text-white/60 text-xs">
                                                    For {new Date(bookingDate).toLocaleDateString()} at {bookingTime}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label
                                                    className="text-xs font-bold uppercase tracking-wider ml-1"
                                                    style={{ color: 'var(--metallic-muted)' }}
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formState.name}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                                                    style={{ borderColor: 'var(--metallic-border)', color: 'var(--metallic-text)' }}
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                className="text-xs font-bold uppercase tracking-wider ml-1"
                                                style={{ color: 'var(--metallic-muted)' }}
                                            >
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formState.company}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                                                style={{ borderColor: 'var(--metallic-border)', color: 'var(--metallic-text)' }}
                                                placeholder="Acme Inc."
                                            />
                                        </div>


                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label
                                                    className="text-xs font-bold uppercase tracking-wider ml-1"
                                                    style={{ color: 'var(--metallic-muted)' }}
                                                >
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formState.phone}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                                                    style={{ borderColor: 'var(--metallic-border)', color: 'var(--metallic-text)' }}
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    className="text-xs font-bold uppercase tracking-wider ml-1"
                                                    style={{ color: 'var(--metallic-muted)' }}
                                                >
                                                    Industry
                                                </label>
                                                <select
                                                    name="industry"
                                                    value={formState.industry}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans appearance-none"
                                                    style={{ borderColor: 'var(--metallic-border)', color: 'var(--metallic-text)' }}
                                                >
                                                    <option value="" disabled>Select Industry</option>
                                                    <option value="Real Estate">Real Estate</option>
                                                    <option value="Healthcare">Healthcare</option>
                                                    <option value="Legal">Legal</option>
                                                    <option value="Home Services">Home Services</option>
                                                    <option value="Recruitment">Recruitment</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                className="text-xs font-bold uppercase tracking-wider ml-1"
                                                style={{ color: 'var(--metallic-muted)' }}
                                            >
                                                Requested Date & Time
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setIsDatePickerOpen(true)}
                                                className="w-full bg-white/5 border rounded-xl px-4 py-3 text-left outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans flex items-center justify-between group/btn"
                                                style={{ borderColor: 'var(--metallic-border)', color: 'var(--metallic-text)' }}
                                            >
                                                <span className={!formState.date ? 'text-white/50' : ''}>
                                                    {formState.date && formState.time
                                                        ? `${format(formState.date, 'MMM do, yyyy')} at ${formState.time}`
                                                        : 'Select a Date & Time'}
                                                </span>
                                                <CalendarIcon className="w-5 h-5 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                                            </button>
                                        </div>

                                        <DatePickerModal
                                            isOpen={isDatePickerOpen}
                                            onClose={() => setIsDatePickerOpen(false)}
                                            onSelect={handleDateSelect}
                                            initialDate={formState.date}
                                            initialTime={formState.time}
                                        />

                                        <div className="space-y-2">
                                            <label
                                                className="text-xs font-bold uppercase tracking-wider ml-1"
                                                style={{ color: 'var(--metallic-muted)' }}
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formState.email}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                                                style={{ borderColor: 'var(--metallic-border)', color: 'var(--metallic-text)' }}
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                className="text-xs font-bold uppercase tracking-wider ml-1"
                                                style={{ color: 'var(--metallic-muted)' }}
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                name="message"
                                                required
                                                rows={4}
                                                value={formState.message}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans resize-none"
                                                style={{ borderColor: 'var(--metallic-border)', color: 'var(--metallic-text)' }}
                                                placeholder="Tell us about your automation needs..."
                                            />
                                        </div>

                                        <Button
                                            variant="primary"
                                            className="w-full py-4 text-base flex items-center justify-center gap-2 group"
                                            disabled={isSubmitting || isSuccess}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : isSuccess ? (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    Message Sent
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                    </form>

                                    {errorMessage && (
                                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                            {errorMessage}
                                        </div>
                                    )}

                                    {/* Decorative background glow */}
                                    <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div >
            </MetallicScrollBackground >
        </div >
    );
};

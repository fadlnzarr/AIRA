
import React, { useState, useEffect } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { Send, Phone, Mail, Calendar, Clock, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface BookingState {
    bookingDate?: string;
    bookingTime?: string;
}

export const Contact: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as BookingState | null;
    const { bookingDate: preBookingDate, bookingTime: preBookingTime } = state || {};
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formState, setFormState] = useState({
        name: '',
        business: '',
        email: '',
        phone: '',
        industry: '',
        message: '',
        requestedDate: ''
    });

    // Handle Pre-filled Data
    useEffect(() => {
        if (preBookingDate && preBookingTime) {
            const dateStr = new Date(preBookingDate).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const msg = `I would like to confirm my appointment for ${dateStr} at ${preBookingTime}.`;
            setFormState(prev => ({ ...prev, message: msg }));
        }
    }, [preBookingDate, preBookingTime]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Logic to determine final date and time values to send
        let finalDate = preBookingDate;
        let finalTime = preBookingTime;

        // New: Clean string formats for n8n (no timezone conversion)
        let dateStr = '';  // YYYY-MM-DD
        let timeStr = '';  // HH:MM (24-hour)

        if (!finalDate && formState.requestedDate) {
            const dateObj = new Date(formState.requestedDate);
            finalDate = dateObj.toISOString();
            finalTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Extract clean date string
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            dateStr = `${year}-${month}-${day}`;

            // Extract clean time string (24-hour)
            const hours = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');
            timeStr = `${hours}:${minutes}`;
        } else if (finalDate) {
            // From Demo page - extract date part
            const dateObj = new Date(finalDate);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            dateStr = `${year}-${month}-${day}`;
            timeStr = finalTime || '';
        }

        const payload = {
            appointmentDate: finalDate || new Date().toISOString(),
            appointmentTime: finalTime || "Unspecified",
            appointmentDateStr: dateStr || undefined,
            appointmentTimeStr: timeStr || undefined,
            plan: "Custom",
            fullName: formState.name,
            businessName: formState.business,
            email: formState.email,
            phone: formState.phone,
            industry: formState.industry,
            missionBrief: formState.message
        };

        try {
            const response = await fetch('/api/book-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                // Navigate to confirmation page with booking data
                navigate('/booking-confirmed', {
                    state: {
                        fullName: formState.name,
                        businessName: formState.business,
                        email: formState.email,
                        appointmentDate: finalDate || new Date().toISOString(),
                        appointmentTime: finalTime || "Unspecified"
                    },
                    replace: true
                });
            } else {
                console.error("Server Error:", data);
                alert("Submission Error: " + (data.message || "Please check your inputs and try again."));
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Connection Failed. Please ensure the backend server is running on port 3001.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const formatDateForDisplay = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

                    <AnimatedSection>
                        <h1 className="text-6xl md:text-8xl font-serif italic font-light text-white mb-12">Initiate <br /> Protocol.</h1>
                        <p className="text-xl text-white/60 mb-16 font-sans max-w-md">
                            Ready to reclaim your time? Fill out the form, and our automation architects will be in touch within 24 hours.
                        </p>

                        <div className="space-y-12">
                            <div className="flex items-start gap-6 group cursor-pointer">
                                <div className="w-12 h-12 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-serif italic text-2xl mb-1">Call Us</h3>
                                    <p className="text-white/60 font-sans">+1 (437) 268-3706</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group cursor-pointer">
                                <div className="w-12 h-12 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-serif italic text-2xl mb-1">Email Us</h3>
                                    <p className="text-white/60 font-sans">contact@aira.agency</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Unified Session Configuration Card */}
                            <div className="bg-white/5 border border-white/20 p-8 rounded-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] pointer-events-none"></div>

                                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                                    <div className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Session Configuration</div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${preBookingDate ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'}`}></div>
                                        <span className="text-xs font-sans font-bold text-white/40 uppercase">{preBookingDate ? 'Reserved' : 'Configuring'}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-8">
                                    {/* Time Selector / Display */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 font-sans">
                                            <Calendar className="w-3 h-3" /> {preBookingDate ? 'Confirmed Time' : 'Preferred Time'}
                                        </label>

                                        {preBookingDate && preBookingTime ? (
                                            // Display Mode (From Demo)
                                            <div className="flex items-center gap-6 py-3 border-b border-white/20">
                                                <div className="flex items-center gap-2 text-white">
                                                    <span className="font-serif italic text-2xl">
                                                        {formatDateForDisplay(preBookingDate)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-white/60">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="font-sans text-lg">{preBookingTime}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            // Input Mode (Direct)
                                            <div className="relative">
                                                <input
                                                    type="datetime-local"
                                                    name="requestedDate"
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white font-serif italic text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                                                    style={{ colorScheme: 'dark' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formState.name}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white font-serif italic text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                                        placeholder="John Doe"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Business</label>
                                    <input
                                        type="text"
                                        name="business"
                                        required
                                        value={formState.business}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white font-serif italic text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                                        placeholder="Company Ltd."
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formState.email}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white font-serif italic text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                                        placeholder="john@company.com"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formState.phone}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white font-serif italic text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                                        placeholder="+1 (555) 000-0000"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Industry</label>
                                <select
                                    name="industry"
                                    value={formState.industry}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-white font-serif italic text-xl focus:outline-none focus:border-white transition-colors appearance-none"
                                    onChange={handleChange}
                                >
                                    <option value="" className="bg-black">Select Industry</option>
                                    <option value="Medical" className="bg-black">Medical / Healthcare</option>
                                    <option value="Real Estate" className="bg-black">Real Estate</option>
                                    <option value="Logistics" className="bg-black">Logistics / Transport</option>
                                    <option value="Professional Services" className="bg-black">Professional Services</option>
                                    <option value="Other" className="bg-black">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Mission Brief</label>
                                <textarea
                                    name="message"
                                    rows={3}
                                    value={formState.message}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-white font-serif italic text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/20 resize-none"
                                    placeholder="Describe your automation needs..."
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="pt-8">
                                <Button type="submit" className="w-full md:w-auto" size="lg" disabled={isSubmitting} icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}>
                                    {isSubmitting ? 'Processing...' : (preBookingDate ? 'Confirm Appointment' : 'Send Message')}
                                </Button>
                            </div>
                        </form>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

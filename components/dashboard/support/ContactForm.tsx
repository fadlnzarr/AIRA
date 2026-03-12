
import React, { useState } from 'react';
import { Send, Upload, Loader2, CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Mock API call
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center h-[400px]">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl text-white font-serif italic mb-2">Message Sent</h3>
                <p className="text-white/50 max-w-xs mb-6">
                    Our support team has received your request and will respond within 24 hours.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-sm text-white/60 hover:text-white underline decoration-white/20 hover:decoration-white/60 transition-colors"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-serif italic text-white mb-6">Contact Support</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs text-white/50 uppercase tracking-widest pl-1">Name</label>
                        <input
                            type="text"
                            defaultValue="Fadil Nizar" // Mock pre-fill
                            className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-sm text-white focus:border-white/30 focus:outline-none placeholder:text-white/20"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs text-white/50 uppercase tracking-widest pl-1">Email</label>
                        <input
                            type="email"
                            defaultValue="fadil@example.com"
                            className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-sm text-white focus:border-white/30 focus:outline-none placeholder:text-white/20"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs text-white/50 uppercase tracking-widest pl-1">Category</label>
                    <select className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-sm text-white focus:border-white/30 focus:outline-none appearance-none">
                        <option>Technical Issue</option>
                        <option>Billing Question</option>
                        <option>Feature Request</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs text-white/50 uppercase tracking-widest pl-1">Message</label>
                    <textarea
                        rows={5}
                        placeholder="Describe your issue..."
                        required
                        className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-lg text-sm text-white focus:border-white/30 focus:outline-none placeholder:text-white/20 resize-none"
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <button type="button" className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors">
                        <Upload className="w-4 h-4" />
                        Attach Screenshot (Optional)
                    </button>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                        {status === 'submitting' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Send Message
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

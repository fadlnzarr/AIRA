
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../src/lib/AuthContext';
import { Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Shield, Users } from 'lucide-react';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Small delay for feel
        await new Promise(r => setTimeout(r, 600));

        const result = login(username, password);
        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.error || 'Invalid credentials');
            setShake(true);
            setTimeout(() => setShake(false), 600);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <style>{`
                    .login-bg {
                        background:
                            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 45%),
                            radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 40%),
                            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 30%, #0f0f0f 60%, #111111 100%);
                    }
                `}</style>
                <div className="absolute inset-0 login-bg" />
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <motion.div
                    animate={shake ? { x: [0, -12, 12, -8, 8, -4, 4, 0] } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                        {/* Logo */}
                        <div className="text-center mb-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6"
                            >
                                <span className="text-white font-bold text-2xl tracking-tighter" style={{ fontFamily: 'serif' }}>A</span>
                            </motion.div>
                            <h1 className="text-2xl font-light text-white tracking-tight mb-2">
                                Welcome to <span className="font-semibold">AIRA</span>
                            </h1>
                            <p className="text-white/40 text-sm">
                                Sign in to access your dashboard
                            </p>
                        </div>


                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Username */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Username</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter username"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all text-sm"
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        className="w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all text-sm"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, y: -5, height: 0 }}
                                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                                    >
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading || !username || !password}
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black rounded-xl font-medium text-sm hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all group"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="text-center text-white/20 text-xs mt-8">
                            AIRA · AI Voice Automation Platform
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

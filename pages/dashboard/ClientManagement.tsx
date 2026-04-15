
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, ClientAccount } from '../../src/lib/AuthContext';
import { UserPlus, Trash2, Users, X, Eye, EyeOff, AlertCircle, Check, User, Lock, Calendar } from 'lucide-react';

export const ClientManagement: React.FC = () => {
    const { clients, createClient, deleteClient } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const result = createClient(username, password, displayName);
        if (result.success) {
            setSuccess(`Client "${displayName || username}" created successfully`);
            setUsername('');
            setPassword('');
            setDisplayName('');
            setTimeout(() => { setShowModal(false); setSuccess(''); }, 1200);
        } else {
            setError(result.error || 'Failed to create client');
        }
    };

    const handleDelete = (uname: string) => {
        deleteClient(uname);
        setDeleteConfirm(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] mb-1">Client Accounts</h2>
                    <p className="text-[#1A1A1A]/60 text-sm">Create and manage client login credentials.</p>
                </div>
                <button
                    onClick={() => { setShowModal(true); setError(''); setSuccess(''); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] text-white rounded-xl text-sm font-medium hover:bg-[#1A1A1A]/90 transition-all shadow-lg shadow-black/10"
                >
                    <UserPlus className="w-4 h-4" />
                    Create Client
                </button>
            </div>

            {/* Client List */}
            {clients.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-[#1A1A1A]/30"
                >
                    <Users className="w-12 h-12 mb-4 opacity-40" />
                    <p className="text-lg font-medium mb-1">No client accounts yet</p>
                    <p className="text-sm">Click "Create Client" to generate login credentials.</p>
                </motion.div>
            ) : (
                <div className="bg-white/40 backdrop-blur-sm border border-[#1A1A1A]/10 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#1A1A1A]/5">
                                <th className="text-left px-6 py-4 text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider">Client</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider">Username</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider">Created</th>
                                <th className="text-right px-6 py-4 text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client, index) => (
                                <motion.tr
                                    key={client.username}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-[#1A1A1A]/5 last:border-0 hover:bg-[#1A1A1A]/[0.02] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center text-sm font-medium text-[#1A1A1A]/60">
                                                {client.displayName.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-sm text-[#1A1A1A]">{client.displayName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-xs bg-[#1A1A1A]/5 px-2 py-1 rounded-lg text-[#1A1A1A]/60">{client.username}</code>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#1A1A1A]/50">
                                        {new Date(client.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {deleteConfirm === client.username ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-xs text-red-500">Delete?</span>
                                                <button
                                                    onClick={() => handleDelete(client.username)}
                                                    className="px-2.5 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="px-2.5 py-1 bg-[#1A1A1A]/5 text-[#1A1A1A]/60 text-xs rounded-lg hover:bg-[#1A1A1A]/10 transition-colors"
                                                >
                                                    No
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(client.username)}
                                                className="p-2 hover:bg-red-50 rounded-lg text-[#1A1A1A]/30 hover:text-red-500 transition-all"
                                                title="Delete client"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Client Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                        onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]/5">
                                <h3 className="text-lg font-medium text-[#1A1A1A]">Create Client Account</h3>
                                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-[#1A1A1A]/5 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleCreate} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-[#1A1A1A]/40 uppercase tracking-wider">Display Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/30" />
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            placeholder="e.g. Cyril Thomas"
                                            className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/20 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-[#1A1A1A]/40 uppercase tracking-wider">Username</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 text-sm">@</span>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="cyril.thomas"
                                            className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/20 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-[#1A1A1A]/40 uppercase tracking-wider">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/30" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Min 4 characters"
                                            className="w-full pl-10 pr-12 py-3 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/20 transition-colors"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm"
                                        >
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}
                                    {success && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm"
                                        >
                                            <Check className="w-4 h-4 flex-shrink-0" />
                                            {success}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={!username || !password}
                                    className="w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-medium hover:bg-[#1A1A1A]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    Create Account
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

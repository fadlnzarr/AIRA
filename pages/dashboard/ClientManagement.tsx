
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, ClientAccount } from '../../src/lib/AuthContext';
import { UserPlus, Trash2, Users, X, Eye, EyeOff, AlertCircle, Check, User, Lock, Calendar, Link2, Pencil } from 'lucide-react';

// ─── Shared field component ──────────────────────────────────────────────────
interface FieldProps {
    label: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    hint?: string;
}
const Field: React.FC<FieldProps> = ({ label, icon, children, hint }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#1A1A1A]/40 uppercase tracking-wider">{label}</label>
        <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 flex items-center">{icon}</span>
            {children}
        </div>
        {hint && <p className="text-[10px] text-[#1A1A1A]/30 pl-1">{hint}</p>}
    </div>
);

// ─── Common input className ──────────────────────────────────────────────────
const inputCls = "w-full pl-10 pr-4 py-3 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/20 transition-colors";

// ─── Main component ───────────────────────────────────────────────────────────
export const ClientManagement: React.FC = () => {
    const { clients, createClient, updateClient, deleteClient } = useAuth();

    // ── Create modal state ──
    const [showCreate, setShowCreate] = useState(false);
    const [createForm, setCreateForm] = useState({ username: '', password: '', displayName: '', spreadsheetUrl: '' });
    const [showCreatePwd, setShowCreatePwd] = useState(false);
    const [createError, setCreateError] = useState('');
    const [createSuccess, setCreateSuccess] = useState('');

    // ── Edit modal state ──
    const [editingClient, setEditingClient] = useState<ClientAccount | null>(null);
    const [editForm, setEditForm] = useState({ username: '', password: '', displayName: '', spreadsheetUrl: '' });
    const [showEditPwd, setShowEditPwd] = useState(false);
    const [editError, setEditError] = useState('');
    const [editSuccess, setEditSuccess] = useState('');

    // ── Delete confirm ──
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    // ── Handlers: Create ──
    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError('');
        setCreateSuccess('');
        const result = createClient(
            createForm.username,
            createForm.password,
            createForm.displayName,
            createForm.spreadsheetUrl,
        );
        if (result.success) {
            setCreateSuccess(`Client "${createForm.displayName || createForm.username}" created successfully`);
            setCreateForm({ username: '', password: '', displayName: '', spreadsheetUrl: '' });
            setTimeout(() => { setShowCreate(false); setCreateSuccess(''); }, 1200);
        } else {
            setCreateError(result.error || 'Failed to create client');
        }
    };

    // ── Handlers: Edit ──
    const openEdit = (client: ClientAccount) => {
        setEditingClient(client);
        setEditForm({
            username: client.username,
            password: client.password,
            displayName: client.displayName,
            spreadsheetUrl: client.spreadsheetUrl,
        });
        setEditError('');
        setEditSuccess('');
        setShowEditPwd(false);
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingClient) return;
        setEditError('');
        setEditSuccess('');

        const result = updateClient(editingClient.username, {
            username: editForm.username,
            password: editForm.password,
            displayName: editForm.displayName,
            spreadsheetUrl: editForm.spreadsheetUrl,
        });

        if (result.success) {
            setEditSuccess('Changes saved successfully');
            setTimeout(() => { setEditingClient(null); setEditSuccess(''); }, 1200);
        } else {
            setEditError(result.error || 'Failed to update client');
        }
    };

    // ── Handlers: Delete ──
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
                    onClick={() => { setShowCreate(true); setCreateError(''); setCreateSuccess(''); }}
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
                                <th className="text-left px-6 py-4 text-xs font-semibold text-[#1A1A1A]/40 uppercase tracking-wider">Spreadsheet</th>
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
                                    <td className="px-6 py-4">
                                        {client.spreadsheetUrl ? (
                                            <a
                                                href={client.spreadsheetUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100"
                                            >
                                                <Link2 className="w-3 h-3" />
                                                View Sheet
                                            </a>
                                        ) : (
                                            <span className="text-xs text-[#1A1A1A]/30">—</span>
                                        )}
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
                                            <div className="flex items-center justify-end gap-1">
                                                {/* Edit button */}
                                                <button
                                                    onClick={() => openEdit(client)}
                                                    className="p-2 hover:bg-[#1A1A1A]/5 rounded-lg text-[#1A1A1A]/30 hover:text-[#1A1A1A]/70 transition-all"
                                                    title="Edit client"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                {/* Delete button */}
                                                <button
                                                    onClick={() => setDeleteConfirm(client.username)}
                                                    className="p-2 hover:bg-red-50 rounded-lg text-[#1A1A1A]/30 hover:text-red-500 transition-all"
                                                    title="Delete client"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ── Create Client Modal ── */}
            <AnimatePresence>
                {showCreate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                        onClick={(e) => { if (e.target === e.currentTarget) setShowCreate(false); }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]/5">
                                <h3 className="text-lg font-medium text-[#1A1A1A]">Create Client Account</h3>
                                <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-lg hover:bg-[#1A1A1A]/5 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <form onSubmit={handleCreate} className="p-6 space-y-4">
                                <Field label="Display Name" icon={<User className="w-4 h-4" />}>
                                    <input
                                        type="text"
                                        value={createForm.displayName}
                                        onChange={(e) => setCreateForm(f => ({ ...f, displayName: e.target.value }))}
                                        placeholder="e.g. Cyril Thomas"
                                        className={inputCls}
                                    />
                                </Field>

                                <Field label="Username" icon={<span className="text-sm">@</span>}>
                                    <input
                                        type="text"
                                        value={createForm.username}
                                        onChange={(e) => setCreateForm(f => ({ ...f, username: e.target.value }))}
                                        placeholder="cyril.thomas"
                                        className={inputCls}
                                        required
                                    />
                                </Field>

                                <Field label="Password" icon={<Lock className="w-4 h-4" />}>
                                    <input
                                        type={showCreatePwd ? 'text' : 'password'}
                                        value={createForm.password}
                                        onChange={(e) => setCreateForm(f => ({ ...f, password: e.target.value }))}
                                        placeholder="Min 4 characters"
                                        className={`${inputCls} pr-12`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCreatePwd(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors"
                                    >
                                        {showCreatePwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </Field>

                                <Field
                                    label="Google Spreadsheet URL"
                                    icon={<Link2 className="w-4 h-4" />}
                                    hint="Paste the full URL of the client's dedicated Google Sheet. It must be published to web."
                                >
                                    <input
                                        type="url"
                                        value={createForm.spreadsheetUrl}
                                        onChange={(e) => setCreateForm(f => ({ ...f, spreadsheetUrl: e.target.value }))}
                                        placeholder="https://docs.google.com/spreadsheets/d/..."
                                        className={inputCls}
                                        required
                                    />
                                </Field>

                                <AnimatePresence>
                                    {createError && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm">
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />{createError}
                                        </motion.div>
                                    )}
                                    {createSuccess && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm">
                                            <Check className="w-4 h-4 flex-shrink-0" />{createSuccess}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={!createForm.username || !createForm.password || !createForm.spreadsheetUrl}
                                    className="w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-medium hover:bg-[#1A1A1A]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    Create Account
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Edit Client Modal ── */}
            <AnimatePresence>
                {editingClient && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                        onClick={(e) => { if (e.target === e.currentTarget) setEditingClient(null); }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]/5">
                                <div>
                                    <h3 className="text-lg font-medium text-[#1A1A1A]">Edit Client</h3>
                                    <p className="text-xs text-[#1A1A1A]/40 mt-0.5">
                                        Editing <code className="bg-[#1A1A1A]/5 px-1.5 py-0.5 rounded">{editingClient.username}</code>
                                    </p>
                                </div>
                                <button onClick={() => setEditingClient(null)} className="p-1.5 rounded-lg hover:bg-[#1A1A1A]/5 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleEdit} className="p-6 space-y-4">
                                <Field label="Display Name" icon={<User className="w-4 h-4" />}>
                                    <input
                                        type="text"
                                        value={editForm.displayName}
                                        onChange={(e) => setEditForm(f => ({ ...f, displayName: e.target.value }))}
                                        placeholder="Display name"
                                        className={inputCls}
                                    />
                                </Field>

                                <Field label="Username" icon={<span className="text-sm">@</span>}>
                                    <input
                                        type="text"
                                        value={editForm.username}
                                        onChange={(e) => setEditForm(f => ({ ...f, username: e.target.value }))}
                                        placeholder="username"
                                        className={inputCls}
                                        required
                                    />
                                </Field>

                                <Field label="Password" icon={<Lock className="w-4 h-4" />}>
                                    <input
                                        type={showEditPwd ? 'text' : 'password'}
                                        value={editForm.password}
                                        onChange={(e) => setEditForm(f => ({ ...f, password: e.target.value }))}
                                        placeholder="Min 4 characters"
                                        className={`${inputCls} pr-12`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowEditPwd(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors"
                                    >
                                        {showEditPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </Field>

                                <Field
                                    label="Google Spreadsheet URL"
                                    icon={<Link2 className="w-4 h-4" />}
                                    hint="Paste the full URL of the client's dedicated Google Sheet."
                                >
                                    <input
                                        type="url"
                                        value={editForm.spreadsheetUrl}
                                        onChange={(e) => setEditForm(f => ({ ...f, spreadsheetUrl: e.target.value }))}
                                        placeholder="https://docs.google.com/spreadsheets/d/..."
                                        className={inputCls}
                                        required
                                    />
                                </Field>

                                <AnimatePresence>
                                    {editError && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm">
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />{editError}
                                        </motion.div>
                                    )}
                                    {editSuccess && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm">
                                            <Check className="w-4 h-4 flex-shrink-0" />{editSuccess}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setEditingClient(null)}
                                        className="flex-1 py-3 bg-[#1A1A1A]/5 text-[#1A1A1A]/70 rounded-xl text-sm font-medium hover:bg-[#1A1A1A]/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!editForm.username || !editForm.password || !editForm.spreadsheetUrl}
                                        className="flex-1 py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-medium hover:bg-[#1A1A1A]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

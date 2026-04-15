
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// --- Types ---
export type UserRole = 'admin' | 'client';

export interface User {
    username: string;
    role: UserRole;
    displayName: string;
}

export interface ClientAccount {
    username: string;
    password: string;
    displayName: string;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => { success: boolean; error?: string };
    logout: () => void;
    clients: ClientAccount[];
    createClient: (username: string, password: string, displayName: string) => { success: boolean; error?: string };
    deleteClient: (username: string) => void;
}

// --- Hardcoded Admin ---
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'aira2026',
    displayName: 'Fadil Nizar',
    role: 'admin' as UserRole,
};

// --- localStorage keys ---
const STORAGE_KEYS = {
    user: 'aira_auth_user',
    clients: 'aira_clients',
};

// --- Context ---
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
};

// --- Provider ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.user);
            return stored ? JSON.parse(stored) : null;
        } catch { return null; }
    });

    const [clients, setClients] = useState<ClientAccount[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.clients);
            return stored ? JSON.parse(stored) : [];
        } catch { return []; }
    });

    // Persist user
    useEffect(() => {
        if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
        else localStorage.removeItem(STORAGE_KEYS.user);
    }, [user]);

    // Persist clients
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(clients));
    }, [clients]);

    const login = useCallback((username: string, password: string) => {
        const trimUser = username.trim().toLowerCase();
        const trimPass = password.trim();

        // Check admin
        if (trimUser === ADMIN_CREDENTIALS.username && trimPass === ADMIN_CREDENTIALS.password) {
            setUser({ username: ADMIN_CREDENTIALS.username, role: 'admin', displayName: ADMIN_CREDENTIALS.displayName });
            return { success: true };
        }

        // Check clients
        const client = clients.find(c => c.username.toLowerCase() === trimUser && c.password === trimPass);
        if (client) {
            setUser({ username: client.username, role: 'client', displayName: client.displayName });
            return { success: true };
        }

        return { success: false, error: 'Invalid username or password' };
    }, [clients]);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const createClient = useCallback((username: string, password: string, displayName: string) => {
        const trimUser = username.trim().toLowerCase();
        if (!trimUser || !password.trim()) return { success: false, error: 'Username and password are required' };
        if (trimUser === 'admin') return { success: false, error: 'Cannot use reserved username' };
        if (clients.some(c => c.username.toLowerCase() === trimUser)) return { success: false, error: 'Username already exists' };
        if (password.trim().length < 4) return { success: false, error: 'Password must be at least 4 characters' };

        const newClient: ClientAccount = {
            username: trimUser,
            password: password.trim(),
            displayName: displayName.trim() || trimUser,
            createdAt: new Date().toISOString(),
        };
        setClients(prev => [...prev, newClient]);
        return { success: true };
    }, [clients]);

    const deleteClient = useCallback((username: string) => {
        setClients(prev => prev.filter(c => c.username !== username));
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, clients, createClient, deleteClient }}>
            {children}
        </AuthContext.Provider>
    );
};

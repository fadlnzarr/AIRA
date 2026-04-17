
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// --- Types ---
export type UserRole = 'admin' | 'client';

export interface User {
    username: string;
    role: UserRole;
    displayName: string;
    spreadsheetUrl?: string;
}

export interface ClientAccount {
    username: string;
    password: string;
    displayName: string;
    spreadsheetUrl: string;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => { success: boolean; error?: string };
    logout: () => void;
    clients: ClientAccount[];
    createClient: (username: string, password: string, displayName: string, spreadsheetUrl: string) => { success: boolean; error?: string };
    updateClient: (originalUsername: string, updates: Partial<Pick<ClientAccount, 'username' | 'password' | 'displayName' | 'spreadsheetUrl'>>) => { success: boolean; error?: string };
    deleteClient: (username: string) => void;
    adminSettings: { spreadsheetUrl?: string };
    updateAdminSpreadsheet: (url: string) => { success: boolean; error?: string };
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
    adminSettings: 'aira_admin_settings',
};

// --- Helpers ---

/**
 * Extracts the Google Sheets spreadsheet ID from a full URL.
 * Supports formats like:
 *   https://docs.google.com/spreadsheets/d/SHEET_ID/edit
 *   https://docs.google.com/spreadsheets/d/SHEET_ID/
 *   https://docs.google.com/spreadsheets/d/SHEET_ID
 */
export function extractSheetId(url: string): string | null {
    if (!url) return null;
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}

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

    const [adminSettings, setAdminSettings] = useState<{ spreadsheetUrl?: string }>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.adminSettings);
            return stored ? JSON.parse(stored) : {};
        } catch { return {}; }
    });

    const hasHydrated = useRef(false);

    // Persist user
    useEffect(() => {
        if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
        else localStorage.removeItem(STORAGE_KEYS.user);
    }, [user]);

    // Persist clients — skip the initial render to prevent overwriting stored data
    useEffect(() => {
        if (!hasHydrated.current) {
            hasHydrated.current = true;
            return;
        }
        localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(clients));
    }, [clients]);

    useEffect(() => {
        if (!hasHydrated.current) return;
        localStorage.setItem(STORAGE_KEYS.adminSettings, JSON.stringify(adminSettings));
    }, [adminSettings]);

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
            setUser({
                username: client.username,
                role: 'client',
                displayName: client.displayName,
                spreadsheetUrl: client.spreadsheetUrl,
            });
            return { success: true };
        }

        return { success: false, error: 'Invalid username or password' };
    }, [clients]);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const createClient = useCallback((username: string, password: string, displayName: string, spreadsheetUrl: string) => {
        const trimUser = username.trim().toLowerCase();
        if (!trimUser || !password.trim()) return { success: false, error: 'Username and password are required' };
        if (trimUser === 'admin') return { success: false, error: 'Cannot use reserved username' };
        if (clients.some(c => c.username.toLowerCase() === trimUser)) return { success: false, error: 'Username already exists' };
        if (password.trim().length < 4) return { success: false, error: 'Password must be at least 4 characters' };

        // Validate spreadsheet URL
        const trimUrl = spreadsheetUrl.trim();
        if (!trimUrl) return { success: false, error: 'Spreadsheet URL is required' };
        const sheetId = extractSheetId(trimUrl);
        if (!sheetId) return { success: false, error: 'Invalid Google Sheets URL. Paste the full URL from your browser.' };

        const newClient: ClientAccount = {
            username: trimUser,
            password: password.trim(),
            displayName: displayName.trim() || trimUser,
            spreadsheetUrl: trimUrl,
            createdAt: new Date().toISOString(),
        };
        setClients(prev => [...prev, newClient]);
        return { success: true };
    }, [clients]);

    const updateClient = useCallback((originalUsername: string, updates: Partial<Pick<ClientAccount, 'username' | 'password' | 'displayName' | 'spreadsheetUrl'>>) => {
        const newUsername = updates.username?.trim().toLowerCase();
        const existing = clients.find(c => c.username === originalUsername);
        if (!existing) return { success: false, error: 'Client not found' };

        if (newUsername && newUsername !== originalUsername) {
            if (newUsername === 'admin') return { success: false, error: 'Cannot use reserved username' };
            if (clients.some(c => c.username.toLowerCase() === newUsername)) return { success: false, error: 'Username already exists' };
        }
        if (updates.password !== undefined && updates.password.trim().length < 4) {
            return { success: false, error: 'Password must be at least 4 characters' };
        }
        if (updates.spreadsheetUrl !== undefined) {
            const trimUrl = updates.spreadsheetUrl.trim();
            const sheetId = extractSheetId(trimUrl);
            if (!sheetId) return { success: false, error: 'Invalid Google Sheets URL. Paste the full URL from your browser.' };
            updates = { ...updates, spreadsheetUrl: trimUrl };
        }

        setClients(prev => prev.map(c => {
            if (c.username !== originalUsername) return c;
            return {
                ...c,
                username: newUsername || c.username,
                password: updates.password?.trim() || c.password,
                displayName: updates.displayName?.trim() || c.displayName,
                spreadsheetUrl: updates.spreadsheetUrl ?? c.spreadsheetUrl,
            };
        }));

        // Update active session if this client is logged in
        setUser(prev => {
            if (!prev || prev.username !== originalUsername) return prev;
            return {
                ...prev,
                username: newUsername || prev.username,
                displayName: updates.displayName?.trim() || prev.displayName,
                spreadsheetUrl: updates.spreadsheetUrl ?? prev.spreadsheetUrl,
            };
        });

        return { success: true };
    }, [clients]);

    const deleteClient = useCallback((username: string) => {
        setClients(prev => prev.filter(c => c.username !== username));
    }, []);

    const updateAdminSpreadsheet = useCallback((url: string) => {
        const trimUrl = url.trim();
        if (trimUrl) {
            const sheetId = extractSheetId(trimUrl);
            if (!sheetId) return { success: false, error: 'Invalid Google Sheets URL. Paste the full URL from your browser.' };
        }
        setAdminSettings(prev => ({ ...prev, spreadsheetUrl: trimUrl }));
        return { success: true };
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, clients, createClient, updateClient, deleteClient, adminSettings, updateAdminSpreadsheet }}>
            {children}
        </AuthContext.Provider>
    );
};

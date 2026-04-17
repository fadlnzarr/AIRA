import React, { createContext, useContext, useState } from 'react';

interface AdminSelectedClientContextType {
    selectedClientUsername: string | null;
    setSelectedClientUsername: (username: string | null) => void;
}

const AdminSelectedClientContext = createContext<AdminSelectedClientContextType | null>(null);

export const useAdminSelectedClient = () => {
    const context = useContext(AdminSelectedClientContext);
    if (!context) {
        throw new Error('useAdminSelectedClient must be used within an AdminSelectedClientProvider');
    }
    return context;
};

export const AdminSelectedClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedClientUsername, setSelectedClientUsername] = useState<string | null>(null);

    return (
        <AdminSelectedClientContext.Provider value={{ selectedClientUsername, setSelectedClientUsername }}>
            {children}
        </AdminSelectedClientContext.Provider>
    );
};

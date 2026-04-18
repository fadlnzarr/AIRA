/**
 * Hook that resolves the current logged-in user's Google Sheet ID.
 * - Admin users use the default sheet.
 * - Client users use their dedicated spreadsheet.
 */

import { useMemo } from 'react';
import { useAuth, extractSheetId } from './AuthContext';
import { useAdminSelectedClient } from './useAdminSelectedClient';

export function useClientSheetId(): string | undefined {
    const { user, clients, adminSettings } = useAuth();
    const { selectedClientUsername } = useAdminSelectedClient();

    return useMemo(() => {
        if (!user) return undefined;
        if (user.role === 'admin') {
            if (selectedClientUsername) {
                const client = clients.find(c => c.username === selectedClientUsername);
                if (client && client.spreadsheetUrl) {
                    return extractSheetId(client.spreadsheetUrl) ?? undefined;
                }
            }
            // If AIRA (null selected client) and has custom sheet
            if (adminSettings?.spreadsheetUrl) {
                return extractSheetId(adminSettings.spreadsheetUrl) ?? undefined;
            }
            return undefined; // undefined = use DEFAULT_SHEET_ID
        }
        if (user.spreadsheetUrl) {
            return extractSheetId(user.spreadsheetUrl) ?? undefined;
        }
        return undefined;
    }, [user, selectedClientUsername, clients, adminSettings]);
}

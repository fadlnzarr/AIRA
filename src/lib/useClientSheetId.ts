/**
 * Hook that resolves the current logged-in user's Google Sheet ID.
 * - Admin users use the default sheet.
 * - Client users use their dedicated spreadsheet.
 */

import { useMemo } from 'react';
import { useAuth, extractSheetId } from './AuthContext';

export function useClientSheetId(): string | undefined {
    const { user } = useAuth();

    return useMemo(() => {
        if (!user) return undefined;
        if (user.role === 'admin') return undefined; // undefined = use DEFAULT_SHEET_ID
        if (user.spreadsheetUrl) {
            return extractSheetId(user.spreadsheetUrl) ?? undefined;
        }
        return undefined;
    }, [user]);
}

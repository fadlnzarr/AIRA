/**
 * React hook for fetching data from Google Sheets with:
 * - Auto-polling every 30 seconds
 * - Manual refresh capability
 * - Loading/error states
 * - Last updated timestamp
 */

import { useState, useEffect, useCallback, useRef } from 'react';

const POLL_INTERVAL_MS = 30_000; // 30 seconds

interface UseGoogleSheetsResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    lastUpdated: Date | null;
    refresh: () => Promise<void>;
}

export function useGoogleSheets<T>(
    fetcher: () => Promise<T>,
    deps: any[] = []
): UseGoogleSheetsResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isMountedRef = useRef(true);

    const fetchData = useCallback(async (isInitial = false) => {
        try {
            if (isInitial) setLoading(true);
            setError(null);

            const result = await fetcher();

            if (isMountedRef.current) {
                setData(result);
                setLastUpdated(new Date());
            }
        } catch (err: any) {
            if (isMountedRef.current) {
                setError(err.message || 'Failed to fetch data');
                console.error('[GoogleSheets] Fetch error:', err);
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [fetcher]);

    // Initial fetch + polling
    useEffect(() => {
        isMountedRef.current = true;
        fetchData(true);

        intervalRef.current = setInterval(() => {
            fetchData(false);
        }, POLL_INTERVAL_MS);

        return () => {
            isMountedRef.current = false;
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [...deps]);

    const refresh = useCallback(async () => {
        await fetchData(false);
    }, [fetchData]);

    return { data, loading, error, lastUpdated, refresh };
}

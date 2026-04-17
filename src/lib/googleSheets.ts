/**
 * Google Sheets Data Service
 * Fetches CSV data from published Google Sheets and parses into typed objects.
 * Each client can have their own spreadsheet — pass a sheetId to override the default.
 */

export const DEFAULT_SHEET_ID = '1MwZ4Xqp3M__lIjQRxsfSCPXzAPjRoyqa22DxWSkiynA';

// GIDs for each sheet tab
const GIDS = {
    customers: '0',
    employees: '53732171',
    appointments: '480945957',
    callLog: '364698314',
} as const;

// --- Raw Row Types (matching Google Sheet columns) ---

export interface RawCustomer {
    'Customer Name': string;
    'Customer Type': string;
    'Customer Phone Number': string;
    'Customer Email Address': string;
    'Customer Email Password': string;
    'Customer Address': string;
    'Customer Status': string;
}

export interface RawEmployee {
    'Employee Name': string;
    'Employee Designation': string;
    'Employee Manager': string;
    'Employee Phone Number': string;
    'Employee Email Address': string;
    'Employee Password': string;
    'Speciality': string;
    'Status': string;
    'Calender ID': string;
}

export interface RawAppointment {
    'Customer Email Address': string;
    'Type of Appointment': string;
    'Issue Description': string;
    'Appointment Urgency': string;
    'Appointment Timing': string;
    'Assigned Technician Email Address': string;
    'Assigned Technician Name': string;
    'Appointment Status': string;
    'Appointment Address': string;
    'Event ID': string;
}

export interface RawCallLog {
    'Customer Name': string;
    'Customer Email': string;
    'Phone': string;
    'Call Summary': string;
    'Lead Status': string;
    'Lead Reason': string;
    'Sentiment': string;
    'Urgency': string;
    'Follow Up needed?': string;
    'created at': string;
    'Booked': string;
}

// --- CSV Fetching & Parsing ---

function parseCSV(csv: string): Record<string, string>[] {
    const lines = csv.split('\n').map(l => l.replace(/\r$/, ''));
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const rows: Record<string, string>[] = [];

    // Handle multi-line quoted fields by joining lines when quotes are unbalanced
    let i = 1;
    while (i < lines.length) {
        let line = lines[i];
        // Count quotes — if odd, the field spans multiple lines
        while (countQuotes(line) % 2 !== 0 && i + 1 < lines.length) {
            i++;
            line += '\n' + lines[i];
        }

        if (line.trim() === '') {
            i++;
            continue;
        }

        const values = parseCSVLine(line);
        const row: Record<string, string> = {};
        headers.forEach((header, idx) => {
            row[header] = (values[idx] || '').trim();
        });

        // Skip completely empty rows
        const hasData = Object.values(row).some(v => v !== '');
        if (hasData) {
            rows.push(row);
        }
        i++;
    }

    return rows;
}

function countQuotes(s: string): number {
    let count = 0;
    for (const c of s) {
        if (c === '"') count++;
    }
    return count;
}

function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (inQuotes) {
            if (char === '"') {
                if (i + 1 < line.length && line[i + 1] === '"') {
                    current += '"';
                    i++; // skip escaped quote
                } else {
                    inQuotes = false;
                }
            } else {
                current += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
    }
    result.push(current);
    return result;
}

async function fetchSheetCSV(gid: string, sheetId?: string): Promise<string> {
    const id = sheetId || DEFAULT_SHEET_ID;
    const url = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch sheet (gid=${gid}): ${response.status}`);
    }
    return response.text();
}

// --- Public Fetchers ---

export async function fetchCustomers(sheetId?: string): Promise<RawCustomer[]> {
    const csv = await fetchSheetCSV(GIDS.customers, sheetId);
    return parseCSV(csv) as unknown as RawCustomer[];
}

export async function fetchEmployees(sheetId?: string): Promise<RawEmployee[]> {
    const csv = await fetchSheetCSV(GIDS.employees, sheetId);
    return parseCSV(csv) as unknown as RawEmployee[];
}

export async function fetchAppointmentsRaw(sheetId?: string): Promise<RawAppointment[]> {
    const csv = await fetchSheetCSV(GIDS.appointments, sheetId);
    return parseCSV(csv) as unknown as RawAppointment[];
}

export async function fetchCallLogRaw(sheetId?: string): Promise<RawCallLog[]> {
    const csv = await fetchSheetCSV(GIDS.callLog, sheetId);
    return parseCSV(csv) as unknown as RawCallLog[];
}

// --- Helpers ---

function isDateInRange(dateStr: string, from: Date | null, to: Date | null): boolean {
    if (!dateStr) return false;
    if (!from && !to) return true; // All time
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return false;
        
        // Normalize dates to start/end of day for broader matching if needed, 
        // but for now strict comparison is safer.
        if (from && d < from) return false;
        if (to && d > to) return false;
        
        return true;
    } catch {
        return false;
    }
}

// --- Data Transformers (Sheet Data → Dashboard Interfaces) ---

import type { Appointment } from '../../components/dashboard/appointments/AppointmentsList';
import type { Call } from '../../components/dashboard/calls/CallsTable';
import type { Lead } from '../../components/dashboard/leads/LeadsTable';

function formatDateFromISO(isoString: string): { date: string; time: string } {
    try {
        const d = new Date(isoString);
        if (isNaN(d.getTime())) return { date: isoString, time: '' };
        const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return { date, time };
    } catch {
        return { date: isoString, time: '' };
    }
}

function mapAppointmentStatus(status: string): { status: Appointment['status']; statusType: Appointment['statusType'] } {
    const s = status.toLowerCase().trim();
    if (s === 'open' || s === 'confirmed') return { status: 'confirmed', statusType: 'success' };
    if (s === 'pending') return { status: 'pending', statusType: 'warning' };
    if (s === 'cancelled') return { status: 'cancelled', statusType: 'error' };
    if (s === 'completed') return { status: 'completed', statusType: 'success' };
    if (s === 'rescheduled') return { status: 'rescheduled', statusType: 'warning' };
    return { status: 'pending', statusType: 'neutral' };
}

export async function fetchAppointments(sheetId?: string): Promise<Appointment[]> {
    const [rawAppointments, rawCustomers] = await Promise.all([
        fetchAppointmentsRaw(sheetId),
        fetchCustomers(sheetId),
    ]);

    // Build email → name lookup from customers
    const emailToName: Record<string, string> = {};
    rawCustomers.forEach(c => {
        if (c['Customer Email Address']) {
            emailToName[c['Customer Email Address'].toLowerCase()] = c['Customer Name'];
        }
    });

    return rawAppointments.map((raw, index) => {
        const { date, time } = formatDateFromISO(raw['Appointment Timing']);
        const { status, statusType } = mapAppointmentStatus(raw['Appointment Status']);
        const clientEmail = raw['Customer Email Address'] || '';
        const clientName = emailToName[clientEmail.toLowerCase()] || clientEmail;

        return {
            id: raw['Event ID'] || String(index + 1),
            date,
            time,
            clientName,
            service: `${raw['Type of Appointment']} — ${raw['Issue Description']}`,
            staff: raw['Assigned Technician Name'] || 'Unassigned',
            status,
            statusType,
            source: 'ai' as const,
            email: clientEmail,
            notes: `Urgency: ${raw['Appointment Urgency']}`,
        };
    });
}

function mapCallOutcome(leadStatus: string): { outcome: string; statusType: Call['statusType'] } {
    const s = leadStatus.toLowerCase().trim();
    if (s === 'booked') return { outcome: 'Appointment Booked', statusType: 'success' };
    if (s === 'hot lead') return { outcome: 'Lead Captured', statusType: 'warning' };
    if (s === 'cold lead') return { outcome: 'No Action', statusType: 'neutral' };
    if (s === 'warm lead') return { outcome: 'Follow Up', statusType: 'warning' };
    return { outcome: leadStatus || 'Unknown', statusType: 'neutral' };
}

export async function fetchCalls(sheetId?: string): Promise<Call[]> {
    const rawCalls = await fetchCallLogRaw(sheetId);

    return rawCalls.map((raw, index) => {
        const { outcome, statusType } = mapCallOutcome(raw['Lead Status']);
        const createdAt = raw['created at'] || '';

        return {
            id: String(index + 1),
            date: createdAt,
            time: '',
            caller: raw['Customer Name'] || raw['Customer Email'] || 'Unknown',
            intent: raw['Lead Reason']
                ? raw['Lead Reason'].substring(0, 60) + (raw['Lead Reason'].length > 60 ? '…' : '')
                : 'General Inquiry',
            outcome,
            statusType,
            duration: '—',
            direction: 'inbound' as const,
            service: raw['Urgency'] || 'General',
            // Extra fields for drawer
            summary: raw['Call Summary'],
            sentiment: raw['Sentiment'],
            urgency: raw['Urgency'],
            followUp: raw['Follow Up needed?'],
            booked: raw['Booked'],
        };
    });
}

function mapLeadStatus(leadStatus: string): { status: Lead['status']; statusType: Lead['statusType'] } {
    const s = leadStatus.toLowerCase().trim();
    if (s === 'booked') return { status: 'qualified', statusType: 'success' };
    if (s === 'hot lead') return { status: 'new', statusType: 'warning' };
    if (s === 'cold lead') return { status: 'closed', statusType: 'neutral' };
    if (s === 'warm lead') return { status: 'contacted', statusType: 'warning' };
    return { status: 'new', statusType: 'neutral' };
}

function mapUrgency(urgency: string): Lead['urgency'] {
    const u = urgency.toLowerCase().trim();
    if (u === 'high') return 'high';
    if (u === 'medium') return 'medium';
    return 'low';
}

export async function fetchLeads(sheetId?: string): Promise<Lead[]> {
    const rawCalls = await fetchCallLogRaw(sheetId);

    return rawCalls.map((raw, index) => {
        const { status, statusType } = mapLeadStatus(raw['Lead Status']);

        return {
            id: String(index + 1),
            name: raw['Customer Name'] || 'Unknown',
            email: raw['Customer Email'] || '',
            phone: raw['Phone'] || '',
            service: raw['Lead Reason'] || 'General Inquiry',
            urgency: mapUrgency(raw['Urgency']),
            status,
            statusType,
            sentiment: raw['Sentiment'] || 'Neutral',
            followUp: raw['Follow Up needed?']?.toUpperCase() === 'TRUE',
            assignedTo: 'AI Agent',
            createdDate: raw['created at'] || '',
            summary: raw['Call Summary']
                ? raw['Call Summary'].substring(0, 200) + (raw['Call Summary'].length > 200 ? '…' : '')
                : undefined,
        };
    });
}

// --- Overview Stats ---

export interface DashboardStats {
    totalCalls: number;
    activeLeads: number;
    totalAppointments: number;
    conversionRate: number;
}

export async function fetchDashboardStats(sheetId?: string, from?: Date | null, to?: Date | null): Promise<DashboardStats> {
    const [callsRaw, appointmentsRaw] = await Promise.all([
        fetchCallLogRaw(sheetId),
        fetchAppointmentsRaw(sheetId),
    ]);

    const calls = callsRaw.filter(c => isDateInRange(c['created at'], from || null, to || null));
    const appointments = appointmentsRaw.filter(a => isDateInRange(a['Appointment Timing'], from || null, to || null));

    const totalCalls = calls.length;
    const activeLeads = calls.filter(c =>
        c['Lead Status']?.toLowerCase() === 'hot lead' || c['Lead Status']?.toLowerCase() === 'warm lead'
    ).length;
    const totalAppointments = appointments.length;
    const bookedCalls = calls.filter(c => c['Booked']?.toUpperCase() === 'TRUE').length;
    const conversionRate = totalCalls > 0 ? Math.round((bookedCalls / totalCalls) * 1000) / 10 : 0;

    return {
        totalCalls,
        activeLeads,
        totalAppointments,
        conversionRate,
    };
}

// --- Weekly Activity ---

export interface WeeklyActivityDay {
    date: string; // e.g. "Mon", "Tue"
    calls: number;
}

export async function fetchWeeklyActivity(sheetId?: string, from?: Date | null, to?: Date | null): Promise<WeeklyActivityDay[]> {
    const rawCalls = await fetchCallLogRaw(sheetId);

    // If a range is provided, show up to 14 days within that range. 
    // Otherwise, default to the last 7 days.
    const endDate = to || new Date();
    const daysToShow = from && to 
        ? Math.min(Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1, 14)
        : 7;
    
    const startDate = from || new Date(endDate);
    if (!from) startDate.setDate(endDate.getDate() - (daysToShow - 1));

    const days: WeeklyActivityDay[] = [];

    for (let i = 0; i < daysToShow; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const label = d.toLocaleDateString('en-US', { weekday: 'short' }); 
        const dateStr = d.toISOString().split('T')[0]; 

        const count = rawCalls.filter(c => {
            const raw = c['created at'] || '';
            if (!raw) return false;
            try {
                const callDate = new Date(raw).toISOString().split('T')[0];
                return callDate === dateStr;
            } catch {
                return false;
            }
        }).length;

        days.push({ date: label, calls: count });
    }

    return days;
}

// --- Funnel Data ---

export interface FunnelData {
    calls: number;
    qualified: number;
    booked: number;
    escalated: number;
}

export async function fetchFunnelData(sheetId?: string, from?: Date | null, to?: Date | null): Promise<FunnelData> {
    const rawCallsAll = await fetchCallLogRaw(sheetId);
    const rawCalls = rawCallsAll.filter(c => isDateInRange(c['created at'], from || null, to || null));

    const calls = rawCalls.length;
    const qualified = rawCalls.filter(c => {
        const s = c['Lead Status']?.toLowerCase().trim();
        return s === 'hot lead' || s === 'warm lead' || s === 'booked';
    }).length;
    const booked = rawCalls.filter(c => c['Booked']?.toUpperCase() === 'TRUE').length;
    // Escalated = follow-up needed
    const escalated = rawCalls.filter(c => c['Follow Up needed?']?.toUpperCase() === 'TRUE').length;

    return { calls, qualified, booked, escalated };
}

// --- Customer List ---

export interface Customer {
    id: string;
    name: string;
    type: string;
    phone: string;
    email: string;
    address: string;
    status: 'active' | 'inactive' | 'pending';
    statusType: 'success' | 'neutral' | 'warning' | 'error';
}

function mapCustomerStatus(status: string): { status: Customer['status']; statusType: Customer['statusType'] } {
    const s = status.toLowerCase().trim();
    if (s === 'active') return { status: 'active', statusType: 'success' };
    if (s === 'inactive' || s === 'closed') return { status: 'inactive', statusType: 'neutral' };
    if (s === 'pending') return { status: 'pending', statusType: 'warning' };
    return { status: 'active', statusType: 'success' };
}

export async function fetchCustomersList(sheetId?: string): Promise<Customer[]> {
    const rawCustomers = await fetchCustomers(sheetId);

    return rawCustomers.map((raw, index) => {
        const { status, statusType } = mapCustomerStatus(raw['Customer Status']);

        return {
            id: String(index + 1),
            name: raw['Customer Name'] || 'Unknown',
            type: raw['Customer Type'] || '—',
            phone: raw['Customer Phone Number'] || '—',
            email: raw['Customer Email Address'] || '—',
            address: raw['Customer Address'] || '—',
            status,
            statusType,
        };
    });
}

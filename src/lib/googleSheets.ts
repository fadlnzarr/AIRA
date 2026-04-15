/**
 * Google Sheets Data Service
 * Fetches CSV data from published Google Sheets and parses into typed objects.
 */

const SHEET_ID = '1MwZ4Xqp3M__lIjQRxsfSCPXzAPjRoyqa22DxWSkiynA';

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

async function fetchSheetCSV(gid: string): Promise<string> {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch sheet (gid=${gid}): ${response.status}`);
    }
    return response.text();
}

// --- Public Fetchers ---

export async function fetchCustomers(): Promise<RawCustomer[]> {
    const csv = await fetchSheetCSV(GIDS.customers);
    return parseCSV(csv) as unknown as RawCustomer[];
}

export async function fetchEmployees(): Promise<RawEmployee[]> {
    const csv = await fetchSheetCSV(GIDS.employees);
    return parseCSV(csv) as unknown as RawEmployee[];
}

export async function fetchAppointmentsRaw(): Promise<RawAppointment[]> {
    const csv = await fetchSheetCSV(GIDS.appointments);
    return parseCSV(csv) as unknown as RawAppointment[];
}

export async function fetchCallLogRaw(): Promise<RawCallLog[]> {
    const csv = await fetchSheetCSV(GIDS.callLog);
    return parseCSV(csv) as unknown as RawCallLog[];
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

export async function fetchAppointments(): Promise<Appointment[]> {
    const [rawAppointments, rawCustomers] = await Promise.all([
        fetchAppointmentsRaw(),
        fetchCustomers(),
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

export async function fetchCalls(): Promise<Call[]> {
    const rawCalls = await fetchCallLogRaw();

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

export async function fetchLeads(): Promise<Lead[]> {
    const rawCalls = await fetchCallLogRaw();

    return rawCalls.map((raw, index) => {
        const { status, statusType } = mapLeadStatus(raw['Lead Status']);

        return {
            id: String(index + 1),
            name: raw['Customer Name'] || 'Unknown',
            email: raw['Customer Email'] || '',
            phone: raw['Phone'] || '',
            service: raw['Urgency'] ? `${raw['Urgency']} Priority` : 'General',
            urgency: mapUrgency(raw['Urgency']),
            status,
            statusType,
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

export async function fetchDashboardStats(): Promise<DashboardStats> {
    const [calls, appointments] = await Promise.all([
        fetchCallLogRaw(),
        fetchAppointmentsRaw(),
    ]);

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

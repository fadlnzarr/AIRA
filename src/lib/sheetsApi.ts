
/**
 * Sends form data to the Google Sheet via the deployed Apps Script Web App.
 * Sheet: https://docs.google.com/spreadsheets/d/1XrjPfnACSv5Fu4-CazT7LzuJCkVLiXO7owbYU-p9CmQ
 *
 * The Apps Script is already deployed. This file is ready to use.
 */

const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzRrtsHJyQtXKrc58Z8QHeG3atOcymAdaai5MV4FGJfWt-5yq8UOvvJkEJUtmwQpRx6dQ/exec';

export const sheetsApi = {
    /**
     * Posts a contact/booking form submission to the "Bookings" sheet tab.
     */
    submitBooking: async (data: {
        fullName: string;
        email: string;
        phone?: string;
        businessName?: string;
        industry?: string;
        missionBrief?: string;
        appointmentDate: string;
        appointmentTime: string;
    }) => {
        // no-cors: response is opaque, we can't read it, but the data still arrives in the sheet
        await fetch(SHEETS_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ type: 'booking', data }),
        });
        return true;
    },

    /**
     * Posts a client intake form submission to the "Intake" sheet tab.
     */
    submitIntake: async (data: Record<string, any>) => {
        await fetch(SHEETS_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ type: 'intake', data }),
        });
        return true;
    },
};

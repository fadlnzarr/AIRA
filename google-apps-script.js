/**
 * AIRA — Google Apps Script Web App
 * 
 * HOW TO DEPLOY:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1XrjPfnACSv5Fu4-CazT7LzuJCkVLiXO7owbYU-p9CmQ
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code, paste ALL of this file
 * 4. Click Save (Ctrl+S)
 * 5. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → copy the Web App URL
 * 7. The URL is already set in src/lib/sheetsApi.ts — no further changes needed.
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var raw = JSON.parse(e.postData.contents);
    var type = raw.type;

    // ── BOOKING (from Contact page) ──────────────────────────────────────────
    if (type === 'booking') {
      var d = raw.data;
      var tab = ss.getSheetByName('Bookings') || ss.insertSheet('Bookings');

      if (tab.getLastRow() === 0) {
        tab.appendRow([
          'Timestamp', 'Full Name', 'Email', 'Phone',
          'Business Name', 'Industry', 'Mission Brief',
          'Appointment Date', 'Appointment Time'
        ]);
        tab.getRange(1, 1, 1, 9).setFontWeight('bold');
      }

      tab.appendRow([
        new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        d.fullName       || '',
        d.email          || '',
        d.phone          || '',
        d.businessName   || '',
        d.industry       || '',
        d.missionBrief   || '',
        d.appointmentDate || '',
        d.appointmentTime || ''
      ]);
    }

    // ── INTAKE (from Client Intake page) ─────────────────────────────────────
    else if (type === 'intake') {
      var d = raw.data;
      var tab = ss.getSheetByName('Intake') || ss.insertSheet('Intake');

      if (tab.getLastRow() === 0) {
        tab.appendRow([
          'Timestamp', 'Full Name', 'Company', 'Phone', 'Email',
          'City / Area', 'Website', 'Technicians', 'Services Offered',
          'Inbound Calls/Week', 'Missed Call Handling', 'After Hours',
          'Booking Methods', 'Lost Leads', 'Current Software', 'Has CRM',
          'Paid Ads', 'Urgent Problems', 'Success Goal',
          'Monthly Revenue', 'Budget', 'Timeline', 'Decision Maker',
          'How Found', 'Anything Else'
        ]);
        tab.getRange(1, 1, 1, 25).setFontWeight('bold');
      }

      tab.appendRow([
        new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        d.fullName            || '',
        d.companyName         || '',
        d.phone               || '',
        d.email               || '',
        d.cityServiceArea     || '',
        d.website             || '',
        d.technicianCount     || '',
        (d.servicesOffered    || []).join(', '),
        d.inboundCallsPerWeek || '',
        d.missedCallHandling  || '',
        d.afterHoursService   || '',
        (d.bookingMethods     || []).join(', '),
        d.lostLeadsEstimate   || '',
        d.currentSoftware     || '',
        d.hasCRM              || '',
        (d.paidAds            || []).join(', '),
        (d.urgentProblems     || []).join(', '),
        d.successDefinition   || '',
        d.monthlyRevenue      || '',
        d.budget              || '',
        d.timeline            || '',
        d.decisionMaker       || '',
        d.howFound            || '',
        d.anythingElse        || ''
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

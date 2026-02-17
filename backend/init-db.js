
const { Client } = require('pg');
require('dotenv').config();

console.log('Script started...');

// Parse the connection string to handle parameters manually if needed
// But usually pg handles it fine. We'll add strict SSL just in case.
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Common fix for Supabase/AWS verify
    connectionTimeoutMillis: 10000,     // Fail fast after 10s
});

async function init() {
    try {
        console.log('Connecting to database...', process.env.DATABASE_URL.replace(/:[^:]+@/, ':****@')); // Log URL safely
        await client.connect();
        console.log('Connected successfully!');

        // Test a simple query first
        const timeRes = await client.query('SELECT NOW()');
        console.log('Database time:', timeRes.rows[0]);

        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS "Booking" (
        "id" TEXT NOT NULL,
        "appointmentDate" TIMESTAMP(3) NOT NULL,
        "appointmentTime" TEXT NOT NULL,
        "appointmentDateStr" TEXT,
        "appointmentTimeStr" TEXT,
        "plan" TEXT NOT NULL DEFAULT 'Undecided / Custom',
        "fullName" TEXT NOT NULL,
        "businessName" TEXT,
        "email" TEXT NOT NULL,
        "phone" TEXT,
        "industry" TEXT,
        "missionBrief" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,

        CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
      );
    `;

        console.log('Creating "Booking" table...');
        await client.query(createTableQuery);
        console.log('Table "Booking" created (or already exists)!');

        await client.end();
        console.log('Connection closed.');
    } catch (err) {
        console.error('CRITICAL ERROR in init-db.js:', err);
        // process.exit(1); 
    }
}

init();

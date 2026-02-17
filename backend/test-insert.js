
const { Client } = require('pg');
require('dotenv').config();

console.log('Script started...');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
});

async function testInsert() {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected!');

        const insertQuery = `
      INSERT INTO "Booking" (
        "id", "appointmentDate", "appointmentTime", "fullName", "email", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6
      ) RETURNING id;
    `;

        const values = [
            'test-' + Date.now(),
            new Date(),
            '10:00 AM',
            'Test User',
            'test@example.com',
            new Date()
        ];

        console.log('Inserting test record...');
        const res = await client.query(insertQuery, values);
        console.log('Inserted record with ID:', res.rows[0].id);

        await client.end();
        console.log('Connection closed.');
    } catch (err) {
        console.error('INSERT ERROR:', err);
        process.exit(1);
    }
}

testInsert();

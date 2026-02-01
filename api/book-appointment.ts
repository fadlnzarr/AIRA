import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Initialize Prisma with connection pooling for serverless
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

// Validation schema
const bookingSchema = z.object({
    appointmentDate: z.string(),
    appointmentTime: z.string(),
    plan: z.string().optional(),
    fullName: z.string().min(1, "Name is required"),
    businessName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    industry: z.string().optional(),
    missionBrief: z.string().optional(),
});

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).setHeader('Access-Control-Allow-Origin', '*')
            .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
            .setHeader('Access-Control-Allow-Headers', 'Content-Type')
            .end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const data = bookingSchema.parse(req.body);

        const booking = await prisma.booking.create({
            data: {
                appointmentDate: new Date(data.appointmentDate),
                appointmentTime: data.appointmentTime,
                plan: data.plan || "Undecided / Custom",
                fullName: data.fullName,
                businessName: data.businessName,
                email: data.email,
                phone: data.phone,
                industry: data.industry,
                missionBrief: data.missionBrief,
            },
        });

        console.log(`[BOOKING] New booking from ${booking.email}`);

        return res.status(201).json({ success: true, id: booking.id });
    } catch (error: any) {
        console.error('Booking Error:', error);

        if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, errors: error.issues });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    } finally {
        await prisma.$disconnect();
    }
}

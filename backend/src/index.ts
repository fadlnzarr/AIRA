import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
// @ts-ignore: PrismaClient might not be generated in the CI environment
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
// @ts-ignore: Handle missing Prisma Client generation
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// --- Security Middleware ---
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // Limit each IP to 20 requests per window (v7 uses 'limit', legacy 'max')
  max: 20, // Legacy support
  message: 'Too many requests from this IP, please try again later.',
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});
app.use('/api', limiter);

// --- Validation Schemas ---
const bookingSchema = z.object({
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  appointmentTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  plan: z.string().optional(),
  fullName: z.string().min(1, "Name is required"),
  businessName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  missionBrief: z.string().optional(),
});

// --- Routes ---

app.get('/', (req: Request, res: Response) => {
  res.send('AIRA Backend API is running.');
});

// POST: Create Booking
app.post('/api/book-appointment', async (req: Request, res: Response) => {
  try {
    const data = bookingSchema.parse(req.body);

    const booking = await prisma.booking.create({
      data: {
        appointmentDate: data.appointmentDate,
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
    res.status(201).json({ success: true, id: booking.id });
  } catch (error: any) {
    console.error('Booking Error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: error.errors });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
});

// GET: Admin View (Protected)
app.get('/api/bookings', async (req: Request, res: Response) => {
  const apiKey = req.headers['x-admin-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json({ success: true, data: bookings });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
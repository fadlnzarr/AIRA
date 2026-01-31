import {
  Phone,
  Calendar,
  Database,
  Zap,
  BarChart,
  Clock,
  ShieldCheck,
  Briefcase,
  Stethoscope,
  Truck,
  Home
} from 'lucide-react';
import { NavItem, PricingTier, ServiceItem, UseCase } from './types';

// TODO: Replace with actual Calendly URL provided by user
export const CALENDLY_URL = "https://calendly.com/";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Demo', path: '/demo' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    title: "AI Voice Receptionist",
    description: "Answering every call instantly with a human-like voice, 24/7/365.",
    icon: Phone,
    features: [
      "Never miss a call. Ever.",
      "Answers instantly, day or night.",
      "Sounds human. Works nonstop."
    ]
  },
  {
    title: "Appointment Booking",
    description: "Seamlessly integrates with your calendar to book slots in real-time.",
    icon: Calendar,
    features: [
      "Books meetings in real time.",
      "Eliminates back-and-forth entirely.",
      "Turns intent into confirmed slots."
    ]
  },
  {
    title: "Lead Qualification",
    description: "Asks the right questions to qualify leads before they reach your sales team.",
    icon: BarChart,
    features: [
      "Filters serious buyers automatically.",
      "Asks the right questions, every time.",
      "Only qualified leads reach your team."
    ]
  },
  {
    title: "Workflow Automation",
    description: "Triggers actions in your CRM, Slack, or email immediately after a call.",
    icon: Zap,
    features: [
      "Actions triggered the moment the call ends.",
      "From conversation to execution.",
      "No manual follow-ups required."
    ]
  },
  {
    title: "CRM Sync",
    description: "Updates your customer database automatically with structured call data.",
    icon: Database,
    features: [
      "Every call logged automatically.",
      "Clean, structured customer data.",
      "Your CRM updates itself."
    ]
  },
  {
    title: "After-Hours Handling",
    description: "Capture business even when your office is closed. Never miss an opportunity.",
    icon: Clock,
    features: [
      "Revenue doesn’t stop at 5 PM.",
      "Every after-hours call captured.",
      "Opportunities secured while you sleep."
    ]
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$499",
    description: "Perfect for local businesses starting their automation journey.",
    features: [
      "AI Voice Receptionist",
      "Call Forwarding",
      "Basic Message Taking",
      "Email Notifications",
      "Up to 500 mins/month"
    ]
  },
  {
    name: "Professional",
    price: "$999",
    description: "Advanced integrations and higher volume for growing teams.",
    features: [
      "Everything in Starter",
      "Calendar Booking Integration",
      "CRM Integration (HubSpot/Salesforce)",
      "Custom Workflows (Zapier/n8n)",
      "Up to 1,500 mins/month",
      "Priority Support"
    ],
    recommended: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations with complex needs.",
    features: [
      "Everything in Professional",
      "Unlimited Minutes",
      "Custom LLM Fine-tuning",
      "Dedicated Success Manager",
      "SLA Guarantees",
      "API Access"
    ]
  }
];

export const USE_CASES: UseCase[] = [
  {
    title: "Medical Clinics",
    description: "Book appointments, answer FAQs, and handle prescription refill requests securely.",
    icon: Stethoscope,
    image: "https://picsum.photos/id/1/800/600"
  },
  {
    title: "Real Estate",
    description: "Qualify buyers, schedule viewings, and capture property inquiries instantly.",
    icon: Home,
    image: "https://picsum.photos/id/10/800/600"
  },
  {
    title: "Logistics & Fleet",
    description: "Coordinate drivers, handle dispatch updates, and manage delivery inquiries.",
    icon: Truck,
    image: "https://picsum.photos/id/20/800/600"
  },
  {
    title: "Professional Services",
    description: "Lawyers, accountants, and consultants can filter calls and book consultations.",
    icon: Briefcase,
    image: "https://picsum.photos/id/30/800/600"
  }
];
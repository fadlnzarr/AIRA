import React, { useState } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { Send, Loader2, CheckCircle, UploadCloud } from 'lucide-react';

// Reusable UI components - Moved OUTSIDE the main component to prevent loss of focus (React re-mount issues)
const InputField = ({ label, name, type = 'text', required = false, placeholder = '', value, onChange }: { label: string, name: string, type?: string, required?: boolean, placeholder?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider ml-1 text-zinc-700 block">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            className="w-full bg-white/60 border border-black/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/20 transition-all font-sans text-black placeholder-zinc-500 shadow-sm"
            placeholder={placeholder}
        />
    </div>
);

const TextareaField = ({ label, name, required = false, placeholder = '', hint = '', value, onChange }: { label: string, name: string, required?: boolean, placeholder?: string, hint?: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => (
    <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider ml-1 text-zinc-700 block">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {hint && <p className="text-xs text-zinc-500 mb-2 ml-1">{hint}</p>}
        <textarea
            name={name}
            required={required}
            rows={4}
            value={value}
            onChange={onChange}
            className="w-full bg-white/60 border border-black/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/20 transition-all font-sans resize-none text-black placeholder-zinc-500 shadow-sm"
            placeholder={placeholder}
        />
    </div>
);

const RadioGroup = ({ label, name, options, required = false, hint = '', currentValue, onChange }: { label: string, name: string, options: string[], required?: boolean, hint?: string, currentValue: string, onChange: (name: string, value: string) => void }) => (
    <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider ml-1 block text-zinc-800">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {hint && <p className="text-xs text-zinc-500 mb-2 ml-1">{hint}</p>}
        <div className="grid gap-3">
            {options.map((option) => (
                <label key={option} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-white/80 transition-colors shadow-sm ${currentValue === option ? 'border-zinc-800 bg-white/90' : 'border-black/10 bg-white/40'}`}>
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={currentValue === option}
                        onChange={() => onChange(name, option)}
                        className="text-zinc-900 bg-white/80 border-black/20 focus:ring-zinc-900 focus:ring-offset-0"
                        required={required && !currentValue}
                    />
                    <span className="text-sm font-sans text-zinc-900">{option}</span>
                </label>
            ))}
        </div>
    </div>
);

const CheckboxGroup = ({ label, name, options, max, required = false, currentArray, onChange }: { label: string, name: string, options: string[], max?: number, required?: boolean, currentArray: string[], onChange: (name: string, value: string, max?: number) => void }) => (
    <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider ml-1 block text-zinc-800">
            {label} {max && <span className="text-zinc-500 ml-2 lowercase normal-case text-[10px]">(Max {max})</span>} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
            {options.map((option) => (
                <label key={option} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer hover:bg-white/80 transition-colors shadow-sm ${currentArray.includes(option) ? 'border-zinc-800 bg-white/90' : 'border-black/10 bg-white/40'}`}>
                    <input
                        type="checkbox"
                        value={option}
                        checked={currentArray.includes(option)}
                        onChange={() => onChange(name, option, max)}
                        className="mt-1 rounded bg-white/80 border-black/20 text-zinc-900 focus:ring-zinc-900 focus:ring-offset-0"
                    />
                    <span className="text-sm font-sans text-zinc-900 leading-tight">{option}</span>
                </label>
            ))}
        </div>
    </div>
);

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-8 mt-16 first:mt-0 border-b pb-4 border-black/10">
        <h2 className="text-2xl font-serif italic text-black tracking-widest">{title}</h2>
        {subtitle && <p className="text-sm mt-1 text-zinc-600">{subtitle}</p>}
    </div>
);

export const ClientIntake: React.FC = () => {
    const [formState, setFormState] = useState({
        // Section 1
        fullName: '',
        companyName: '',
        phone: '',
        email: '',
        cityServiceArea: '',
        website: '',
        technicianCount: '',
        servicesOffered: [] as string[],

        // Section 2
        inboundCallsPerWeek: '',
        missedCallHandling: '',
        afterHoursService: '',
        bookingMethods: [] as string[],
        lostLeadsEstimate: '',

        // Section 3
        currentSoftware: '',
        hasCRM: '',
        paidAds: [] as string[],

        // Section 4
        urgentProblems: [] as string[],
        successDefinition: '',

        // Section 5
        monthlyRevenue: '',
        budget: '',
        timeline: '',
        decisionMaker: '',

        // Section 6
        howFound: '',
        anythingElse: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleCheckboxChange = (name: string, value: string, max?: number) => {
        setFormState(prev => {
            const currentArray = prev[name as keyof typeof formState] as string[];
            if (currentArray.includes(value)) {
                return { ...prev, [name]: currentArray.filter(item => item !== value) };
            } else {
                if (max && currentArray.length >= max) {
                    return prev; // Prevent adding more if max reached
                }
                return { ...prev, [name]: [...currentArray, value] };
            }
        });
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const webhookUrl = 'https://ntest.app.n8n.cloud/webhook/1369ea4b-1c17-4b5d-b681-a6e451f54a5b';
            
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventName: 'Client_Intake_Submission',
                    timestamp: new Date().toISOString(),
                    data: formState
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form to webhook.');
            }
            
            setIsSuccess(true);
        } catch (error: any) {
            console.error("Submission failed:", error);
            setErrorMessage(error.message || "Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] via-[#dcdcdc] to-[#a6a6a6]">
                <div className="p-12 text-center max-w-md mx-auto backdrop-blur-xl border border-black/10 rounded-3xl bg-white/40 shadow-xl relative z-10">
                    <CheckCircle className="w-16 h-16 mx-auto mb-6 text-black" />
                    <h2 className="text-3xl font-serif italic mb-4 text-black">Intake Submitted.</h2>
                    <p className="text-zinc-700 font-sans mb-8">Thank you for sharing the details of your operations. Our team will review this and follow up shortly.</p>
                    <Button variant="secondary" onClick={() => window.location.reload()} className="w-full text-black border-black hover:bg-black/5">
                        Submit Another
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#f5f5f5] via-[#dcdcdc] to-[#a6a6a6] relative">
            <div className="pt-32 pb-20">
                <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16 relative z-10">
                        <AnimatedSection>
                            <h1
                                className="text-4xl md:text-6xl font-serif italic font-light leading-none mb-6 text-black"
                            >
                                Client <span className="font-sans font-bold not-italic">Intake.</span>
                            </h1>
                            <p
                                className="text-lg leading-relaxed max-w-2xl mx-auto text-zinc-700"
                            >
                                Please provide us with details about your operations so we can architect the perfect AI voice solution for you.
                            </p>
                        </AnimatedSection>
                    </div>

                    {/* Intake Form */}
                    <AnimatedSection delay={0.2}>
                        <div
                            className="p-6 md:p-10 rounded-3xl backdrop-blur-2xl border border-white/40 shadow-2xl relative overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.45)', // higher opacity glassmorphism
                            }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                
                                {/* SECTION 1 */}
                                <div>
                                    <SectionHeader title="SECTION 1 — Your Business" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <InputField label="Full name" name="fullName" required value={formState.fullName} onChange={handleChange} />
                                        <InputField label="Company name" name="companyName" required value={formState.companyName} onChange={handleChange} />
                                        <InputField label="Phone number" name="phone" type="tel" required value={formState.phone} onChange={handleChange} />
                                        <InputField label="Email address" name="email" type="email" required value={formState.email} onChange={handleChange} />
                                        <InputField label="City / service area" name="cityServiceArea" required placeholder="e.g. Toronto, ON" value={formState.cityServiceArea} onChange={handleChange} />
                                        <InputField label="Website" name="website" type="url" placeholder="https://" value={formState.website} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-8">
                                        <RadioGroup 
                                            label="How many technicians do you have?" 
                                            name="technicianCount" 
                                            required 
                                            options={["Just me (owner-operator)", "2–5 techs", "6–15 techs", "16–30 techs", "30+ techs"]} 
                                            currentValue={formState.technicianCount}
                                            onChange={handleRadioChange}
                                        />
                                        <CheckboxGroup 
                                            label="What services do you offer?" 
                                            name="servicesOffered" 
                                            options={[
                                                "Residential HVAC installation & replacement",
                                                "Residential repairs & service calls",
                                                "Preventive maintenance plans / memberships",
                                                "Commercial HVAC",
                                                "Emergency / 24-hour service",
                                                "Indoor air quality (IAQ)",
                                                "Plumbing or electrical (multi-trade)"
                                            ]} 
                                            currentArray={formState.servicesOffered}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                </div>

                                {/* SECTION 2 */}
                                <div>
                                    <SectionHeader title="SECTION 2 — How Calls & Leads Work Today" />
                                    <div className="space-y-8">
                                        <RadioGroup 
                                            label="How many inbound calls do you receive per week?" 
                                            name="inboundCallsPerWeek" 
                                            required 
                                            options={["Under 20", "20–50", "50–100", "100–200", "200+"]} 
                                            currentValue={formState.inboundCallsPerWeek}
                                            onChange={handleRadioChange}
                                        />
                                        <RadioGroup 
                                            label="What happens when you miss a call?" 
                                            name="missedCallHandling" 
                                            required 
                                            options={[
                                                "It goes to voicemail — we call back when we can",
                                                "We have an answering service",
                                                "We have a receptionist / CSR who handles it",
                                                "Honestly — most missed calls don't get followed up on"
                                            ]} 
                                            currentValue={formState.missedCallHandling}
                                            onChange={handleRadioChange}
                                        />
                                        <RadioGroup 
                                            label="Do you offer after-hours or emergency service?" 
                                            name="afterHoursService" 
                                            required 
                                            options={[
                                                "Yes, 24/7",
                                                "Yes, but only for existing customers",
                                                "No, but we want to",
                                                "No"
                                            ]} 
                                            currentValue={formState.afterHoursService}
                                            onChange={handleRadioChange}
                                        />
                                        <CheckboxGroup 
                                            label="How do customers currently book appointments?" 
                                            name="bookingMethods" 
                                            options={[
                                                "Phone call with us directly",
                                                "Website form or online booking",
                                                "Text message",
                                                "Email",
                                                "Word of mouth / referral calls directly"
                                            ]} 
                                            currentArray={formState.bookingMethods}
                                            onChange={handleCheckboxChange}
                                        />
                                        <RadioGroup 
                                            label="How many leads per month do you think you're losing due to missed calls or slow follow-up?" 
                                            name="lostLeadsEstimate" 
                                            required 
                                            options={[
                                                "0–5 (not a big problem for us)",
                                                "5–15 leads/month",
                                                "15–30 leads/month",
                                                "30+ leads/month",
                                                "I honestly have no idea"
                                            ]} 
                                            currentValue={formState.lostLeadsEstimate}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                </div>

                                {/* SECTION 3 */}
                                <div>
                                    <SectionHeader title="SECTION 3 — Current Tools & Software" />
                                    <div className="space-y-8">
                                        <TextareaField 
                                            label="What software do you currently use to run your business?" 
                                            name="currentSoftware" 
                                            hint="e.g. ServiceTitan, Housecall Pro, Jobber, QuickBooks, Google Calendar, spreadsheets"
                                            required 
                                            value={formState.currentSoftware}
                                            onChange={handleChange}
                                        />
                                        <RadioGroup 
                                            label="Do you have a CRM?" 
                                            name="hasCRM" 
                                            required 
                                            options={[
                                                "Yes — and we actively use it",
                                                "Yes — but it's messy / barely used",
                                                "No — we manage customers in spreadsheets",
                                                "No — everything is in our head or phone contacts"
                                            ]} 
                                            currentValue={formState.hasCRM}
                                            onChange={handleRadioChange}
                                        />
                                        <CheckboxGroup 
                                            label="Do you run any paid advertising?" 
                                            name="paidAds" 
                                            options={[
                                                "Google Local Service Ads (LSA)",
                                                "Google Search Ads (PPC)",
                                                "Facebook / Instagram ads",
                                                "Yelp or Angi / HomeAdvisor",
                                                "No paid ads — mostly referrals and organic"
                                            ]} 
                                            currentArray={formState.paidAds}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                </div>

                                {/* SECTION 4 */}
                                <div>
                                    <SectionHeader title="SECTION 4 — What You Want AIRA to Solve" />
                                    <div className="space-y-8">
                                        <CheckboxGroup 
                                            label="Which of these problems feel most urgent right now?" 
                                            name="urgentProblems" 
                                            max={3}
                                            options={[
                                                "Missing too many inbound calls",
                                                "Slow lead follow-up (leads go cold)",
                                                "No system for after-hours / emergency calls",
                                                "Booking appointments takes too much staff time",
                                                "Customers don't get reminders — no-shows are a problem",
                                                "No automated review / feedback requests after a job",
                                                "Dispatch and job updates are manual and slow",
                                                "Maintenance plan renewals slip through the cracks",
                                                "My CSR / receptionist is overwhelmed"
                                            ]} 
                                            currentArray={formState.urgentProblems}
                                            onChange={handleCheckboxChange}
                                        />
                                        <TextareaField 
                                            label="What does success look like 90 days after working with AIRA?" 
                                            name="successDefinition" 
                                            placeholder="We never miss a lead, customers can book 24/7, my team isn't buried in admin work..."
                                            required 
                                            value={formState.successDefinition}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* SECTION 5 */}
                                <div>
                                    <SectionHeader title="SECTION 5 — Investment & Timing" />
                                    <div className="space-y-8">
                                        <RadioGroup 
                                            label="What's your approximate monthly revenue?" 
                                            name="monthlyRevenue" 
                                            hint="Kept confidential"
                                            required 
                                            options={[
                                                "Under $20K/month",
                                                "$20K–$50K/month",
                                                "$50K–$100K/month",
                                                "$100K–$250K/month",
                                                "$250K+/month",
                                                "Prefer not to say"
                                            ]} 
                                            currentValue={formState.monthlyRevenue}
                                            onChange={handleRadioChange}
                                        />
                                        <RadioGroup 
                                            label="What's your budget for an AI voice & automation system?" 
                                            name="budget" 
                                            required 
                                            options={[
                                                "Under $500/month",
                                                "$500–$1,000/month",
                                                "$1,000–$2,500/month",
                                                "$2,500–$5,000/month",
                                                "Open to a recommendation based on ROI"
                                            ]} 
                                            currentValue={formState.budget}
                                            onChange={handleRadioChange}
                                        />
                                        <RadioGroup 
                                            label="How soon are you looking to get started?" 
                                            name="timeline" 
                                            required 
                                            options={[
                                                "Immediately — this is urgent",
                                                "Within the next 30 days",
                                                "1–3 months",
                                                "Just exploring for now"
                                            ]} 
                                            currentValue={formState.timeline}
                                            onChange={handleRadioChange}
                                        />
                                        <RadioGroup 
                                            label="Are you the owner / decision maker?" 
                                            name="decisionMaker" 
                                            required 
                                            options={[
                                                "Yes, I own the business and make this call",
                                                "I'm a manager — I'll need owner approval",
                                                "Shared decision with a business partner"
                                            ]} 
                                            currentValue={formState.decisionMaker}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                </div>

                                {/* SECTION 6 */}
                                <div>
                                    <SectionHeader title="SECTION 6 — One Last Thing" />
                                    <div className="space-y-8">
                                        <RadioGroup 
                                            label="How did you find out about AIRA?" 
                                            name="howFound" 
                                            required 
                                            options={[
                                                "Google search",
                                                "LinkedIn",
                                                "Instagram / Facebook",
                                                "YouTube",
                                                "Referral from someone I know",
                                                "HVAC group or online community",
                                                "Cold outreach (email or DM)",
                                                "Other"
                                            ]} 
                                            currentValue={formState.howFound}
                                            onChange={handleRadioChange}
                                        />
                                        <TextareaField 
                                            label="Anything else we should know before the call?" 
                                            name="anythingElse" 
                                            placeholder="Specific concerns, past bad experiences with tech vendors, seasonal timing..."
                                            value={formState.anythingElse}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="pt-8 mt-8 border-t border-black/10">
                                    <Button
                                        variant="primary"
                                        className="w-full py-4 text-lg flex items-center justify-center gap-2 group bg-black text-white hover:bg-zinc-800 transition-colors shadow-lg"
                                        disabled={isSubmitting || isSuccess}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Submitting Details...
                                            </>
                                        ) : (
                                            <>
                                                Submit Intake Form
                                                <UploadCloud className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-center text-xs mt-4 text-zinc-500">* Please ensure all required fields are filled out before submitting.</p>
                                </div>
                            </form>

                            {errorMessage && (
                                <div className="mt-6 p-4 bg-red-100 border border-red-200 rounded-xl text-red-600 text-sm text-center relative z-10">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Decorative light glows */}
                            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/70 rounded-full blur-[100px] pointer-events-none"></div>
                            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/70 rounded-full blur-[100px] pointer-events-none"></div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

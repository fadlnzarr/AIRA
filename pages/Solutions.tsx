import React from 'react';
import { SERVICES } from '../constants';
import { AnimatedSection } from '../components/AnimatedSection';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Visualization Components ---

const VoiceViz = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    {/* Pulse Waves */}
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute border border-white/40 rounded-full"
        initial={{ width: "20%", height: "20%", opacity: 1 }}
        animate={{ width: "80%", height: "80%", opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
      />
    ))}
    {/* Core */}
    <motion.div
      className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative z-10"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-1 h-4 bg-black rounded-full mx-0.5 animate-pulse" />
      <div className="w-1 h-6 bg-black rounded-full mx-0.5 animate-pulse delay-75" />
      <div className="w-1 h-4 bg-black rounded-full mx-0.5 animate-pulse delay-150" />
    </motion.div>
  </div>
);

const CalendarViz = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="w-full max-w-[180px] border border-white/20 rounded-lg p-3 bg-white/5 backdrop-blur-sm">
      <div className="flex justify-between mb-3 border-b border-white/10 pb-2">
        <div className="w-16 h-1.5 bg-white/30 rounded" />
        <div className="w-6 h-1.5 bg-white/30 rounded" />
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square border border-white/10 rounded flex items-center justify-center relative overflow-hidden bg-white/5"
          >
            {i === 5 && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-3 w-full h-6 bg-white/20 rounded relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-white/40"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
        />
      </motion.div>
    </div>
  </div>
);

const LeadViz = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="w-full max-w-[200px] space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.div
            className="w-5 h-5 border border-white/40 rounded-full flex items-center justify-center bg-black"
            initial={{ borderColor: "rgba(255,255,255,0.4)", backgroundColor: "#000" }}
            animate={{ borderColor: "#fff", backgroundColor: "#fff" }}
            transition={{ duration: 0.5, delay: i * 0.8, repeat: Infinity, repeatDelay: 3 }}
          >
            <motion.svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" className="w-2.5 h-2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: i * 0.8 + 0.2, repeat: Infinity, repeatDelay: 3 }}
            >
              <path d="M20 6L9 17l-5-5" />
            </motion.svg>
          </motion.div>
          <div className="h-1.5 bg-white/10 rounded flex-grow overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, delay: i * 0.8, repeat: Infinity, repeatDelay: 3 }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <motion.div
          className="mt-1 inline-flex px-3 py-1 rounded bg-white text-black font-bold text-[10px] font-sans uppercase tracking-widest"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, repeat: Infinity, repeatDelay: 3 }}
        >
          Qualified
        </motion.div>
      </div>
    </div>
  </div>
);

const WorkflowViz = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <div className="flex gap-2 items-center">
      {/* Step 1 */}
      <div className="w-10 h-10 border border-white/30 rounded flex items-center justify-center bg-black z-10">
        <div className="w-4 h-4 rounded-full border-2 border-white" />
      </div>
      {/* Line 1 */}
      <div className="w-8 h-0.5 bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-4 h-full bg-white box-shadow-[0_0_10px_white]"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {/* Step 2 */}
      <div className="w-10 h-10 border border-white/30 rounded flex items-center justify-center bg-black z-10">
        <div className="w-4 h-4 rounded bg-white/80" />
      </div>
      {/* Line 2 */}
      <div className="w-8 h-0.5 bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-4 h-full bg-white box-shadow-[0_0_10px_white]"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
        />
      </div>
      {/* Step 3 */}
      <div className="w-10 h-10 border-2 border-white rounded flex items-center justify-center bg-white z-10">
        <CheckCircle2 className="w-6 h-6 text-black" />
      </div>
    </div>
  </div>
);

const CRMViz = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="flex gap-4 items-center w-full max-w-[220px] justify-center">
      {/* Phone/Input */}
      <div className="w-16 h-24 border border-white/30 rounded-lg flex flex-col items-center justify-center gap-2 p-2 bg-black">
        <div className="w-8 h-8 rounded-full border border-white/50 mb-1 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        <div className="w-full h-1 bg-white/30 rounded" />
        <div className="w-2/3 h-1 bg-white/30 rounded" />
      </div>

      {/* Transfer Particles */}
      <div className="w-12 h-full relative flex items-center justify-center">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"
            animate={{ x: [-20, 20], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
          />
        ))}
      </div>

      {/* Database Grid */}
      <div className="w-24 h-24 border border-white/30 rounded-lg p-2 grid grid-rows-4 gap-1.5 bg-black">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="flex gap-1.5">
            <div className="w-6 h-full bg-white/20 rounded" />
            <motion.div
              className="flex-1 h-full bg-white/20 rounded"
              animate={{ backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.2)"] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AfterHoursViz = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Clock Ring */}
      <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
      <div className="absolute inset-1.5 border border-white/10 rounded-full border-dashed" />

      {/* Rotating Hand */}
      <motion.div
        className="w-0.5 h-14 bg-gradient-to-t from-white to-transparent origin-bottom absolute bottom-1/2 left-1/2"
        style={{ translateX: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Center */}
      <div className="w-2 h-2 bg-white rounded-full relative z-10 shadow-[0_0_10px_white]" />

      {/* Moon Orbiting */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-3 left-1/2 w-6 h-6 bg-black border border-white rounded-full flex items-center justify-center -translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <div className="w-3 h-3 bg-white rounded-full -translate-x-0.5" style={{ borderRadius: '50%' }} />
          <div className="absolute w-3 h-3 bg-black rounded-full left-1" />
        </div>
      </motion.div>
    </div>
  </div>
);

const ConversationDataViz = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="flex gap-3 items-center w-full max-w-[220px] justify-center">
      {/* Speech Bubble */}
      <div className="w-16 h-16 border border-white/30 rounded-lg flex flex-col items-center justify-center p-2 bg-black relative">
        <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-white/30" />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-full h-1 bg-white/20 rounded mb-1"
            animate={{ backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.2)"] }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Arrow Flow */}
      <div className="flex flex-col items-center gap-1">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ x: [0, 8, 16], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
          />
        ))}
      </div>

      {/* Structured Data Card */}
      <div className="w-20 h-20 border border-white/30 rounded-lg p-2 bg-black">
        <div className="space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex gap-1.5">
              <div className="w-4 h-1.5 bg-white/40 rounded" />
              <motion.div
                className="flex-1 h-1.5 bg-white/20 rounded"
                animate={{ backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.2)"] }}
                transition={{ duration: 1.5, delay: i * 0.4 + 0.5, repeat: Infinity }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TrustSafetyViz = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="relative w-28 h-32 flex items-center justify-center">
      {/* Shield Shape */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg viewBox="0 0 64 80" fill="none" className="w-24 h-28">
          <motion.path
            d="M32 4L8 16v20c0 16 10 28 24 36 14-8 24-20 24-36V16L32 4z"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            fill="rgba(255,255,255,0.05)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </svg>
      </motion.div>

      {/* Center Check */}
      <motion.div
        className="relative z-10 w-10 h-10 border-2 border-white/50 rounded-full flex items-center justify-center bg-black"
        animate={{ borderColor: ["rgba(255,255,255,0.5)", "rgba(255,255,255,1)", "rgba(255,255,255,0.5)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <path d="M20 6L9 17l-5-5" />
        </motion.svg>
      </motion.div>

      {/* Scanning Line */}
      <motion.div
        className="absolute left-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-1/2"
        animate={{ top: ["20%", "80%", "20%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  </div>
);

const DailyBriefViz = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="w-full max-w-[190px] border border-white/20 rounded-lg p-3 bg-white/5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/30" />
          <div className="w-12 h-1.5 bg-white/30 rounded" />
        </div>
        <div className="w-6 h-1.5 bg-white/20 rounded" />
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center p-1.5 border border-white/10 rounded bg-white/5"
            animate={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.1)"] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          >
            <motion.div
              className="text-[10px] font-bold font-sans text-white"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.4, repeat: Infinity, repeatDelay: 2 }}
            >
              {[12, 8, 3][i]}
            </motion.div>
            <div className="w-full h-0.5 bg-white/20 rounded mt-1" />
          </motion.div>
        ))}
      </div>

      {/* Mini Bar Chart */}
      <div className="flex items-end gap-1 h-10 mb-2">
        {[40, 60, 35, 80, 55, 70, 45].map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-white/30 rounded-t"
            initial={{ height: "0%" }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
          />
        ))}
      </div>

      {/* Recommendation */}
      <motion.div
        className="w-full h-5 bg-white/20 rounded relative overflow-hidden"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  </div>
);

const VISUALIZATIONS: Record<string, React.FC> = {
  "AI Voice Receptionist": VoiceViz,
  "Appointment Booking": CalendarViz,
  "Lead Qualification": LeadViz,
  "Workflow Automation": WorkflowViz,
  "CRM Sync": CRMViz,
  "After-Hours Handling": AfterHoursViz,
  "Conversation → Clean Data": ConversationDataViz,
  "Trust & Safety Guardrails": TrustSafetyViz,
  "Business-Owner Daily Brief": DailyBriefViz
};

export const Solutions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <AnimatedSection className="text-center mb-16 border-b border-white/10 pb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic font-light text-white mb-6 tracking-tight">
            Intelligent Solutions
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-sans max-w-3xl mx-auto leading-relaxed">
            Autonomous agents engineered for zero-latency execution.
          </p>
        </AnimatedSection>

        <div className="space-y-0">
          {SERVICES.map((service, index) => {
            const VizComponent = VISUALIZATIONS[service.title];
            return (
              <div key={service.title} className="group relative border-b border-white/10">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="py-10" // Reduced vertical padding
                >
                  {/* 
                                      Strict Grid Layout:
                                      - Mobile: Stacks naturally
                                      - Tablet/Desktop (md+): 12 columns. Text takes 8 (Left), Wireframe takes 4 (Right).
                                      - Items centered vertically to reduce empty space.
                                    */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

                    {/* TEXT SIDE - Occupies 8 columns on desktop to fill space */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500 mb-6">
                        <service.icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif italic font-light text-white group-hover:translate-x-2 transition-transform duration-500">{service.title}</h2>
                      <p className="text-base text-white/60 leading-relaxed font-sans max-w-2xl">{service.description}</p>
                      <ul className="space-y-2 pt-2">
                        {service.features?.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/40 font-sans group-hover:text-white transition-colors duration-500 delay-100 text-sm">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* WIREFRAME SIDE - Occupies 4 columns on desktop, STRICTLY to the right */}
                    <div className="md:col-span-4 w-full flex justify-center md:justify-end">
                      <div className="relative w-full max-w-[300px] aspect-[4/3] overflow-hidden border border-white/10 bg-black rounded-lg group-hover:border-white/30 transition-colors duration-500 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                        {/* Render Specific Visualization */}
                        {VizComponent ? <VizComponent /> : null}

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <AnimatedSection className="mt-24 p-12 border border-white/10 text-center relative overflow-hidden bg-white/5">
          <div className="absolute inset-0 bg-white/5 skew-y-12 scale-150 opacity-0 hover:opacity-10 transition-opacity duration-700"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif italic font-light text-white mb-6">Need a custom solution?</h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto font-sans">We build bespoke agents for enterprise needs.</p>
            <Button variant="primary" onClick={() => navigate('/contact')}>Contact Sales Team</Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};
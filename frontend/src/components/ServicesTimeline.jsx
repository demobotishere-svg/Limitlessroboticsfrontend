import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';

const SERVICES = [
  {
    id: 1,
    icon: 'ScanSearch',
    title: 'Discovery & Analysis',
    phase: '01',
    summary: 'Deep-dive engineering audit, feasibility mapping, and system scoping.',
    detail: 'Our senior roboticists conduct on-site and remote system audits, identifying automation opportunities, assessing mechanical constraints, and building a comprehensive technical blueprint tailored to your operational DNA.',
  },
  {
    id: 2,
    icon: 'Cpu',
    title: 'System Architecture',
    phase: '02',
    summary: 'End-to-end hardware and software architecture design.',
    detail: 'We engineer a full-stack robotics architecture—selecting actuators, vision systems, compute modules, and real-time OS layers—then validate every subsystem in our digital twin environment before physical prototyping.',
  },
  {
    id: 3,
    icon: 'Wrench',
    title: 'Build & Integration',
    phase: '03',
    summary: 'Precision fabrication and seamless infrastructure integration.',
    detail: 'Our fabrication lab produces aerospace-grade components. Integration teams deploy and calibrate each module in situ, running over 400 automated regression tests before live handover.',
  },
  {
    id: 4,
    icon: 'BrainCircuit',
    title: 'AI Model Training',
    phase: '04',
    summary: 'Custom reinforcement learning pipelines and edge-deployed models.',
    detail: 'Proprietary AI pipelines ingest your real-world sensor data, training task-specific models on our GPU cluster. Edge deployment ensures sub-10ms inference latency with full offline autonomy capability.',
  },
  {
    id: 5,
    icon: 'ShieldCheck',
    title: 'Validation & Handover',
    phase: '05',
    summary: 'Rigorous safety certification and continuous remote monitoring.',
    detail: 'Every system undergoes ISO 10218 safety validation, FMEA analysis, and staged live trials. We deliver full technical documentation, operator certification programs, and 24/7 remote telemetry dashboards.',
  },
];

function TimelineStep({ service, index, total }) {
  const stepRef = useRef(null);
  const isInView = useInView(stepRef, { once: true, margin: '-100px' });
  const IconComp = Icons[service?.icon] || Icons['HelpCircle'];

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.05 }}
      className="relative flex gap-6 sm:gap-10 pb-16 last:pb-0"
    >
      {/* Visual Timeline Axis */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-10 h-10 rounded-full border border-neutral-100 bg-neutral-50 flex items-center justify-center text-neutral-800 font-outfit text-xs font-semibold shadow-sm z-10"
        >
          {service?.phase}
        </div>
        {index < total - 1 && (
          <div className="w-px h-full bg-neutral-200 absolute top-10 bottom-0 left-[19px] sm:left-[19px]" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-1.5 min-w-0">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
          <div className="flex-1">
            <h3
              className="text-lg font-bold text-neutral-900 tracking-tight font-outfit"
            >
              {service?.title}
            </h3>
            <p
              className="text-xs sm:text-sm text-neutral-800 font-medium font-outfit mt-1 leading-relaxed"
            >
              {service?.summary}
            </p>
            <p
              className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed mt-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {service?.detail}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100/80 flex items-center justify-center text-neutral-400 flex-shrink-0 mt-1">
            <IconComp size={16} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesTimeline() {
  const containerRef = useRef(null);

  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-32 bg-transparent"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start flex flex-col gap-4">
            <span
              className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-405"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Our Methodology
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight font-outfit leading-[1.1]"
            >
              How we build <br />
              <span className="font-playfair font-light italic text-neutral-550">the future</span>.
            </h2>
            <p
              className="text-sm text-neutral-500 font-light leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A structured, five-stage methodology mapping from exploratory audits to live system deployments and certification.
            </p>
          </div>

          {/* Right Column: Process Timeline */}
          <div ref={containerRef} className="lg:col-span-8">
            {SERVICES.map((service, index) => (
              <TimelineStep
                key={service?.id}
                service={service}
                index={index}
                total={SERVICES.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

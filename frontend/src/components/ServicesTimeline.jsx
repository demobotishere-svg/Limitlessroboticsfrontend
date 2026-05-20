import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';

const SERVICES = [
  {
    id: 1,
    icon: 'ScanSearch',
    title: 'Discovery & Analysis',
    phase: '01',
    summary: 'Deep-dive engineering audit, feasibility mapping, and robotics system scoping for your environment.',
    detail: 'Our senior roboticists conduct on-site and remote system audits, identifying automation opportunities, assessing mechanical constraints, and building a comprehensive technical blueprint tailored to your operational DNA.',
    color: 'cyan',
  },
  {
    id: 2,
    icon: 'Cpu',
    title: 'System Architecture',
    phase: '02',
    summary: 'End-to-end hardware and software architecture design, from sensor arrays to neural control stacks.',
    detail: 'We engineer a full-stack robotics architecture—selecting actuators, vision systems, compute modules, and real-time OS layers—then validate every subsystem in our digital twin environment before physical prototyping.',
    color: 'blue',
  },
  {
    id: 3,
    icon: 'Wrench',
    title: 'Build & Integration',
    phase: '03',
    summary: 'Precision fabrication, exoskeleton assembly, and seamless integration with existing industrial infrastructure.',
    detail: 'Our ISO-certified fabrication lab produces aerospace-grade components. Integration teams deploy and calibrate each module in situ, running over 400 automated regression tests before live handover.',
    color: 'violet',
  },
  {
    id: 4,
    icon: 'BrainCircuit',
    title: 'AI Model Training',
    phase: '04',
    summary: 'Custom reinforcement learning pipelines and edge-deployed computer vision models fine-tuned to your workflow.',
    detail: 'Proprietary AI pipelines ingest your real-world sensor data, training task-specific models on our GPU cluster. Edge deployment ensures sub-10ms inference latency with full offline autonomy capability.',
    color: 'cyan',
  },
  {
    id: 5,
    icon: 'ShieldCheck',
    title: 'Validation & Handover',
    phase: '05',
    summary: 'Rigorous safety certification, operator training, and continuous remote monitoring post-deployment.',
    detail: 'Every system undergoes ISO 10218 safety validation, FMEA analysis, and staged live trials. We deliver full technical documentation, operator certification programs, and 24/7 remote telemetry dashboards.',
    color: 'blue',
  },
];

const COLOR_MAP = {
  cyan: {
    glow: 'shadow-[0_0_32px_0_rgba(0,255,255,0.25)]',
    border: 'border-cyan-400/40',
    nodeBorder: 'border-cyan-400',
    nodeGlow: 'shadow-[0_0_20px_4px_rgba(0,255,255,0.5)]',
    text: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    connector: 'from-cyan-400/60',
    badge: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/30',
    haloFrom: 'rgba(0,255,255,0.15)',
    haloTo: 'rgba(0,255,255,0)',
  },
  blue: {
    glow: 'shadow-[0_0_32px_0_rgba(0,136,255,0.25)]',
    border: 'border-blue-400/40',
    nodeBorder: 'border-blue-400',
    nodeGlow: 'shadow-[0_0_20px_4px_rgba(0,136,255,0.5)]',
    text: 'text-blue-400',
    bg: 'bg-blue-400/10',
    connector: 'from-blue-400/60',
    badge: 'bg-blue-400/15 text-blue-300 border-blue-400/30',
    haloFrom: 'rgba(0,136,255,0.15)',
    haloTo: 'rgba(0,136,255,0)',
  },
  violet: {
    glow: 'shadow-[0_0_32px_0_rgba(148,0,255,0.25)]',
    border: 'border-violet-400/40',
    nodeBorder: 'border-violet-400',
    nodeGlow: 'shadow-[0_0_20px_4px_rgba(148,0,255,0.5)]',
    text: 'text-violet-400',
    bg: 'bg-violet-400/10',
    connector: 'from-violet-400/60',
    badge: 'bg-violet-400/15 text-violet-300 border-violet-400/30',
    haloFrom: 'rgba(148,0,255,0.15)',
    haloTo: 'rgba(148,0,255,0)',
  },
};

function CircuitConnector({ color, index }) {
  const c = COLOR_MAP[color] || COLOR_MAP.cyan;
  return (
    <div className="relative flex items-center justify-center w-16 md:w-24 flex-shrink-0">
      <motion.div
        className="relative w-full h-px"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: 'easeOut' }}
        style={{ originX: 0 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${c.connector} to-transparent`} />
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${c.text.replace('text-', 'bg-')} opacity-90`}
          animate={{ x: ['0%', '100%', '0%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: index * 0.4 }}
          style={{ left: 0 }}
        />
      </motion.div>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none">
        {[0, 1].map((dot) => (
          <motion.div
            key={dot}
            className={`w-0.5 h-0.5 rounded-full ${c.text.replace('text-', 'bg-')} opacity-40`}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: dot * 0.5 + index * 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceNode({ service, index, isActive, onClick }) {
  const c = COLOR_MAP[service?.color] || COLOR_MAP.cyan;
  const IconComp = Icons[service?.icon] || Icons['HelpCircle'];

  return (
    <motion.div
      className="flex flex-col items-center flex-shrink-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center cursor-pointer focus:outline-none transition-all duration-300 ${
          isActive
            ? `${c.nodeBorder} ${c.nodeGlow} ${c.bg}`
            : 'border-white/10 bg-white/5 hover:border-white/25'
        }`}
        aria-label={`View details for ${service?.title}`}
        aria-pressed={isActive}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              style={{
                background: `radial-gradient(circle, ${c.haloFrom} 0%, ${c.haloTo} 70%)`,
                borderRadius: '1rem',
              }}
            />
          )}
        </AnimatePresence>
        <motion.div
          animate={isActive ? { rotate: [0, 8, -8, 0] } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IconComp
            size={28}
            className={`relative z-10 transition-colors duration-300 ${isActive ? c.text : 'text-white/40'}`}
            strokeWidth={1.5}
          />
        </motion.div>
        {isActive && (
          <motion.div
            className={`absolute -inset-1 rounded-2xl border ${c.nodeBorder} opacity-30`}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      <motion.div
        className={`mt-3 text-xs font-mono tracking-widest border rounded px-2 py-0.5 ${c.badge}`}
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        {service?.phase}
      </motion.div>

      <motion.p
        className={`mt-2 text-center text-xs md:text-sm font-medium max-w-[100px] md:max-w-[120px] leading-snug transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-white/40'
        }`}
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        {service?.title}
      </motion.p>
    </motion.div>
  );
}

function DetailPanel({ service }) {
  const c = COLOR_MAP[service?.color] || COLOR_MAP.cyan;
  const IconComp = Icons[service?.icon] || Icons['HelpCircle'];
  const ChevronRight = Icons['ChevronRight'] || Icons['HelpCircle'];

  return (
    <motion.div
      key={service?.id}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl p-8 md:p-10 ${c.border} ${c.glow}`}
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      }}
      role="region"
      aria-label={`Details for ${service?.title}`}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 40px)',
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(circle, ${c.haloFrom} 0%, ${c.haloTo} 70%)`,
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-xl border flex items-center justify-center ${c.border} ${c.bg}`}
        >
          <IconComp size={26} className={c.text} strokeWidth={1.5} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`text-xs font-mono tracking-widest ${c.text} border ${c.badge} rounded px-2 py-0.5`}
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              PHASE {service?.phase}
            </span>
          </div>
          <h3
            className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {service?.title}
          </h3>
          <p
            className="text-white/60 text-sm md:text-base mb-4 leading-relaxed"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {service?.summary}
          </p>
          <p
            className="text-white/40 text-sm leading-relaxed"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {service?.detail}
          </p>
        </div>

        <div className={`hidden md:flex items-center self-center opacity-30 ${c.text}`}>
          <ChevronRight size={20} />
        </div>
      </div>

      <motion.div
        className={`absolute bottom-0 left-0 h-px w-full`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          originX: 0,
          background: `linear-gradient(90deg, transparent, ${c.haloFrom.replace('0.15', '0.6')}, transparent)`,
        }}
      />
    </motion.div>
  );
}

export default function ServicesTimeline() {
  const [activeId, setActiveId] = useState(1);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const scrollRef = useRef(null);

  const activeService = SERVICES.find((s) => s?.id === activeId) || SERVICES[0];

  function handleNodeClick(id) {
    setActiveId(id);
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #000000 0%, #020810 40%, #000510 70%, #000000 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(0,255,255,0.08) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(0,255,255,0.08) 60px)',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 'min(92vw, 900px)',
          height: 'min(70vw, 500px)',
          background:
            'radial-gradient(ellipse, rgba(0,136,255,0.4) 0%, rgba(0,255,255,0.15) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
            <span
              className="text-xs tracking-[0.3em] text-cyan-400/70 uppercase"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Engineering Process
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold text-white tracking-wide leading-tight"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            SERVICE
            <span className="ml-3 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #00FFFF, #0088FF)' }}>
              PIPELINE
            </span>
          </h2>
          <p
            className="mt-4 text-white/40 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            From first contact to autonomous deployment — five precision-engineered phases that define our delivery standard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 md:mb-16"
        >
          <div
            ref={scrollRef}
            className="flex items-start overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="tablist"
            aria-label="Service pipeline steps"
          >
            <div className="flex items-center min-w-max mx-auto">
              {SERVICES.map((service, idx) => (
                <div key={service?.id} className="flex items-center">
                  <ServiceNode
                    service={service}
                    index={idx}
                    isActive={activeId === service?.id}
                    onClick={() => handleNodeClick(service?.id)}
                  />
                  {idx < SERVICES.length - 1 && (
                    <CircuitConnector
                      color={SERVICES[idx + 1]?.color}
                      index={idx}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeService && (
            <DetailPanel key={activeService?.id} service={activeService} />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          {SERVICES.map((s) => {
            const c = COLOR_MAP[s?.color] || COLOR_MAP.cyan;
            return (
              <button
                key={s?.id}
                onClick={() => setActiveId(s?.id)}
                aria-label={`Go to phase ${s?.phase}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeId === s?.id
                    ? `${c.text.replace('text-', 'bg-')} w-6 shadow-lg`
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

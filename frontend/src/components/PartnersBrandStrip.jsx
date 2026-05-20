import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import * as Icons from 'lucide-react';

const PARTNERS = [
  { id: 1, name: 'NeuralCore', icon: 'Cpu', tagline: 'AI Infrastructure' },
  { id: 2, name: 'QuantumDrive', icon: 'Zap', tagline: 'Power Systems' },
  { id: 3, name: 'SynapseTech', icon: 'Brain', tagline: 'Neural Networks' },
  { id: 4, name: 'OrbitForge', icon: 'Globe', tagline: 'Space Robotics' },
  { id: 5, name: 'IronAxis', icon: 'Settings', tagline: 'Industrial Automation' },
  { id: 6, name: 'PhotonLabs', icon: 'Aperture', tagline: 'Optics & Sensing' },
  { id: 7, name: 'VoltMatrix', icon: 'Battery', tagline: 'Energy Storage' },
  { id: 8, name: 'CipherEdge', icon: 'Shield', tagline: 'Security Systems' },
];

const DUPLICATED = [...PARTNERS, ...PARTNERS];

/** @type {import('framer-motion').Variants} */
const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.05 },
  },
};

/** @type {import('framer-motion').Variants} */
const headingVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function PartnerChip({ partner }) {
  const IconComponent = Icons[partner?.icon] || Icons['HelpCircle'];

  return (
    <div
      className="relative flex-shrink-0 flex items-center gap-3 px-8 py-4 outline-none min-w-[200px] justify-center group"
    >
      <IconComponent
        size={18}
        className="text-neutral-400 group-hover:text-black transition-colors duration-300"
        strokeWidth={1.5}
      />
      <div className="flex flex-col leading-none">
        <span
          className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-450 group-hover:text-black transition-colors duration-300"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {partner?.name}
        </span>
        <span
          className="text-[9px] font-light tracking-wide text-neutral-400 mt-0.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {partner?.tagline}
        </span>
      </div>
    </div>
  );
}

function ScrollingTrack() {
  /** @type {import('react').MutableRefObject<any>} */
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const SPEED = 0.4;

  useAnimationFrame(() => {
    const el = trackRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    positionRef.current += SPEED;
    if (positionRef.current >= halfWidth) {
      positionRef.current = 0;
    }
    el.style.transform = `translateX(-${positionRef.current}px)`;
  });

  return (
    <div className="overflow-hidden w-full relative">
      <div
        ref={trackRef}
        className="flex gap-8 will-change-transform py-2"
        style={{ width: 'max-content' }}
      >
        {DUPLICATED.map((partner, i) => (
          <PartnerChip key={`${partner?.id}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

export default function PartnersBrandStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-transparent"
      aria-label="Trusted Partners"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 mb-12">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-3 text-center"
        >
          <motion.div variants={headingVariants} className="flex items-center">
            <span
              className="text-neutral-405 text-[10px] font-semibold tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Collaborating Institutions
            </span>
          </motion.div>

          <motion.h2
            variants={headingVariants}
            className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 font-outfit"
          >
            Strategic Technology Partners
          </motion.h2>

          <motion.p
            variants={headingVariants}
            className="text-xs sm:text-sm text-neutral-500 max-w-md leading-relaxed font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Integrating platform intelligence with leading global technology providers and sovereign research laboratories.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="relative z-10"
      >
        {/* Soft shadow gradients for the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#f5f5f7] to-transparent z-25 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#f5f5f7] to-transparent z-25 pointer-events-none" />
        <ScrollingTrack />
      </motion.div>
    </section>
  );
}

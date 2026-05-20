import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Dr. Aiko Tanaka',
    role: 'Chief Robotics Engineer',
    company: 'NovaSynth Industries',
    avatar: 'https://placehold.co/150x150/001a2e/00FFFF?text=AT',
    quote: 'Limitless Robotics redefined what I thought possible in autonomous systems. Their exoskeleton integration framework is a decade ahead of anything else on the market.',
    rating: 5,
    tag: 'Exoskeleton Systems',
  },
  {
    id: 2,
    name: 'Marcus Veld',
    role: 'Director of AI Operations',
    company: 'QuantumEdge Labs',
    avatar: 'https://placehold.co/150x150/001a2e/0088FF?text=MV',
    quote: 'The neural-mesh control suite delivered precision we have never achieved at scale. Implementation was seamless, and their support team operates like a surgical unit.',
    rating: 5,
    tag: 'Neural Interface',
  },
  {
    id: 3,
    name: 'Isabelle Morea',
    role: 'VP of Industrial Automation',
    company: 'Arcturus Manufacturing',
    avatar: 'https://placehold.co/150x150/001a2e/9400FF?text=IM',
    quote: 'Deployment of their robotic arm clusters cut our cycle time by 62%. Limitless is not a vendor — they are an engineering partner who thinks in systems.',
    rating: 5,
    tag: 'Industrial Automation',
  },
  {
    id: 4,
    name: 'Reza Khalid',
    role: 'Founder & CTO',
    company: 'StellarDrone Corp',
    avatar: 'https://placehold.co/150x150/001a2e/00FFFF?text=RK',
    quote: 'Their drone intelligence stack is the backbone of our autonomous fleet. The holographic simulation environment alone is worth the entire investment.',
    rating: 5,
    tag: 'Drone Systems',
  },
];

const StarIcon = Icons['Star'] || Icons['HelpCircle'];
const QuoteIcon = Icons['Quote'] || Icons['HelpCircle'];
const ShieldCheckIcon = Icons['ShieldCheck'] || Icons['HelpCircle'];

function HologramCard({ testimonial, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(() => {
    // removed per-frame tilt to eliminate micro-jitter
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const accentColors = ['#00FFFF', '#0088FF', '#9400FF', '#00FFFF'];
  const accent = accentColors[index % accentColors.length];

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      className="relative group cursor-default"
    >
      <motion.div
        className="absolute -inset-px rounded-2xl"
        animate={isHovered ? { opacity: 1 } : { opacity: 0.5 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${accent}55, transparent 50%, ${accent}33)`,
          boxShadow: isHovered ? `0 0 40px ${accent}44, 0 0 80px ${accent}22` : `0 0 20px ${accent}22`,
        }}
      />

      <div
        className="absolute -inset-px rounded-2xl overflow-hidden pointer-events-none"
        style={{ opacity: isHovered ? 1 : 0.5, transition: 'opacity 0.3s' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${accent}33 0%, transparent 60%)`,
          }}
        />
      </div>

      <div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          border: `1px solid ${accent}66`,
          boxShadow: `inset 0 1px 0 ${accent}33`,
        }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(0,20,40,0.95) 0%, rgba(0,0,0,0.98) 100%)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(${accent}88 1px, transparent 1px),
              linear-gradient(90deg, ${accent}88 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}aa, transparent)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}44, transparent)` }} />

        <div className="relative p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div
                  className="absolute -inset-1 rounded-full animate-pulse"
                  style={{ background: `radial-gradient(circle, ${accent}66, transparent 70%)` }}
                />
                <div
                  className="relative w-14 h-14 rounded-full overflow-hidden"
                  style={{ border: `2px solid ${accent}88` }}
                >
                  <img
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x150/001a2e/00FFFF?text=?'; }}
                  />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                >
                  <ShieldCheckIcon size={8} className="text-black" />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold text-sm tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {testimonial?.name}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: accent, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {testimonial?.role}
                </p>
                <p className="text-gray-500 text-xs mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {testimonial?.company}
                </p>
              </div>
            </div>

            <div
              className="px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase flex-shrink-0"
              style={{
                border: `1px solid ${accent}55`,
                color: accent,
                background: `${accent}11`,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {testimonial?.tag}
            </div>
          </div>

          <div
            className="relative rounded-xl p-5"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              className="absolute inset-0 rounded-xl opacity-10 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, ${accent}33 0px, transparent 1px, transparent 8px)`,
              }}
            />
            <QuoteIcon
              size={18}
              className="mb-3 opacity-60"
              style={{ color: accent }}
            />
            <p
              className="text-sm leading-relaxed italic"
              style={{
                color: '#C0C8D8',
                fontFamily: "'Space Grotesk', sans-serif",
                fontStyle: 'italic',
              }}
            >
              {testimonial?.quote}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {Array.from({ length: testimonial?.rating ?? 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + i * 0.06, duration: 0.3, ease: 'easeOut' }}
                >
                  <StarIcon
                    size={14}
                    style={{ color: accent, fill: accent }}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
              />
              <span className="text-xs tracking-widest uppercase" style={{ color: `${accent}99`, fontFamily: "'Space Grotesk', sans-serif" }}>
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader() {
  return (
    <div className="text-center space-y-6 mb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="inline-flex items-center gap-3 px-5 py-2 rounded-full"
        style={{
          border: '1px solid rgba(0,255,255,0.3)',
          background: 'rgba(0,255,255,0.05)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: '0 0 8px #00FFFF' }} />
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: '#00FFFF', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Field Intelligence
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: '0 0 8px #00FFFF' }} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none"
        style={{ fontFamily: "'Orbitron', sans-serif", color: '#FFFFFF' }}
      >
        TRUSTED BY
        <br />
        <span
          className="relative inline-block"
          style={{
            background: 'linear-gradient(90deg, #00FFFF, #0088FF, #9400FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          PIONEERS
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        style={{ color: '#6B7A99', fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Engineers, founders, and operators at the frontier of autonomous systems — sharing what Limitless Robotics made possible.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="mx-auto h-px max-w-xs"
        style={{ background: 'linear-gradient(90deg, transparent, #00FFFF, #0088FF, transparent)' }}
      />
    </div>
  );
}

export default function TestimonialsHologramGrid() {
  return (
    <section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,136,255,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(148,0,255,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 50%, rgba(0,255,255,0.05) 0%, transparent 60%)
          `,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 'min(92vw, 600px)',
          height: 'min(92vw, 600px)',
          background: 'radial-gradient(circle, rgba(0,136,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-screen-xl mx-auto">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" style={{ perspective: '1200px' }}>
          {TESTIMONIALS.map((testimonial, index) => (
            <HologramCard
              key={testimonial?.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          {[
            { value: '500+', label: 'Engineers Trained' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '40+', label: 'Enterprise Clients' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className="text-3xl font-black tracking-tight"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  background: 'linear-gradient(135deg, #00FFFF, #0088FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat?.value}
              </span>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: '#4A5568', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {stat?.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
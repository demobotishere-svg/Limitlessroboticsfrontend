import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import robotHumanoidImg from '../assets/advanced_ai_robot_humanoid.jpg';
import robotExoskeletonImg from '../assets/futuristic_robot_exoskeleton_dark.jpg';
import robotArmImg from '../assets/robot_arm_mechanical_dark_background.jpg';

const ArrowRight = Icons['ArrowRight'] || Icons['HelpCircle'];
const Zap = Icons['Zap'] || Icons['HelpCircle'];
const Cpu = Icons['Cpu'] || Icons['HelpCircle'];
const Activity = Icons['Activity'] || Icons['HelpCircle'];
const Shield = Icons['Shield'] || Icons['HelpCircle'];
const ChevronDown = Icons['ChevronDown'] || Icons['HelpCircle'];

const STATS = [
  { label: 'Active Units', value: '2,400+', icon: 'Cpu' },
  { label: 'Uptime Rate', value: '99.97%', icon: 'Activity' },
  { label: 'Patents Filed', value: '340+', icon: 'Shield' },
];

const CAROUSEL_SLIDES = [
  {
    id: 0,
    image: robotHumanoidImg,
    tag: 'GEN-7 HUMANOID',
    caption: 'Advanced neural-motor fusion system',
  },
  {
    id: 1,
    image: robotExoskeletonImg,
    tag: 'EXOSKELETON SERIES',
    caption: 'Biomechanical augmentation platform',
  },
  {
    id: 2,
    image: robotArmImg,
    tag: 'PRECISION ARM',
    caption: 'Six-axis industrial micro-manipulation',
  },
];

function GridBackground({ mouseX, mouseY }) {
  // If motion values aren't passed (SSR), render a static background to avoid hydration/runtime errors
  if (!mouseX || !mouseY) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,136,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,136,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '240px 240px',
          }}
        />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/15 to-transparent" />
        <div className="absolute top-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      </div>
    );
  }

  const bg1X = useTransform(mouseX, (x) => x * 0.012);
  const bg1Y = useTransform(mouseY, (y) => y * 0.012);
  const bg2X = useTransform(mouseX, (x) => x * 0.025);
  const bg2Y = useTransform(mouseY, (y) => y * 0.025);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          x: bg1X,
          y: bg1Y,
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          willChange: 'transform',
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          x: bg2X,
          y: bg2Y,
          backgroundImage: `
            linear-gradient(rgba(0,136,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,136,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '240px 240px',
          willChange: 'transform',
        }}
      />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/15 to-transparent" />
      <div className="absolute top-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
    </div>
  );
}

function MatrixRain() {
  const count = 18;
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  // initialLines uses a stable character so SSR matches initial client render
  const initialLines = Array.from({ length: count }, () => Array.from({ length: 20 }, () => 'ウ'));
  const [lines, setLines] = useState(initialLines);

  useEffect(() => {
    // populate random chars on client only (avoids SSR hydration mismatch)
    const generated = Array.from({ length: count }, () =>
      Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)])
    );
    setLines(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {lines.map((colLines, col) => {
        const left = `${(col / count) * 100}%`;
        const delay = col * 0.3;
        const duration = 6 + (col % 4);
        return (
          <motion.div
            key={col}
            className="absolute top-0 text-cyan-400 font-mono text-xs leading-5 select-none"
            style={{ left }}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '110%', opacity: [0, 1, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
          >
            {colLines.map((ch, r) => (
              <div key={r}>{ch}</div>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}

function PulsingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function HUDStat({ stat, index }) {
  const StatIcon = Icons[stat?.icon] || Icons['HelpCircle'];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.15, duration: 0.5, ease: 'easeOut' }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-cyan-400/20 bg-black/40 backdrop-blur-md group hover:border-cyan-400/60 transition-all duration-300"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 group-hover:bg-cyan-400/20 transition-colors duration-300">
        <StatIcon className="w-4 h-4 text-cyan-400" />
      </div>
      <div>
        <div className="text-cyan-300 font-bold text-sm leading-none" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stat?.value}</div>
        <div className="text-gray-500 text-xs mt-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{stat?.label}</div>
      </div>
    </motion.div>
  );
}

const resolveImageSrc = (image) => (typeof image === 'object' && image !== null ? image.src : image);

function CarouselSlide({ slide, isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={slide?.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={resolveImageSrc(slide?.image)}
            alt={slide?.tag}
            className="w-full h-full object-cover object-center"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="absolute bottom-6 right-6 text-right"
          >
            <div
              className="text-cyan-400 text-xs font-bold tracking-widest mb-1 px-2 py-1 border border-cyan-400/40 rounded bg-black/60 backdrop-blur-sm inline-block"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {slide?.tag}
            </div>
            <div
              className="text-gray-400 text-xs mt-1"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {slide?.caption}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HeroShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  const handleMouseMove = useCallback(() => {}, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const glitchTimer = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    return () => clearInterval(glitchTimer);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleSlideChange = (index) => {
    clearInterval(intervalRef.current);
    setActiveSlide(index);
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4000);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-black"
      aria-label="Hero section"
    >
      <GridBackground />
      <MatrixRain />

      <PulsingOrb className="w-96 h-96 bg-cyan-500/20 -top-24 -left-24" delay={0} />
      <PulsingOrb className="w-80 h-80 bg-blue-600/15 bottom-0 right-0" delay={1.5} />
      <PulsingOrb className="w-64 h-64 bg-violet-700/15 top-1/2 left-1/2" delay={2.5} />

      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950/80 to-black" />

      <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-400/5 backdrop-blur-md">
                <motion.div
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span
                  className="text-cyan-400 text-xs font-semibold tracking-widest uppercase"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Limitless Robotics — System Online
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <span
                  className={`block text-white transition-all duration-100 ${
                    glitchActive ? 'translate-x-0.5 opacity-80' : ''
                  }`}
                  style={{
                    textShadow: glitchActive
                      ? '2px 0 #00FFFF, -2px 0 #9400FF'
                      : '0 0 40px rgba(0,255,255,0.2)',
                  }}
                >
                  Engineering
                </span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(90deg, #00FFFF 0%, #0088FF 50%, #9400FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.4))',
                  }}
                >
                  the Future
                </span>
                <span
                  className={`block text-gray-200 transition-all duration-100 ${
                    glitchActive ? '-translate-x-0.5 opacity-80' : ''
                  }`}
                  style={{
                    textShadow: glitchActive
                      ? '-2px 0 #00FFFF, 2px 0 #9400FF'
                      : 'none',
                  }}
                >
                  Beyond Limits
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Pioneering the convergence of artificial intelligence, robotics, and human potential.
              Build, learn, and deploy next-generation autonomous systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#courses"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase overflow-hidden border border-blue-500/60 bg-blue-600/10 backdrop-blur-md text-blue-300 transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/20"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
                aria-label="Explore Courses"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,136,255,0.15) 0%, transparent 70%)' }}
                />
                <div className="absolute inset-0 rounded-xl border border-blue-400/20 group-hover:border-blue-400/60 transition-all duration-300" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent group-hover:via-blue-300" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                <Zap className="w-4 h-4" />
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>

              <motion.a
                href="#products"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase overflow-hidden border border-cyan-400/60 bg-cyan-400/5 backdrop-blur-md text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
                aria-label="View Products"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,255,0.1) 0%, transparent 70%)' }}
                />
                <div className="absolute top-0 left-0 w-3 h-px bg-cyan-400" />
                <div className="absolute top-0 left-0 w-px h-3 bg-cyan-400" />
                <div className="absolute top-0 right-0 w-3 h-px bg-cyan-400" />
                <div className="absolute top-0 right-0 w-px h-3 bg-cyan-400" />
                <div className="absolute bottom-0 left-0 w-3 h-px bg-cyan-400" />
                <div className="absolute bottom-0 left-0 w-px h-3 bg-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 h-px bg-cyan-400" />
                <div className="absolute bottom-0 right-0 w-px h-3 bg-cyan-400" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent group-hover:via-cyan-300" />
                <span>View Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
            </motion.div>

            <div className="flex flex-wrap gap-3 pt-2">
              {STATS.map((stat, i) => (
                <HUDStat key={stat?.label} stat={stat} index={i} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-4"
            style={{
              perspective: 1000,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          >
            <div className="relative w-full aspect-[4/5] max-w-sm lg:max-w-full rounded-2xl overflow-hidden border border-cyan-400/20 bg-gray-950">
              <div className="absolute inset-0 border border-cyan-400/10 rounded-2xl z-20 pointer-events-none" />

              <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-black/70 backdrop-blur-sm border-b border-cyan-400/20">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-cyan-400 text-xs tracking-widest font-semibold" style={{ fontFamily: 'Orbitron, sans-serif' }}>CAM-01</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {CAROUSEL_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleSlideChange(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          activeSlide === i ? 'w-6 bg-cyan-400' : 'w-1.5 bg-gray-600 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {String(activeSlide + 1).padStart(2, '0')}/{String(CAROUSEL_SLIDES.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="relative w-full h-full">
                {CAROUSEL_SLIDES.map((slide, i) => (
                  <CarouselSlide key={slide?.id} slide={slide} isActive={i === activeSlide} />
                ))}
              </div>

              <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 items-end pointer-events-none">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="px-2 py-1 rounded text-xs border border-violet-500/40 bg-violet-500/10 text-violet-300 backdrop-blur-sm"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  AI ACTIVE
                </motion.div>
              </div>

              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-16 left-3 w-12 h-12 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-sm" />
                <div className="absolute top-16 right-3 w-12 h-12 border-r-2 border-t-2 border-cyan-400/40 rounded-tr-sm" />
                <div className="absolute bottom-3 left-3 w-12 h-12 border-l-2 border-b-2 border-cyan-400/40 rounded-bl-sm" />
                <div className="absolute bottom-3 right-3 w-12 h-12 border-r-2 border-b-2 border-cyan-400/40 rounded-br-sm" />
                <div className="absolute top-1/2 left-3 w-4 h-px bg-cyan-400/30" />
                <div className="absolute top-1/2 right-3 w-4 h-px bg-cyan-400/30" />
              </div>
            </div>

            <div className="flex items-center gap-6 px-4 py-3 rounded-xl border border-gray-800 bg-black/60 backdrop-blur-md w-full max-w-sm lg:max-w-full">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-green-400 text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Systems Nominal</span>
              </div>
              <div className="flex-1 h-px bg-gray-800" />
              <div className="flex items-center gap-1">
                {Array.from({ length: 8 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-cyan-400/60 rounded-full"
                    style={{ height: 8, transformOrigin: 'bottom center' }}
                    initial={{ scaleY: 0.5 }}
                    animate={{ scaleY: [0.5, 1 + i * 0.12, 0.5] }}
                    transition={{ duration: 0.8, delay: i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="#courses"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-600 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
            aria-label="Scroll down"
          >
            <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>Discover</span>
            <ChevronDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import advancedAiRobotImg from '../assets/advanced_ai_robot_humanoid.jpg';
import droneImg from '../assets/drone_technology_futuristic.jpg';
import exoskeletonImg from '../assets/futuristic_robot_exoskeleton_dark.jpg';
import robotArmImg from '../assets/robot_arm_mechanical_dark_background.jpg';
import industrialImg from '../assets/industrial_automation_robotics.jpg';

const resolveImageSrc = (image) => {
  if (!image) return '';
  return typeof image === 'object' && image !== null ? image.src : image;
};

const ArrowRight = Icons['ArrowRight'] || Icons['HelpCircle'];
const Cpu = Icons['Cpu'] || Icons['HelpCircle'];
const Zap = Icons['Zap'] || Icons['HelpCircle'];
const Shield = Icons['Shield'] || Icons['HelpCircle'];
const Wifi = Icons['Wifi'] || Icons['HelpCircle'];
const Eye = Icons['Eye'] || Icons['HelpCircle'];
const Activity = Icons['Activity'] || Icons['HelpCircle'];
const Box = Icons['Box'] || Icons['HelpCircle'];

const PRODUCTS = [
  {
    id: 1,
    tag: 'FLAGSHIP',
    name: 'LR-X9 Humanoid Core',
    subtitle: 'Next-Gen AI Robot Kit',
    description:
      'Full-stack humanoid robotics platform with embedded neural inference engine, 32-DoF articulation, and real-time sensorimotor fusion.',
    image: advancedAiRobotImg,
    price: '$12,400',
    accentColor: '#00FFFF',
    glowColor: 'rgba(0,255,255,0.35)',
    features: [
      { icon: 'Cpu', label: 'Neural Inference Engine' },
      { icon: 'Activity', label: '32-DoF Articulation' },
      { icon: 'Wifi', label: 'Mesh Network Ready' },
      { icon: 'Shield', label: 'Hardened OS' },
    ],
  },
  {
    id: 2,
    tag: 'NEW',
    name: 'AeroDrone MK-IV',
    subtitle: 'Autonomous Aerial Module',
    description:
      'Precision-engineered autonomous UAV with LiDAR-vision fusion, edge AI navigation, and sub-10ms response latency.',
    image: droneImg,
    price: '$7,800',
    accentColor: '#0088FF',
    glowColor: 'rgba(0,136,255,0.35)',
    features: [
      { icon: 'Eye', label: 'LiDAR-Vision Fusion' },
      { icon: 'Zap', label: 'Sub-10ms Latency' },
      { icon: 'Cpu', label: 'Edge AI Navigator' },
      { icon: 'Wifi', label: '5G Telemetry' },
    ],
  },
  {
    id: 3,
    tag: 'PRO',
    name: 'ExoFrame Sigma',
    subtitle: 'Powered Exoskeleton Suit',
    description:
      'Augmentation-grade powered exoskeleton for industrial and research applications. Adaptive torque control with biometric feedback loops.',
    image: exoskeletonImg,
    price: '$23,900',
    accentColor: '#9400FF',
    glowColor: 'rgba(148,0,255,0.35)',
    features: [
      { icon: 'Shield', label: 'Adaptive Torque Control' },
      { icon: 'Activity', label: 'Biometric Feedback' },
      { icon: 'Cpu', label: 'Force Amplification' },
      { icon: 'Zap', label: 'Rapid Charge Cell' },
    ],
  },
  {
    id: 4,
    tag: 'INDUSTRIAL',
    name: 'MechArm Pro 7X',
    subtitle: 'Precision Robotic Arm',
    description:
      'Heavy-payload 7-axis robotic arm with sub-millimeter repeatability, vision-guided assembly, and zero-downtime firmware updates.',
    image: robotArmImg,
    price: '$9,600',
    accentColor: '#00FFFF',
    glowColor: 'rgba(0,255,255,0.3)',
    features: [
      { icon: 'Eye', label: 'Vision-Guided Assembly' },
      { icon: 'Activity', label: '±0.01mm Repeatability' },
      { icon: 'Shield', label: '7-Axis Freedom' },
      { icon: 'Zap', label: 'OTA Firmware' },
    ],
  },
  {
    id: 5,
    tag: 'ENTERPRISE',
    name: 'AutoCell Infinity',
    subtitle: 'Industrial Automation Cell',
    description:
      'Modular factory automation ecosystem with collaborative robot cells, AI quality inspection, and real-time production analytics.',
    image: industrialImg,
    price: '$48,000',
    accentColor: '#0088FF',
    glowColor: 'rgba(0,136,255,0.3)',
    features: [
      { icon: 'Box', label: 'Modular Cell Design' },
      { icon: 'Cpu', label: 'AI Quality Inspection' },
      { icon: 'Activity', label: 'Real-Time Analytics' },
      { icon: 'Wifi', label: 'Cloud Integration' },
    ],
  },
];

const TAG_COLORS = {
  FLAGSHIP: { text: '#00FFFF', border: 'rgba(0,255,255,0.4)', bg: 'rgba(0,255,255,0.08)' },
  NEW: { text: '#00FF88', border: 'rgba(0,255,136,0.4)', bg: 'rgba(0,255,136,0.08)' },
  PRO: { text: '#9400FF', border: 'rgba(148,0,255,0.4)', bg: 'rgba(148,0,255,0.08)' },
  INDUSTRIAL: { text: '#FFB800', border: 'rgba(255,184,0,0.4)', bg: 'rgba(255,184,0,0.08)' },
  ENTERPRISE: { text: '#0088FF', border: 'rgba(0,136,255,0.4)', bg: 'rgba(0,136,255,0.08)' },
};

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const tagStyle = TAG_COLORS[product?.tag] || TAG_COLORS['NEW'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: 1000 }}
    >
      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} className="relative h-full">
        <div
          className="relative h-full rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(10,10,20,0.95) 0%, rgba(5,5,15,0.98) 100%)',
            border: `1px solid ${hovered ? product?.accentColor : 'rgba(255,255,255,0.07)'}`,
            boxShadow: hovered
              ? `0 0 40px ${product?.glowColor}, 0 0 80px ${product?.glowColor?.replace('0.35', '0.15')}, inset 0 0 30px rgba(148,0,255,0.06)`
              : '0 4px 24px rgba(0,0,0,0.6), inset 0 0 20px rgba(148,0,255,0.03)',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="shimmer"
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: '200%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(105deg, transparent 30%, ${product?.accentColor?.replace(')', ', 0.12)')} 50%, transparent 70%)`,
                  width: '60%',
                }}
              />
            )}
          </AnimatePresence>

          <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-20">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: product?.accentColor }} />
            <div className="absolute top-0 left-0 h-full w-px" style={{ background: product?.accentColor }} />
          </div>
          <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none z-20">
            <div className="absolute top-0 right-0 w-full h-px" style={{ background: product?.accentColor }} />
            <div className="absolute top-0 right-0 h-full w-px" style={{ background: product?.accentColor }} />
          </div>
          <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none z-20">
            <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: product?.accentColor }} />
            <div className="absolute bottom-0 left-0 h-full w-px" style={{ background: product?.accentColor }} />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none z-20">
            <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: product?.accentColor }} />
            <div className="absolute bottom-0 right-0 h-full w-px" style={{ background: product?.accentColor }} />
          </div>

          <motion.div animate={hovered ? { scale: 1.03 } : { scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="relative overflow-hidden" style={{ height: '240px' }}>
            {!imgError ? (
              <img
                src={resolveImageSrc(product?.image) || ''}
                alt={product?.name}
                onError={() => setImgError(true)}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{
                  filter: hovered
                    ? `brightness(0.85) saturate(1.3) drop-shadow(0 0 20px ${product?.accentColor})`
                    : 'brightness(0.65) saturate(1.1)',
                  transition: 'filter 0.5s ease',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0a14 0%, #050510 100%)' }}>
                <Box className="w-16 h-16" style={{ color: product?.accentColor, opacity: 0.4 }} />
              </div>
            )}

            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(5,5,15,1) 0%, rgba(5,5,15,0.5) 40%, transparent 100%)` }} />

            <div className="absolute top-4 left-4 z-10">
              <span className="text-xs font-bold tracking-widest px-3 py-1 rounded" style={{ fontFamily: 'Orbitron, sans-serif', color: tagStyle.text, border: `1px solid ${tagStyle.border}`, background: tagStyle.bg, letterSpacing: '0.15em' }}>
                {product?.tag}
              </span>
            </div>
          </motion.div>

          <div className="p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-xs tracking-widest uppercase" style={{ color: product?.accentColor, fontFamily: 'Space Grotesk, sans-serif', opacity: 0.8 }}>{product?.subtitle}</p>
              <h3 className="text-xl font-bold leading-tight" style={{ fontFamily: 'Orbitron, sans-serif', color: '#F0F4FF' }}>{product?.name}</h3>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'rgba(180,190,220,0.75)', fontFamily: 'Space Grotesk, sans-serif' }}>{product?.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product?.features?.map((feat, fi) => {
                const FeatIcon = Icons[feat?.icon] || Icons['HelpCircle'];
                return (
                  <motion.div key={fi} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 + fi * 0.06, ease: 'easeOut', duration: 0.4 }} className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: product?.accentColor, boxShadow: `0 0 6px ${product?.accentColor}` }} />
                    <FeatIcon className="w-3 h-3 flex-shrink-0" style={{ color: product?.accentColor }} />
                    <span className="text-xs" style={{ color: 'rgba(160,175,210,0.85)', fontFamily: 'Space Grotesk, sans-serif' }}>{feat?.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${product?.accentColor}40, transparent)` }} />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(120,140,180,0.6)', fontFamily: 'Space Grotesk, sans-serif' }}>Starting at</p>
                <p className="text-2xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif', color: product?.accentColor }}>{product?.price}</p>
              </div>

              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide" style={{ fontFamily: 'Space Grotesk, sans-serif', background: hovered ? `linear-gradient(135deg, ${product?.accentColor}22 0%, ${product?.accentColor}11 100%)` : 'rgba(255,255,255,0.04)', border: `1px solid ${product?.accentColor}55`, color: product?.accentColor, transition: 'background 0.3s ease' }} aria-label={`Explore ${product?.name}`}>
                Explore
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.div key="circuit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{ background: `linear-gradient(to right, transparent, ${product?.accentColor}, transparent)`, boxShadow: `0 0 12px ${product?.accentColor}` }} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductsGrid() {
  return (
    <section id="products" className="relative w-full py-28 px-4 md:px-8 lg:px-16 overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, #03040f 50%, #000000 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 'min(92vw, 800px)', height: 'min(92vw, 800px)', background: 'radial-gradient(ellipse at center, rgba(0,136,255,0.06) 0%, rgba(148,0,255,0.04) 40%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex flex-col items-center text-center mb-20 gap-5">
          <div className="flex items-center gap-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #00FFFF)' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: '#00FFFF', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.25em' }}>Product Line</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #00FFFF)' }} />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: 'Orbitron, sans-serif', color: '#F0F4FF', textShadow: '0 0 60px rgba(0,255,255,0.15)' }}>
            LIMITLESS
            <span className="block" style={{ background: 'linear-gradient(90deg, #00FFFF, #0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HARDWARE</span>
          </h2>

          <p className="max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: 'rgba(160,175,220,0.7)', fontFamily: 'Space Grotesk, sans-serif' }}>
            Precision-engineered robotic systems built for researchers, engineers, and visionaries who refuse to settle for ordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {PRODUCTS?.map((product, index) => (
            <ProductCard key={product?.id} product={product} index={index} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-20">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-10 py-4 rounded-xl font-semibold tracking-wider text-sm" style={{ fontFamily: 'Orbitron, sans-serif', background: 'linear-gradient(135deg, #00FFFF 0%, #0088FF 100%)', color: '#000', boxShadow: '0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(0,136,255,0.15)', letterSpacing: '0.1em' }} aria-label="View all products">
            View Full Catalog
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-10 py-4 rounded-xl font-semibold tracking-wider text-sm" style={{ fontFamily: 'Orbitron, sans-serif', background: 'transparent', color: '#00FFFF', border: '1px solid rgba(0,255,255,0.35)', letterSpacing: '0.1em' }} aria-label="Request a custom build">
            Request Custom Build
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductsGrid;

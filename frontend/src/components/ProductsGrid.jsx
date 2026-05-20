import { useState } from 'react';
import { motion } from 'framer-motion';
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

const PRODUCTS = [
  {
    id: 1,
    tag: 'Flagship',
    name: 'LR-X9 Humanoid Core',
    subtitle: 'Next-Gen AI Robot Kit',
    description:
      'Full-stack humanoid robotics platform with embedded neural inference engine, 32-DoF articulation, and real-time sensorimotor fusion.',
    image: advancedAiRobotImg,
    price: '$12,400',
    features: [
      { icon: 'Cpu', label: 'Neural Inference Engine' },
      { icon: 'Activity', label: '32-DoF Articulation' },
      { icon: 'Wifi', label: 'Mesh Network Ready' },
      { icon: 'Shield', label: 'Hardened OS' },
    ],
  },
  {
    id: 2,
    tag: 'New release',
    name: 'AeroDrone MK-IV',
    subtitle: 'Autonomous Aerial Module',
    description:
      'Precision-engineered autonomous UAV with LiDAR-vision fusion, edge AI navigation, and sub-10ms response latency.',
    image: droneImg,
    price: '$7,800',
    features: [
      { icon: 'Eye', label: 'LiDAR-Vision Fusion' },
      { icon: 'Zap', label: 'Sub-10ms Latency' },
      { icon: 'Cpu', label: 'Edge AI Navigator' },
      { icon: 'Wifi', label: '5G Telemetry' },
    ],
  },
  {
    id: 3,
    tag: 'Professional',
    name: 'ExoFrame Sigma',
    subtitle: 'Powered Exoskeleton Suit',
    description:
      'Augmentation-grade powered exoskeleton for industrial and research applications. Adaptive torque control with biometric feedback loops.',
    image: exoskeletonImg,
    price: '$23,900',
    features: [
      { icon: 'Shield', label: 'Adaptive Torque Control' },
      { icon: 'Activity', label: 'Biometric Feedback' },
      { icon: 'Cpu', label: 'Force Amplification' },
      { icon: 'Zap', label: 'Rapid Charge Cell' },
    ],
  },
  {
    id: 4,
    tag: 'Industrial',
    name: 'MechArm Pro 7X',
    subtitle: 'Precision Robotic Arm',
    description:
      'Heavy-payload 7-axis robotic arm with sub-millimeter repeatability, vision-guided assembly, and zero-downtime firmware updates.',
    image: robotArmImg,
    price: '$9,600',
    features: [
      { icon: 'Eye', label: 'Vision-Guided Assembly' },
      { icon: 'Activity', label: '±0.01mm Repeatability' },
      { icon: 'Shield', label: '7-Axis Freedom' },
      { icon: 'Zap', label: 'OTA Firmware' },
    ],
  },
  {
    id: 5,
    tag: 'Enterprise',
    name: 'AutoCell Infinity',
    subtitle: 'Industrial Automation Cell',
    description:
      'Modular factory automation ecosystem with collaborative robot cells, AI quality inspection, and real-time production analytics.',
    image: industrialImg,
    price: '$48,000',
    features: [
      { icon: 'Box', label: 'Modular Cell Design' },
      { icon: 'Cpu', label: 'AI Quality Inspection' },
      { icon: 'Activity', label: 'Real-Time Analytics' },
      { icon: 'Wifi', label: 'Cloud Integration' },
    ],
  },
];

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      className="relative rounded-3xl overflow-hidden bg-white border border-neutral-100 shadow-sm luxury-card-hover flex flex-col cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[1.5/1] bg-neutral-50 flex-shrink-0">
        {!imgError ? (
          <img
            src={resolveImageSrc(product?.image) || ''}
            alt={product?.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-750 ease-out"
            style={{ transform: hovered ? 'scale(1.02)' : 'scale(1)' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400">
            <span className="text-xs uppercase tracking-widest font-semibold font-outfit">Product Preview</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span
            className="text-[9px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-neutral-700 shadow-sm"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {product?.tag}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-6 gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <h3
              className="text-lg font-bold text-neutral-900 tracking-tight font-outfit"
            >
              {product?.name}
            </h3>
            <span
              className="text-xs text-neutral-450 mt-0.5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {product?.subtitle}
            </span>
          </div>
          <span
            className="text-base font-light text-neutral-900 tracking-tight font-outfit"
          >
            {product?.price}
          </span>
        </div>

        <p
          className="text-xs sm:text-sm text-neutral-550 leading-relaxed font-light"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {product?.description}
        </p>

        <div className="h-px bg-neutral-100 w-full" />

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {product?.features?.map((feature, i) => {
            const FeatIcon = Icons[feature?.icon] || Icons['HelpCircle'];
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-neutral-55 flex items-center justify-center text-neutral-500">
                  <FeatIcon size={10} strokeWidth={1.5} />
                </div>
                <span
                  className="text-[11px] text-neutral-500 font-light truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {feature?.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Order CTA */}
        <button
          className="w-full py-2.5 mt-2 text-center text-xs font-semibold tracking-wider uppercase text-white bg-black hover:bg-neutral-850 rounded-full transition-colors duration-300 font-outfit flex items-center justify-center gap-1.5"
        >
          Inquire Now
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductsGrid() {
  return (
    <section
      id="products"
      className="relative w-full py-24 md:py-32 bg-transparent"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Clean Header */}
        <div className="text-center mb-20">
          <p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-405 mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Sovereign Hardware
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Next-generation <span className="font-playfair font-light italic text-neutral-550">industrial modules</span>.
          </h2>
          <p
            className="mt-4 text-sm md:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Deploy enterprise-grade robotics and control modules engineered for reliability, high payload assistance, and spatial computing.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product?.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

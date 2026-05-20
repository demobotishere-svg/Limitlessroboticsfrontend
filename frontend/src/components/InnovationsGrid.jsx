import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import advancedAiRobotImg from '../assets/advanced_ai_robot_humanoid.jpg';
import droneImg from '../assets/drone_technology_futuristic.jpg';
import exoskeletonImg from '../assets/futuristic_robot_exoskeleton_dark.jpg';
import industrialImg from '../assets/industrial_automation_robotics.jpg';

const resolveImageSrc = (image) => (typeof image === 'object' && image !== null ? image.src : image);

const INNOVATIONS = [
  {
    id: 1,
    title: 'Nexus-7 Humanoid AI',
    description: 'A fully autonomous bipedal humanoid powered by our proprietary NeuroCore architecture, capable of adaptive reasoning and real-time environmental mapping.',
    image: advancedAiRobotImg,
    tag: 'Humanoid Robotics',
    highlights: [
      'NeuroCore cognitive engine — 40 TOPS',
      'Adaptive bipedal locomotion at 2.4 m/s',
      'Natural language task execution',
      '360° lidar + vision fusion',
    ],
    icon: 'BrainCircuit',
  },
  {
    id: 2,
    title: 'AeroSync Drone Swarm',
    description: 'Decentralized swarm intelligence enabling synchronized multi-drone operations across logistics, surveillance, and precision delivery networks.',
    image: droneImg,
    tag: 'Aerial Systems',
    highlights: [
      'Swarm coordination up to 256 units',
      'Sub-5ms inter-node latency',
      'Autonomous collision avoidance',
      'Encrypted mesh communication',
    ],
    icon: 'RadioTower',
  },
  {
    id: 3,
    title: 'ExoFrame X1 Suit',
    description: 'Powered exoskeleton framework engineered for industrial augmentation, delivering superhuman load capacity with zero-fatigue biomechanical feedback.',
    image: exoskeletonImg,
    tag: 'Biomechanical',
    highlights: [
      '400kg assisted load capacity',
      'Biometric haptic feedback loop',
      'Carbon-titanium composite frame',
      '16-hour operational endurance',
    ],
    icon: 'PersonStanding',
  },
  {
    id: 4,
    title: 'AutoForge Industrial Arm',
    description: 'A seven-axis precision robotic arm with sub-millimeter repeatability, designed for high-throughput manufacturing and micro-assembly environments.',
    image: industrialImg,
    tag: 'Industrial Automation',
    highlights: [
      '±0.02mm positional accuracy',
      'Force-torque adaptive grip',
      'Hot-swappable end effectors',
      'ISO 10218-1 safety certified',
    ],
    icon: 'Cog',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/** @type {import('framer-motion').Variants} */
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function InnovationCard({ innovation }) {
  const [hovered, setHovered] = useState(false);
  const TagIcon = Icons[innovation?.icon] || Icons['HelpCircle'];

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-3xl bg-white border border-neutral-100/70 shadow-sm luxury-card-hover cursor-default"
    >
      <div className="relative overflow-hidden aspect-[1.4/1] flex-shrink-0 bg-neutral-100">
        <img
          src={resolveImageSrc(innovation?.image)}
          alt={innovation?.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/600x400/f5f5f7/1d1d1f?text=${encodeURIComponent(innovation?.title ?? 'Innovation')}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent" />
        
        {/* Floating Category Tag */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[9px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-neutral-850 shadow-sm"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {innovation?.tag}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3
              className="text-lg font-bold text-neutral-900 tracking-tight font-outfit"
            >
              {innovation?.title}
            </h3>
            <div className="w-6 h-6 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 flex-shrink-0">
              <TagIcon size={12} strokeWidth={1.5} />
            </div>
          </div>
          <p
            className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {innovation?.description}
          </p>
        </div>

        <div className="h-px bg-neutral-100 w-full" />

        <ul className="flex flex-col gap-2">
          {innovation?.highlights?.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-neutral-300 mt-2 flex-shrink-0" />
              <span
                className="text-xs text-neutral-500 leading-relaxed font-light"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function InnovationsGrid() {
  return (
    <section
      id="innovations"
      className="relative w-full py-24 md:py-32 bg-transparent"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Clean Header */}
        <div className="text-center mb-20">
          <p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-405 mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Core Pillars
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Forging the next era of <span className="font-playfair font-light italic text-neutral-550">autonomous capabilities</span>.
          </h2>
          <p
            className="mt-4 text-sm md:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore our state-of-the-art technological systems, designed to augment human potential and secure operational excellence.
          </p>
        </div>

        {/* Innovations Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {INNOVATIONS.map((innovation) => (
            <InnovationCard key={innovation?.id} innovation={innovation} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

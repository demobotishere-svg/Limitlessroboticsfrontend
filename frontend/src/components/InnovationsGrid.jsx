import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    tag: 'HUMANOID',
    accentColor: '#00FFFF',
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
    tag: 'AERIAL',
    accentColor: '#0088FF',
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
    tag: 'EXOSKELETON',
    accentColor: '#9400FF',
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
    tag: 'INDUSTRIAL',
    accentColor: '#00FFFF',
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
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const highlightVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const highlightItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

function CornerFrame({ accentColor }) {
  return (
    <>
      <span
        className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 pointer-events-none"
        style={{}}
      />
      <span
        className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 pointer-events-none"
      />
      <span
        className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 pointer-events-none"
      />
      <span
        className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 pointer-events-none"
      />
    </>
  );
}

function InnovationCard({ innovation, index }) {
  const [hovered, setHovered] = useState(false);

  const ZapIcon = Icons['Zap'] || Icons['HelpCircle'];
  const TagIcon = Icons[innovation?.icon] || Icons['HelpCircle'];

  const accent = innovation?.accentColor ?? '#00FFFF';

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group flex flex-col overflow-hidden rounded-2xl cursor-default"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        animate={{
          boxShadow: hovered
            ? `0 0 0 1.5px ${accent}88, 0 0 32px ${accent}44, inset 0 0 24px ${accent}18`
            : `0 0 0 1px ${accent}33, 0 0 0px ${accent}00, inset 0 0 0px ${accent}00`,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: `linear-gradient(135deg, ${accent}08 0%, transparent 50%, ${accent}05 100%)`,
        }}
      />

      <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 z-20 rounded-tl-lg pointer-events-none" style={{ borderColor: `${accent}99` }} />
      <div className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 z-20 rounded-tr-lg pointer-events-none" style={{ borderColor: `${accent}99` }} />
      <div className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 z-20 rounded-bl-lg pointer-events-none" style={{ borderColor: `${accent}99` }} />
      <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 z-20 rounded-br-lg pointer-events-none" style={{ borderColor: `${accent}99` }} />

      <div
        className="relative flex flex-col h-full"
        style={{
          background: 'linear-gradient(160deg, rgba(10,12,20,0.97) 0%, rgba(6,8,16,0.99) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
        }}
      >
        <div className="relative overflow-hidden rounded-t-2xl h-52 flex-shrink-0">
          <img
            src={resolveImageSrc(innovation?.image)}
            alt={innovation?.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/600x400/0a0c14/00FFFF?text=${encodeURIComponent(innovation?.title ?? 'Innovation')}`;
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 30%, rgba(6,8,16,0.95) 100%)`,
            }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? ['-100%', '100%'] : '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              background: `linear-gradient(105deg, transparent 30%, ${accent}22 50%, transparent 70%)`,
            }}
          />
          <div className="absolute top-3 left-3 z-10">
            <span
              className="font-mono text-xs tracking-widest px-3 py-1 rounded border"
              style={{
                color: accent,
                borderColor: `${accent}55`,
                background: `${accent}11`,
                fontFamily: 'Orbitron, sans-serif',
              }}
            >
              {innovation?.tag}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}
            >
              <TagIcon size={16} style={{ color: accent }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-6 gap-4">
          <div>
            <motion.h3
              className="text-xl font-bold tracking-wide mb-2"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                color: hovered ? accent : '#E8F4FF',
              }}
              animate={{ color: hovered ? accent : '#E8F4FF' }}
              transition={{ duration: 0.3 }}
            >
              {innovation?.title}
            </motion.h3>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'rgba(180,200,220,0.72)',
              }}
            >
              {innovation?.description}
            </p>
          </div>

          <div
            className="w-full h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}44, transparent)` }}
          />

          <AnimatePresence>
            <motion.ul
              variants={highlightVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2"
            >
              {innovation?.highlights?.map((highlight, i) => (
                <motion.li
                  key={i}
                  variants={highlightItemVariants}
                  className="flex items-start gap-2.5"
                >
                  <ZapIcon
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: accent }}
                  />
                  <span
                    className="text-xs leading-relaxed"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      color: 'rgba(160,185,210,0.85)',
                    }}
                  >
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function InnovationsGrid() {
  const CircuitBoardIcon = Icons['CircuitBoard'] || Icons['HelpCircle'];
  const SparklesIcon = Icons['Sparkles'] || Icons['HelpCircle'];

  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #00FFFF44, #0088FF44, transparent)',
        }}
      />
      <div
        className="absolute -top-40 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,136,255,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute -top-20 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(148,0,255,0.06) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <CircuitBoardIcon size={16} style={{ color: '#00FFFF' }} />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                color: '#00FFFF',
              }}
            >
              Core Innovations
            </span>
            <SparklesIcon size={16} style={{ color: '#00FFFF' }} />
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#FFFFFF',
              textShadow: '0 0 40px rgba(0,255,255,0.2)',
            }}
          >
            Engineering
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #00FFFF, #0088FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              the Future
            </span>
          </h2>

          <p
            className="text-base md:text-lg max-w-2xl"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              color: 'rgba(160,185,210,0.75)',
              lineHeight: '1.75',
            }}
          >
            Breakthrough robotic systems pushing the boundaries of autonomy, precision, and human augmentation — engineered for the next frontier.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7"
        >
          {INNOVATIONS.map((innovation, index) => (
            <InnovationCard key={innovation?.id} innovation={innovation} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div
            className="w-64 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, #00FFFF55, #0088FF55, transparent)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default InnovationsGrid;

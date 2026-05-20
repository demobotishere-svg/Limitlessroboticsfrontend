import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const COURSES = [
  {
    id: 1,
    icon: 'Cpu',
    title: 'AI & Machine Learning',
    description: 'Master neural architectures, deep learning pipelines, and intelligent robotic perception systems built for real-world deployment.',
    tag: 'Advanced',
    modules: 24,
    duration: '12 weeks',
  },
  {
    id: 2,
    icon: 'Bot',
    title: 'Humanoid Robotics',
    description: 'Engineer bipedal locomotion, full-body kinematics, and sensorimotor integration for next-generation humanoid platforms.',
    tag: 'Expert',
    modules: 18,
    duration: '10 weeks',
  },
  {
    id: 3,
    icon: 'Zap',
    title: 'Exoskeleton Systems',
    description: 'Design and prototype wearable robotic exoskeletons integrating force control, bio-signal feedback, and adaptive actuation.',
    tag: 'Expert',
    modules: 20,
    duration: '11 weeks',
  },
  {
    id: 4,
    icon: 'Radio',
    title: 'Drone Engineering',
    description: 'Build autonomous aerial systems with real-time SLAM navigation, swarm coordination, and edge AI inference onboard.',
    tag: 'Intermediate',
    modules: 16,
    duration: '8 weeks',
  },
  {
    id: 5,
    icon: 'Layers',
    title: 'Industrial Automation',
    description: 'Program collaborative robotic arms, PLC integration, and smart factory digital-twin architectures for Industry 5.0.',
    tag: 'Intermediate',
    modules: 14,
    duration: '7 weeks',
  },
  {
    id: 6,
    icon: 'Shield',
    title: 'Robotic Safety & Ethics',
    description: 'Navigate ISO compliance, fail-safe control architectures, and the ethical frameworks governing autonomous machine decisions.',
    tag: 'Foundational',
    modules: 10,
    duration: '5 weeks',
  },
];

const TAG_COLORS = {
  Advanced: 'text-cyan-300 border-cyan-400/40 bg-cyan-400/10',
  Expert: 'text-violet-300 border-violet-400/40 bg-violet-400/10',
  Intermediate: 'text-blue-300 border-blue-400/40 bg-blue-400/10',
  Foundational: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10',
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function CourseCard({ course }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const IconComp = Icons[course?.icon] || Icons['HelpCircle'];
  const ModulesIcon = Icons['BookOpen'] || Icons['HelpCircle'];
  const ClockIcon = Icons['Clock'] || Icons['HelpCircle'];

  function handleMouseLeave() {
    setHovered(false);
  }

  const tagClass = TAG_COLORS[course?.tag] || 'text-gray-300 border-gray-500/30 bg-gray-500/10';

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? '0 0 0 1.5px rgba(0,255,255,0.55), 0 0 32px rgba(0,255,255,0.18), 0 0 80px rgba(0,136,255,0.12), inset 0 0 24px rgba(0,255,255,0.04)'
            : '0 0 0 1px rgba(0,255,255,0.12), 0 8px 40px rgba(0,0,0,0.6), inset 0 0 0px rgba(0,255,255,0)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative h-full rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] p-8 flex flex-col gap-6 overflow-hidden"
      >
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(0,255,255,0.025) 0px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(0,255,255,0.025) 0px, transparent 1px, transparent 28px)',
              backgroundSize: '28px 28px',
            }}
          />
        )}

        <motion.div
          animate={{
            scale: hovered ? 1.06 : 1,
            filter: hovered
              ? 'drop-shadow(0 0 10px rgba(0,255,255,0.6))'
              : 'drop-shadow(0 0 0px rgba(0,255,255,0))',
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center bg-cyan-400/[0.07] border border-cyan-400/20"
        >
          <IconComp className="w-7 h-7 text-cyan-400" strokeWidth={1.5} />
        </motion.div>

        <div className="relative z-10 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3
              className="font-orbitron text-base font-semibold text-white leading-snug tracking-wide"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {course?.title}
            </h3>
            <span
              className={`shrink-0 text-[10px] font-semibold tracking-widest uppercase border rounded-full px-2.5 py-0.5 ${tagClass}`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {course?.tag}
            </span>
          </div>

          <p
            className="text-sm text-gray-400 leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {course?.description}
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-5 pt-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-gray-500">
            <ModulesIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span
              className="text-xs text-gray-400"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {course?.modules} modules
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
            <span
              className="text-xs text-gray-400"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {course?.duration}
            </span>
          </div>
          <motion.div
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="ml-auto flex items-center gap-1 text-cyan-400"
          >
            {(() => {
              const ArrowIcon = Icons['ArrowRight'] || Icons['HelpCircle'];
              return <ArrowIcon className="w-4 h-4" strokeWidth={1.5} />;
            })()}
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20"
          animate={{
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              'linear-gradient(135deg, rgba(0,255,255,0.04) 0%, transparent 50%, rgba(0,136,255,0.04) 100%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function CoursesGrid() {
  const ChevronRight = Icons['ChevronRight'] || Icons['HelpCircle'];
  const GraduationCap = Icons['GraduationCap'] || Icons['HelpCircle'];

  return (
    <section
      id="courses"
      className="relative w-full py-28 md:py-36 overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 50% at 20% 0%, rgba(0,255,255,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,136,255,0.06) 0%, transparent 60%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, transparent 1px, transparent 60px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-16 md:mb-20 gap-5"
        >
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] backdrop-blur-sm">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
            <span
              className="text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-400"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Learn with Limitless
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-3xl"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Educational Pathways
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #00FFFF 0%, #0088FF 50%, #9400FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              for the Machine Age
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="max-w-xl px-6 py-4 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md"
          >
            <p
              className="text-sm md:text-base text-gray-400 leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              From foundational robotics to cutting-edge exoskeleton engineering — our curriculum is crafted by world-class researchers and industry pioneers.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {COURSES.map((course) => (
            <CourseCard key={course?.id} course={course} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex justify-center mt-14 md:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm tracking-widest uppercase text-black"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(90deg, #00FFFF 0%, #0088FF 100%)',
              boxShadow: '0 0 24px rgba(0,255,255,0.3), 0 0 60px rgba(0,136,255,0.15)',
            }}
          >
            Explore All Courses
            <ChevronRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default CoursesGrid;

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** @type {import('framer-motion').Variants} */
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function CourseCard({ course }) {
  const IconComp = Icons[course?.icon] || Icons['HelpCircle'];
  const ModulesIcon = Icons['BookOpen'] || Icons['HelpCircle'];
  const ClockIcon = Icons['Clock'] || Icons['HelpCircle'];

  return (
    <motion.div
      variants={cardVariants}
      className="relative rounded-3xl border border-neutral-100 bg-white p-8 flex flex-col justify-between gap-6 shadow-sm luxury-card-hover cursor-default h-full"
    >
      <div className="flex flex-col gap-4">
        {/* Category Tag & Icon */}
        <div className="flex items-center justify-between">
          <span
            className="text-[9px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full bg-neutral-50 text-neutral-600 border border-neutral-100"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {course?.tag}
          </span>
          <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-750">
            <IconComp size={14} strokeWidth={1.5} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-2">
          <h3
            className="text-lg font-bold text-neutral-900 tracking-tight font-outfit"
          >
            {course?.title}
          </h3>
          <p
            className="text-xs sm:text-sm text-neutral-550 leading-relaxed font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {course?.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="h-px bg-neutral-100 w-full" />
        
        {/* Modules & Duration */}
        <div className="flex items-center gap-4 text-xs text-neutral-455 font-light font-inter">
          <div className="flex items-center gap-1.5">
            <ModulesIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>{course?.modules} Modules</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>{course?.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoursesGrid() {
  return (
    <section
      id="courses"
      className="relative w-full py-24 md:py-32 bg-transparent"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Clean Header */}
        <div className="text-center mb-20">
          <p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-405 mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Limitless Academy
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Develop critical <span className="font-playfair font-light italic text-neutral-550">engineering expertise</span>.
          </h2>
          <p
            className="mt-4 text-sm md:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Structured curriculums designed to master the fundamentals and edge cases of bipedal locomotion, autonomy, and neural motor fusion.
          </p>
        </div>

        {/* Courses Cards Grid */}
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
      </div>
    </section>
  );
}

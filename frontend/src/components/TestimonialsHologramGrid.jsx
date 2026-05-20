import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Dr. Aiko Tanaka',
    role: 'Chief Robotics Engineer',
    company: 'NovaSynth Industries',
    quote: 'Limitless Robotics redefined what I thought possible in autonomous systems. Their exoskeleton integration framework is a decade ahead of anything else on the market.',
    tag: 'Exoskeleton Systems',
  },
  {
    id: 2,
    name: 'Marcus Veld',
    role: 'Director of AI Operations',
    company: 'QuantumEdge Labs',
    quote: 'The neural-mesh control suite delivered precision we have never achieved at scale. Implementation was seamless, and their support team operates like a surgical unit.',
    tag: 'Neural Interface',
  },
  {
    id: 3,
    name: 'Isabelle Morea',
    role: 'VP of Industrial Automation',
    company: 'Arcturus Manufacturing',
    quote: 'Deployment of their robotic arm clusters cut our cycle time by 62%. Limitless is not a partner who sells components — they are an engineering partner who thinks in systems.',
    tag: 'Industrial Automation',
  },
  {
    id: 4,
    name: 'Reza Khalid',
    role: 'Founder & CTO',
    company: 'StellarDrone Corp',
    quote: 'Their drone intelligence stack is the backbone of our autonomous fleet. The simulation and training environments alone are worth the entire investment.',
    tag: 'Drone Systems',
  },
];

const QuoteIcon = Icons['Quote'] || Icons['HelpCircle'];

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      className="relative rounded-3xl bg-white p-8 flex flex-col justify-between gap-6 border border-neutral-100/70 shadow-sm luxury-card-hover cursor-default"
    >
      <div className="flex flex-col gap-4">
        {/* Quote Mark & Quote Text */}
        <QuoteIcon className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
        <p
          className="text-sm sm:text-base text-neutral-700 leading-relaxed font-light italic font-inter"
        >
          &ldquo;{testimonial?.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mt-2">
        {/* User Info */}
        <div className="flex flex-col">
          <h4
            className="text-sm font-bold text-neutral-900 font-outfit"
          >
            {testimonial?.name}
          </h4>
          <span
            className="text-xs text-neutral-450 mt-0.5 font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {testimonial?.role} — {testimonial?.company}
          </span>
        </div>

        {/* Tag */}
        <span
          className="text-[9px] font-semibold tracking-[0.15em] uppercase text-neutral-400 font-outfit"
        >
          {testimonial?.tag}
        </span>
      </div>
    </motion.div>
  );
}

export default function TestimonialsHologramGrid() {
  return (
    <section
      id="testimonials"
      className="relative w-full py-24 md:py-32 bg-transparent"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Clean Header */}
        <div className="text-center mb-20">
          <p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-405 mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Customer Stories
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Trusted by visionary <span className="font-playfair font-light italic text-neutral-550">engineering leaders</span>.
          </h2>
          <p
            className="mt-4 text-sm md:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Read how leading global manufacturers and hardware innovators integrate Limitless platforms to pioneer autonomy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial?.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const NAV_LINKS = [
  { label: 'COURSES', href: '#courses' },
  { label: 'PRODUCTS', href: '#products' },
  { label: 'SERVICES', href: '#services' },
  { label: 'CONTACT', href: '#contact' },
];

const SOCIAL_LINKS = [
  { name: 'Twitter', icon: 'Twitter', href: '#' },
  { name: 'Github', icon: 'Github', href: '#' },
  { name: 'Linkedin', icon: 'Linkedin', href: '#' },
  { name: 'Youtube', icon: 'Youtube', href: '#' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function CircuitLine({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        d="M0 20 H60 L80 5 H140 L160 20 H220 L240 35 H300 L320 20 H400"
        stroke="#00FFFF"
        strokeWidth="0.8"
        strokeOpacity="0.4"
        strokeDasharray="600"
        strokeDashoffset="600"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 0 }}
      />
      <motion.circle cx="80" cy="5" r="2" fill="#00FFFF"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle cx="160" cy="20" r="2" fill="#0088FF"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.circle cx="240" cy="35" r="2" fill="#9400FF"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.circle cx="320" cy="20" r="2" fill="#00FFFF"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
    </svg>
  );
}

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="relative w-full overflow-hidden bg-black border-t border-cyan-500/20">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div
          className="absolute inset-0 opacity-5"
          style={{}}
        />
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-violet-600/5 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/2 w-96 h-32 rounded-full bg-blue-600/8 blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">

        <div className="pt-1">
          <CircuitLine className="w-full h-10" />
        </div>

        <div
          className="absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-cyan-400/60 to-transparent"
        />
        <div
          className="absolute top-0 right-0 w-px h-24 bg-gradient-to-b from-violet-400/60 to-transparent"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-12 md:py-16"
        >
          <div className="flex flex-col items-center gap-10">

            <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
              <span
                className="text-2xl md:text-3xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                LIMITLESS
              </span>
              <span
                className="text-xs tracking-[0.4em] uppercase text-cyan-500/70"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ROBOTICS
              </span>
              <div className="mt-1 w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </motion.div>

            <motion.nav
              variants={itemVariants}
              aria-label="Footer navigation"
              className="flex flex-wrap justify-center gap-6 md:gap-10"
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="relative text-xs tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors duration-300 pb-1 group"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
              aria-label="Social media links"
            >
              {SOCIAL_LINKS.map((social) => {
                const SocialIcon = Icons[social.icon] || Icons['HelpCircle'];
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="relative w-10 h-10 flex items-center justify-center rounded-full border border-cyan-500/20 bg-white/5 backdrop-blur-sm text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-cyan-400/10 transition-opacity duration-300" />
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_12px_2px_rgba(0,255,255,0.2)] transition-opacity duration-300" />
                    <SocialIcon size={15} strokeWidth={1.5} />
                  </motion.a>
                );
              })}
            </motion.div>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-xs text-zinc-600 tracking-widest"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            &copy; {year} LIMITLESS ROBOTICS. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-zinc-600 hover:text-cyan-400/80 tracking-widest transition-colors duration-300"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

      </div>

      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

    </footer>
  );
}

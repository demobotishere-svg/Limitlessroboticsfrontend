import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const NAV_LINKS = [
  { label: 'Courses', href: '#courses' },
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
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

/** @type {import('framer-motion').Variants} */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** @type {import('framer-motion').Variants} */
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="relative w-full overflow-hidden bg-white border-t border-neutral-100">
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center gap-10"
        >
          {/* Brand Heading */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 leading-none">
              <span
                className="text-base font-bold tracking-[0.25em] uppercase text-black"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Limitless
              </span>
              <span
                className="text-base font-light tracking-[0.25em] uppercase text-neutral-400"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Robotics
              </span>
            </div>
          </motion.div>

          {/* Nav Links */}
          <motion.nav
            variants={itemVariants}
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-8 md:gap-10"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-neutral-500 hover:text-black transition-colors duration-300"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Socials */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5"
            aria-label="Social media links"
          >
            {SOCIAL_LINKS.map((social) => {
              const SocialIcon = Icons[social.icon] || Icons['HelpCircle'];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full border border-neutral-100 bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-100 transition-all duration-300"
                >
                  <SocialIcon size={13} strokeWidth={1.5} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Bottom Legal Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="border-t border-neutral-100 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-[10px] tracking-[0.18em] uppercase text-neutral-400"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            &copy; {year} Limitless Robotics. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] tracking-[0.12em] uppercase text-neutral-400 hover:text-black transition-colors duration-300"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  );
}

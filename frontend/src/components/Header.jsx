import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const NAV_LINKS = [
  { label: 'Courses', href: '#courses' },
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const MenuIcon = Icons['Menu'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];

function LogoBrand() {
  return (
    <a href="#" className="flex items-center gap-2 group" aria-label="Limitless Robotics Home">
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
    </a>
  );
}

function NavLink({ label, href, index }) {
  return (
    <motion.a
      href={href}
      className="relative text-[11px] font-medium tracking-[0.15em] uppercase text-neutral-600 hover:text-black transition-colors duration-300 px-1 py-1"
      style={{ fontFamily: "'Outfit', sans-serif" }}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {label}
    </motion.a>
  );
}

function CTAButton() {
  function handleClick() {
    const el = document.querySelector('#contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <motion.button
      onClick={handleClick}
      className="px-5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-white bg-black hover:bg-neutral-850 rounded-full transition-all duration-300"
      style={{
        fontFamily: "'Outfit', sans-serif",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
      whileTap={{ scale: 0.98 }}
      aria-label="Get in Touch"
    >
      Get in Touch
    </motion.button>
  );
}

function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col pt-24"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-white/98 backdrop-blur-2xl" />
          <div className="relative z-10 flex flex-col items-center gap-6 pt-8 px-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link?.href}
                onClick={onClose}
                className="text-lg font-light tracking-[0.2em] uppercase text-neutral-800 hover:text-black transition-colors duration-200 border-b border-neutral-100 hover:border-black/20 w-full text-center pb-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3, ease: 'easeOut' }}
              >
                {link?.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
              className="mt-4"
            >
              <CTAButton />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleMobile() {
    setMobileOpen(prev => !prev);
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-black/5 py-4'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        role="banner"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between gap-6">
          <LogoBrand />

          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main navigation">
            {NAV_LINKS.map((link, i) => (
              <NavLink key={link?.label} label={link?.label} href={link?.href} index={i} />
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <CTAButton />
          </div>

          <motion.button
            className="md:hidden relative w-9 h-9 flex items-center justify-center text-neutral-850 hover:text-black transition-colors duration-200 border border-neutral-200 rounded-full"
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <XIcon className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MenuIcon className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}

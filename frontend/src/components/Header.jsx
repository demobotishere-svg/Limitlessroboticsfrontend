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
const ZapIcon = Icons['Zap'] || Icons['HelpCircle'];

function CircuitPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 0 40 L 20 40 L 20 20 L 60 20 L 60 40 L 80 40" stroke="#00FFFF" strokeWidth="0.6" fill="none" />
          <path d="M 40 0 L 40 20" stroke="#0088FF" strokeWidth="0.6" fill="none" />
          <path d="M 40 60 L 40 80" stroke="#0088FF" strokeWidth="0.6" fill="none" />
          <circle cx="20" cy="40" r="2" fill="#00FFFF" />
          <circle cx="60" cy="20" r="2" fill="#0088FF" />
          <circle cx="40" cy="20" r="1.5" fill="#9400FF" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}

function LogoBrand() {
  return (
    <a href="#" className="flex items-center gap-3 group" aria-label="Limitless Robotics Home">
      <motion.div
        className="relative w-9 h-9 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border border-cyan-400 opacity-60" />
        <div className="absolute inset-1 rounded-full border border-blue-500 opacity-40" />
        <ZapIcon className="w-4 h-4 text-cyan-400 relative z-10" />
      </motion.div>
      <div className="flex flex-col leading-none">
        <span
          className="text-lg font-black tracking-widest uppercase text-white"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Limitless
        </span>
        <span
          className="text-xs font-bold tracking-[0.35em] uppercase text-cyan-400"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
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
      className="relative group text-xs font-black tracking-[0.2em] uppercase text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-1 py-1"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4, ease: 'easeOut' }}
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300 ease-out" />
      <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-500 ease-out opacity-40 blur-sm" />
    </motion.a>
  );
}

function CTAButton() {
  const [tapped, setTapped] = useState(false);

  function handleClick() {
    setTapped(true);
    setTimeout(() => setTapped(false), 600);
    const el = document.querySelector('#contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <motion.button
      onClick={handleClick}
      className="relative group overflow-hidden px-6 py-2.5 text-xs font-black tracking-[0.18em] uppercase text-white transition-all duration-300"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Get in Touch"
    >
      <span className="absolute inset-0 border border-blue-500 opacity-80" style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }} />
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-500/20 group-hover:from-blue-500/50 group-hover:to-cyan-400/30 transition-all duration-300" style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }} />
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          boxShadow: '0 0 24px 4px #0088FF88, 0 0 8px 2px #9400FF44'
        }}
      />
      <AnimatePresence>
        {tapped && (
          <motion.span
            className="absolute inset-0 bg-cyan-400/20"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-pulse" />
        Get in Touch
      </span>
    </motion.button>
  );
}

function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col pt-20"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
          <CircuitPattern />
          <div className="relative z-10 flex flex-col items-center gap-8 pt-12 px-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link?.href}
                onClick={onClose}
                className="text-xl font-black tracking-[0.25em] uppercase text-gray-200 hover:text-cyan-400 transition-colors duration-200 border-b border-gray-800 hover:border-cyan-400/40 w-full text-center pb-4"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.3, ease: 'easeOut' }}
              >
                {link?.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.3, ease: 'easeOut' }}
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

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-400/20'
            : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm border-b border-white/5'
        }`}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        role="banner"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <CircuitPattern />
          {scrolled && (
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
          )}
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between gap-6">
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
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-300 hover:text-cyan-400 transition-colors duration-200 border border-gray-700/60 hover:border-cyan-400/50 rounded"
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XIcon className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon className="w-5 h-5" />
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

export default Header;

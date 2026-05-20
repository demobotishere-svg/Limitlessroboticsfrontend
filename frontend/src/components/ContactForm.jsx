import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const SendIcon = Icons['Send'] || Icons['HelpCircle'];
const CheckCircleIcon = Icons['CheckCircle'] || Icons['HelpCircle'];
const AlertCircleIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
const UserIcon = Icons['User'] || Icons['HelpCircle'];
const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
const MessageSquareIcon = Icons['MessageSquare'] || Icons['HelpCircle'];

const INITIAL_FORM = { name: '', email: '', message: '' };
const INITIAL_ERRORS = { name: '', email: '', message: '' };

function validate(fields) {
  const errs = { name: '', email: '', message: '' };
  if (!fields.name?.trim()) errs.name = 'Name is required.';
  if (!fields.email?.trim()) errs.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email.';
  if (!fields.message?.trim()) errs.message = 'Message is required.';
  else if (fields.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
  return errs;
}

function hasErrors(errs) {
  return Object.values(errs).some(Boolean);
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [focused, setFocused] = useState('');
  const [status, setStatus] = useState('idle');
  const timerRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.currentTarget;
    const field = { ...form, [name]: value };
    const errs = validate(field);
    setErrors(prev => ({ ...prev, [name]: errs[name] }));
    setFocused('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (hasErrors(errs)) return;
    setStatus('loading');
    await new Promise(resolve => { timerRef.current = setTimeout(resolve, 1800); });
    setStatus('success');
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.12, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black py-24 px-4"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(0,136,255,0.10)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(0,255,255,0.07)_0%,transparent_70%)]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00FFFF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.div variants={itemVariants} className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-cyan-400 uppercase mb-3 font-outfit">Initiate Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{fontFamily: "'Orbitron', sans-serif"}}>
            Connect With
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Limitless
            </span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-400 max-w-md mx-auto leading-relaxed font-outfit">
            Whether you are a partner, investor, or pioneer—open a channel. Our systems are always listening.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl p-8 md:p-12 border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.07),0_0_0_1px_rgba(0,255,255,0.04)]"
        >
          <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute top-8 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
            <div className="absolute top-8 bottom-8 right-0 w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyan-400/50 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan-400/50 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan-400/50 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cyan-400/50 rounded-br-3xl" />
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center py-16 text-center gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 15, delay: 0.1 }}
                  className="relative flex items-center justify-center w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/40"
                >
                  <div className="absolute inset-0 rounded-full bg-cyan-400/10 animate-ping" />
                  <CheckCircleIcon className="w-9 h-9 text-cyan-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{fontFamily: "'Orbitron', sans-serif"}}>Transmission Received</h3>
                  <p className="text-gray-400 text-sm font-outfit max-w-xs mx-auto leading-relaxed">
                    Our systems have logged your signal. A Limitless engineer will respond within 24 hours.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStatus('idle')}
                  className="mt-2 px-6 py-2 rounded-xl border border-cyan-400/30 text-cyan-400 text-xs tracking-widest uppercase font-semibold font-outfit hover:bg-cyan-400/10 transition-colors duration-200"
                >
                  New Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-7"
              >
                <FieldGroup
                  id="name"
                  name="name"
                  label="Full Name"
                  type="text"
                  placeholder="Commander Reyes"
                  value={form.name}
                  error={errors.name}
                  focused={focused === 'name'}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={handleBlur}
                  Icon={UserIcon}
                />
                <FieldGroup
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="commander@limitless.io"
                  value={form.email}
                  error={errors.email}
                  focused={focused === 'email'}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={handleBlur}
                  Icon={MailIcon}
                />
                <TextAreaGroup
                  id="message"
                  name="message"
                  label="Message"
                  placeholder="Describe your mission or inquiry..."
                  value={form.message}
                  error={errors.message}
                  focused={focused === 'message'}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={handleBlur}
                  Icon={MessageSquareIcon}
                />

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.02, boxShadow: '0 0 32px rgba(0,255,255,0.35)' } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.18 }}
                  className="relative mt-2 w-full py-5 px-8 rounded-2xl font-bold text-sm tracking-[0.25em] uppercase text-black overflow-hidden cursor-pointer disabled:cursor-not-allowed"
                  style={{fontFamily: "'Orbitron', sans-serif"}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.25),transparent_70%)]" />
                  {isLoading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                        />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-4 h-4" />
                        Send Transmission
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FieldGroup({ id, name, label, type, placeholder, value, error, focused, onChange, onFocus, onBlur, Icon }) {
  const AlertIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase font-outfit transition-colors duration-200"
        style={{ color: focused ? '#00FFFF' : error ? '#f87171' : '#94a3b8' }}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
          className="w-full bg-white/[0.03] text-white placeholder-gray-600 font-outfit text-sm rounded-xl px-4 py-4 border outline-none transition-all duration-200"
          style={{
            borderColor: error ? 'rgba(248,113,113,0.6)' : focused ? 'rgba(0,255,255,0.55)' : 'rgba(255,255,255,0.1)',
            boxShadow: focused ? '0 0 0 1px rgba(0,255,255,0.2), inset 0 0 12px rgba(0,255,255,0.04)' : error ? '0 0 0 1px rgba(248,113,113,0.15)' : 'none',
          }}
        />
        {focused && !error && (
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-1.5 text-xs text-red-400 font-outfit"
          >
            <AlertIcon className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextAreaGroup({ id, name, label, placeholder, value, error, focused, onChange, onFocus, onBlur, Icon }) {
  const AlertIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase font-outfit transition-colors duration-200"
        style={{ color: focused ? '#00FFFF' : error ? '#f87171' : '#94a3b8' }}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          rows={5}
          className="w-full bg-white/[0.03] text-white placeholder-gray-600 font-outfit text-sm rounded-xl px-4 py-4 border outline-none transition-all duration-200 resize-none"
          style={{
            borderColor: error ? 'rgba(248,113,113,0.6)' : focused ? 'rgba(0,255,255,0.55)' : 'rgba(255,255,255,0.1)',
            boxShadow: focused ? '0 0 0 1px rgba(0,255,255,0.2), inset 0 0 12px rgba(0,255,255,0.04)' : error ? '0 0 0 1px rgba(248,113,113,0.15)' : 'none',
          }}
        />
        {focused && !error && (
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-1.5 text-xs text-red-400 font-outfit"
          >
            <AlertIcon className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
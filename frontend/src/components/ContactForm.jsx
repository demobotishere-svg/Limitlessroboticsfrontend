import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const CheckCircleIcon = Icons['CheckCircle'] || Icons['HelpCircle'];

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

/** @type {import('framer-motion').Variants} */
const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

/** @type {import('framer-motion').Variants} */
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [focused, setFocused] = useState('');
  const [status, setStatus] = useState('idle');

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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
  }

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';

  return (
    <section
      id="contact"
      className="relative w-full flex items-center justify-center py-24 md:py-32 bg-transparent px-6"
    >
      <div className="relative z-10 w-full max-w-xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-10"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <p
              className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-405 mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Contact Us
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 font-outfit"
            >
              Partner with <span className="font-playfair font-light italic text-neutral-550">Limitless</span>.
            </h2>
            <p
              className="mt-3 text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Whether scoping a new autonomous deployment, inquiring about programs, or exploring careers—reach out to our engineers.
            </p>
          </motion.div>

          {/* Form Box */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl p-8 md:p-12 border border-neutral-100 bg-neutral-50/50 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-5"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-neutral-100 shadow-sm"
                  >
                    <CheckCircleIcon className="w-5 h-5 text-neutral-900" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold text-neutral-900 font-outfit"
                    >
                      Message Logged
                    </h3>
                    <p
                      className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed font-light mt-1.5"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Your transmission was received. A representative will contact you within 24 business hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-5 py-2 text-[10px] font-semibold tracking-wider uppercase text-neutral-600 border border-neutral-200 rounded-full bg-white hover:bg-neutral-50 transition-colors duration-250 font-outfit"
                  >
                    New Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <FieldGroup
                    id="name"
                    name="name"
                    label="Full Name"
                    placeholder="E.g. Alexander Mercer"
                    value={form.name}
                    error={errors.name}
                    focused={focused === 'name'}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={handleBlur}
                  />
                  <FieldGroup
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="alexander@limitless.io"
                    value={form.email}
                    error={errors.email}
                    focused={focused === 'email'}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={handleBlur}
                  />
                  <TextAreaGroup
                    id="message"
                    name="message"
                    label="Message"
                    placeholder="Describe your project or inquiry..."
                    value={form.message}
                    error={errors.message}
                    focused={focused === 'message'}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={handleBlur}
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 mt-4 text-center text-xs font-semibold tracking-wider uppercase text-white bg-black hover:bg-neutral-850 rounded-full transition-colors duration-300 font-outfit flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FieldGroup({ id, name, label, type = 'text', placeholder, value, error, focused, onChange, onFocus, onBlur }) {
  const AlertIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold tracking-wider uppercase font-outfit"
        style={{ color: error ? '#ef4444' : '#6b7280' }}
      >
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
          className="w-full bg-white text-neutral-900 placeholder-neutral-400 font-inter text-xs sm:text-sm rounded-xl px-4 py-3 border outline-none transition-all duration-200"
          style={{
            borderColor: error ? '#fca5a5' : focused ? '#000000' : '#e5e7eb',
            boxShadow: focused ? '0 0 0 1px rgba(0,0,0,0.05)' : 'none',
          }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-[10px] text-red-500 font-outfit mt-0.5"
          >
            <AlertIcon className="w-2.5 h-2.5 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextAreaGroup({ id, name, label, placeholder, value, error, focused, onChange, onFocus, onBlur }) {
  const AlertIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold tracking-wider uppercase font-outfit"
        style={{ color: error ? '#ef4444' : '#6b7280' }}
      >
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
          rows={4}
          className="w-full bg-white text-neutral-900 placeholder-neutral-400 font-inter text-xs sm:text-sm rounded-xl px-4 py-3 border outline-none transition-all duration-200 resize-none"
          style={{
            borderColor: error ? '#fca5a5' : focused ? '#000000' : '#e5e7eb',
            boxShadow: focused ? '0 0 0 1px rgba(0,0,0,0.05)' : 'none',
          }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-[10px] text-red-500 font-outfit mt-0.5"
          >
            <AlertIcon className="w-2.5 h-2.5 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
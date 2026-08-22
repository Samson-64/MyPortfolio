import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honey, setHoney] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Honeypot filled -> almost certainly a bot. Pretend success and bail out.
    if (honey) {
      setIsSubmitted(true);
      return;
    }

    if (!CONTACT_EMAIL) {
      setSubmitError('The contact inbox is not configured yet. Please use the email address on the left.');
      return;
    }

    setIsSending(true);
    setSubmitError(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio inquiry from ${name}`,
          _template: 'table',
          _captcha: 'false',
          _honey: honey,
          _autoresponse: `Hi ${name}, thank you for reaching out through my portfolio. I have received your message and will reply to ${email} shortly. — Samson`
        })
      });

      const result = await response.json();

      if (!response.ok || result.success !== 'true') {
        throw new Error(result.message || 'Unable to send your message right now.');
      }

      setIsSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#E8DEC8', '#DCD0B8', '#ECE5DA', '#777571']
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message
          ? `${error.message} Please try again in a moment.`
          : 'Something went wrong while sending. Please try again.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 max-w-5xl mx-auto border-t border-white/4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left: Heading & Direct Info with scroll trigger */}
        <motion.div
          initial={{ opacity: 0, x: -25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="md:col-span-5 space-y-6"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#E8E2D8] tracking-tight">
            Get in Touch
          </h2>

          <p className="text-sm sm:text-base text-[#7D7A75] leading-relaxed font-normal">
            Have a new project, a frontend engineering opportunity, or want to discuss responsive architecture? Feel free to reach out directly.
          </p>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#55524E] block">
              Direct Contact
            </span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 text-sm font-mono text-[#E8DEC8] hover:text-white transition-colors cursor-pointer group"
            >
              <span className="group-hover:underline">{PERSONAL_INFO.email}</span>
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#777] group-hover:text-white transition-colors" />}
            </button>
            {copiedEmail && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-mono text-emerald-400"
              >
                Copied to clipboard.
              </motion.p>
            )}
          </div>

          <div className="flex items-center gap-5 pt-4 text-[13px] font-mono uppercase tracking-wider text-[#66635F]">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-[#E8DEC8] hover:translate-x-0.5 transition-all">GitHub</a>
            <a href={PERSONAL_INFO.instagram} target="_blank" rel="noreferrer" className="hover:text-[#E8DEC8] hover:translate-x-0.5 transition-all">Instagram</a>
            <a href={PERSONAL_INFO.facebook} target="_blank" rel="noreferrer" className="hover:text-[#E8DEC8] hover:translate-x-0.5 transition-all">Facebook</a>
          </div>
        </motion.div>

        {/* Right: Clean Minimal Form with scroll trigger */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="md:col-span-7"
        >
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0C0C0C] border border-white/4 hover:border-white/10 transition-colors shadow-sm">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-3"
              >
                <h3 className="font-serif text-2xl text-[#E8E2D8] font-light">
                  Message Transmitted
                </h3>
                <p className="text-sm text-[#7A7773] max-w-xs mx-auto leading-relaxed">
                  Thank you, {name}. I will review your note and respond to {email} shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setHoney('');
                    setSubmitError(null);
                  }}
                  className="text-sm font-mono text-[#E8DEC8] hover:underline cursor-pointer pt-2 block mx-auto"
                >
                  Send another note
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot spam trap - invisible to humans, tempting for bots */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Leave this field empty
                    <input
                      type="text"
                      value={honey}
                      onChange={(e) => setHoney(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#55524E]">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-white/6 text-sm text-[#ECE5DA] placeholder:text-[#444] focus:outline-none focus:border-[#E8DEC8]/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#55524E]">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-white/6 text-sm text-[#ECE5DA] placeholder:text-[#444] focus:outline-none focus:border-[#E8DEC8]/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#55524E]">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly outline your project, goals, or timeline..."
                    className="w-full px-3 py-2 rounded-lg bg-[#080808] border border-white/6 text-sm text-[#ECE5DA] placeholder:text-[#444] focus:outline-none focus:border-[#E8DEC8]/40 transition-colors resize-none"
                  />
                </div>

                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="text-sm font-mono text-red-400/90 leading-relaxed"
                  >
                    [!] {submitError}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: isSending ? 1 : 1.02 }}
                  whileTap={{ scale: isSending ? 1 : 0.98 }}
                  type="submit"
                  disabled={isSending}
                  className="bg-[#E8DEC8] text-[#080808] hover:bg-[#DCD0B8] disabled:hover:bg-[#E8DEC8] px-6 py-2.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all cursor-pointer shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

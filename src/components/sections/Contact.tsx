import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }
});

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Construct mailto backup
    const mailtoUrl = `mailto:abhas.katiyar.dev@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)} (Reply to: ${encodeURIComponent(formData.email)})`;
    window.location.href = mailtoUrl;

    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding section-divider">
      <div className="container-lg">
        
        {/* Section Title */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <span className="section-eyebrow mb-3">Get in Touch</span>
          <h2 className="heading-lg text-white max-w-xl">
            Let's build something together.
          </h2>
          <p className="body-lg mt-4 max-w-2xl">
            Whether you want to discuss full-stack engineering, SaaS development, project collaborations, or student developer opportunities — my inbox is open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            <motion.a 
              {...fadeUp(0.1)}
              href="mailto:abhas.katiyar.dev@gmail.com" 
              className="card card-hover flex items-center gap-4 block"
            >
              <div className="p-3 rounded-lg bg-[var(--color-blue-dim)] border border-blue-500/20 text-[var(--color-blue)]">
                <Mail size={20} />
              </div>
              <div>
                <span className="label-mono block mb-0.5">Email Direct</span>
                <span className="text-white font-mono text-xs md:text-sm font-medium">abhas.katiyar.dev@gmail.com</span>
              </div>
            </motion.a>

            <motion.a 
              {...fadeUp(0.15)}
              href="https://github.com/abhas-katiyar" 
              target="_blank"
              rel="noreferrer"
              className="card card-hover flex items-center gap-4 block"
            >
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-white">
                <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="label-mono block mb-0.5">GitHub Repositories</span>
                <span className="text-white font-mono text-xs md:text-sm font-medium">github.com/abhas-katiyar</span>
              </div>
            </motion.a>

            <motion.a 
              {...fadeUp(0.2)}
              href="https://linkedin.com/in/abhas-katiyar" 
              target="_blank"
              rel="noreferrer"
              className="card card-hover flex items-center gap-4 block"
            >
              <div className="p-3 rounded-lg bg-[var(--color-amber-dim)] border border-amber-500/20 text-[var(--color-amber)]">
                <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="label-mono block mb-0.5">LinkedIn Profile</span>
                <span className="text-white font-mono text-xs md:text-sm font-medium">linkedin.com/in/abhas-katiyar</span>
              </div>
            </motion.a>

            <div className="pt-4 text-xs font-mono text-slate-500">
              Aabhas Katiyar — B.Tech IT, KIET Group of Institutions.
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <motion.div {...fadeUp(0.25)} className="card p-6 md:p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="label-mono block">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Sharma"
                        className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-black/30 text-white text-xs font-sans focus:outline-none focus:border-[var(--color-blue)] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="label-mono block">Your Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-black/30 text-white text-xs font-sans focus:outline-none focus:border-[var(--color-blue)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="label-mono block">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Aabhas, I'd like to discuss..."
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-black/30 text-white text-xs font-sans focus:outline-none focus:border-[var(--color-blue)] transition-colors resize-none"
                    />
                  </div>

                  <MagneticButton className="w-full pt-2">
                    <button type="submit" className="btn-primary w-full justify-center">
                      <Send size={14} />
                      <span>Send Message</span>
                    </button>
                  </MagneticButton>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 size={44} className="text-emerald-400 mx-auto" />
                  <h4 className="heading-md text-white">Message Dispatched</h4>
                  <p className="body-sm max-w-sm mx-auto">
                    Your message client has opened with your message payload prefilled. Thank you for reaching out!
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn-ghost text-xs py-2 px-4"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

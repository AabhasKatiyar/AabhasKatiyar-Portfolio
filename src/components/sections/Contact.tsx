import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotlightCard } from '../ui/SpotlightCard';
import { MagneticButton } from '../ui/MagneticButton';
import { Mail, Send, Terminal, ShieldCheck } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeSimulatedUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('transmitting');
    setLogs([]);

    const logSteps = [
      "📡 CONNECTING: Establishing secure tunnel to port 443...",
      "🔒 CRYPTO: Encrypting packet payload (AES-256)...",
      "🛰️ ROUTING: Relaying socket payload through cloud gateways...",
      "📬 DISPATCH: Sending contact packet...",
      "✨ COMPLETED: Data packet stored. Aabhas is notified."
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setLogs(prev => [...prev, logSteps[i]]);
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    setStatus('sent');
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
    setLogs([]);
  };

  return (
    <section className="py-28 px-6 max-w-5xl mx-auto border-t border-white/5" id="contact">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-16">
        <span className="font-mono text-xs text-brand-cobalt tracking-wider">// 06.</span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-display">
          Secure Uplink
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Side: Contact Details & Links */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-white">System Nodes</h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Have a B.Tech IT query, a microcontroller prototype idea, or a full-stack project scope? Establish connection via these digital terminals.
            </p>
          </div>

          {/* Social Links Cards */}
          <div className="space-y-4">
            {/* Email link */}
            <a 
              href="mailto:abhas.katiyar.dev@gmail.com" 
              className="group flex items-center gap-4 p-4 border border-white/5 bg-slate-950/40 backdrop-blur-md rounded-xl hover:border-brand-cobalt/30 transition-all duration-300"
            >
              <div className="p-2.5 rounded-lg bg-brand-cobalt/10 border border-brand-cobalt/20 text-brand-cobalt group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Mail size={18} />
              </div>
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase">Secure Mailbox</span>
                <span className="text-xs md:text-sm text-white font-mono">abhas.katiyar.dev@gmail.com</span>
              </div>
            </a>

            {/* LinkedIn link */}
            <a 
              href="https://linkedin.com/in/abhas-katiyar" 
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-4 border border-white/5 bg-slate-950/40 backdrop-blur-md rounded-xl hover:border-brand-gold/30 transition-all duration-300"
            >
              <div className="p-2.5 rounded-lg bg-brand-gold/10 border border-brand-gold/20 text-brand-gold group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase">Professional Network</span>
                <span className="text-xs md:text-sm text-white font-mono">linkedin.com/in/abhas-katiyar</span>
              </div>
            </a>

            {/* GitHub link */}
            <a 
              href="https://github.com/abhas-katiyar" 
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-4 border border-white/5 bg-slate-950/40 backdrop-blur-md rounded-xl hover:border-white/20 transition-all duration-300"
            >
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase">Silicon Repository</span>
                <span className="text-xs md:text-sm text-white font-mono">github.com/abhas-katiyar</span>
              </div>
            </a>
          </div>

          <div className="text-[10px] font-mono text-slate-500 pt-6">
            © 2026 Aabhas Katiyar // Built on React 19.
          </div>
        </div>

        {/* Right Side: Interactive Uplink Form */}
        <div className="lg:col-span-7">
          <SpotlightCard glowColor={status === 'transmitting' ? 'amber' : status === 'sent' ? 'cobalt' : 'silver'} className="h-full">
            <AnimatePresence mode="wait">
              
              {/* IDLE FORM STATE */}
              {status === 'idle' && (
                <motion.form 
                  key="form"
                  onSubmit={executeSimulatedUpload}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">CALLSIGN / NAME</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Alex Dev"
                        className="w-full px-4 py-3 rounded-lg border border-white/5 bg-black/30 text-white text-sm font-sans focus:outline-none focus:border-brand-cobalt transition-colors duration-300"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">IP_GATEWAY / EMAIL</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-white/5 bg-black/30 text-white text-sm font-sans focus:outline-none focus:border-brand-cobalt transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Message input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">PAYLOAD_BUFFER / MESSAGE</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Establish dynamic hardware integrations..."
                      className="w-full px-4 py-3 rounded-lg border border-white/5 bg-black/30 text-white text-sm font-sans focus:outline-none focus:border-brand-cobalt transition-colors duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <MagneticButton className="w-full">
                      <button 
                        type="submit"
                        className="w-full py-3.5 rounded-lg font-display text-xs font-semibold uppercase tracking-widest text-[#070a13] bg-gradient-to-r from-brand-cobalt to-brand-gold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      >
                        <Send size={12} />
                        <span>Transmit Message Packet</span>
                      </button>
                    </MagneticButton>
                  </div>
                </motion.form>
              )}

              {/* TRANSMITTING CONSOLE STATE */}
              {status === 'transmitting' && (
                <motion.div 
                  key="transmitting"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-center space-y-6 font-mono min-h-[300px]"
                >
                  <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <Terminal size={12} className="text-brand-gold" />
                      <span>TRANSMITTING DATA PACKET</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.25 rounded bg-brand-gold/10 text-brand-gold animate-pulse">CONNECTING...</span>
                  </div>

                  <div className="space-y-2 text-left h-36 flex flex-col justify-end overflow-hidden">
                    {logs.map((log, i) => (
                      <div key={i} className="text-[11px] text-slate-300 font-light leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      className="h-full bg-brand-gold rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                    />
                  </div>
                </motion.div>
              )}

              {/* SENT / SUCCESS STATE */}
              {status === 'sent' && (
                <motion.div 
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-center items-center text-center space-y-6 min-h-[300px]"
                >
                  <div className="p-4 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/20 text-brand-cobalt shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <ShieldCheck size={40} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-lg text-white">Transmission Successful</h4>
                    <p className="text-xs text-slate-400 font-light max-w-sm leading-relaxed font-sans">
                      Encryption completed. Secure data packet has been buffered in the cloud. Aabhas will review your callsign shortly.
                    </p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="font-mono text-[10px] text-brand-cobalt border border-brand-cobalt/20 bg-brand-cobalt/5 hover:bg-brand-cobalt/10 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300"
                  >
                    Open New Uplink Port
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

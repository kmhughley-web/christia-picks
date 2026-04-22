import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, CheckCircle2 } from "lucide-react";

const TIKTOK_URL = "https://www.tiktok.com/@christia.picks";

export default function ContactFooter() {
  const [form, setForm] = useState({ name: "", email: "", subject: "hello", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 md:py-28"
        style={{ background: "oklch(0.975 0.008 85)" }}
      >
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
              Get in Touch
            </span>
            <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-center mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center max-w-md mx-auto mb-12"
            style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Collaborations, press inquiries, Design 101 questions, or just want to say hello — I'd love to hear from you.
          </motion.p>

          <div className="max-w-2xl mx-auto">
            {!submitted ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all text-sm"
                      style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.985 0.006 80)", color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.35 0.09 155)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.015 75)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all text-sm"
                      style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.985 0.006 80)", color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.35 0.09 155)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.015 75)")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                    I'm reaching out about
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all text-sm"
                    style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.985 0.006 80)", color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <option value="hello">Just saying hello</option>
                    <option value="design101">Design 101 Course</option>
                    <option value="rsvp">Design 101 Event RSVP</option>
                    <option value="collab">Collaboration / Brand Partnership</option>
                    <option value="press">Press / Media Inquiry</option>
                    <option value="ai-guide">AI Home Design Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Tell me what's on your mind..."
                    className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all text-sm resize-none"
                    style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.985 0.006 80)", color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.35 0.09 155)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.015 75)")}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl text-sm tracking-widest uppercase font-medium transition-all hover:opacity-90"
                  style={{ background: "oklch(0.35 0.09 155)", color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Send Message
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: "oklch(0.35 0.09 155)" }} />
                <h3 className="text-3xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>
                  Message Received!
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                  Thank you for reaching out. I'll get back to you within 48 hours.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "oklch(0.12 0.01 45)" }}>
        <div className="container py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="text-2xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.975 0.008 85)" }}>
                Christia Picks
              </div>
              <p className="text-sm" style={{ color: "oklch(0.55 0.02 80)", fontFamily: "'DM Sans', sans-serif", lineHeight: "1.7" }}>
                Luxury is a mindset, not a price tag. Helping you design the home you've always wanted — on the budget you actually have.
              </p>
            </div>

            {/* Links */}
            <div>
              <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                Explore
              </div>
              <ul className="space-y-2">
                {[
                  { label: "AI Room Designer", href: "#ai-designer" },
                  { label: "Shop My Picks", href: "#shop" },
                  { label: "Design 101 Course", href: "#design-101" },
                  { label: "The Story", href: "#story" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }}
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "oklch(0.62 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                Follow Along
              </div>
              <div className="flex gap-3">
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "oklch(0.22 0.02 45)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="oklch(0.975 0.008 85)">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/christia.picks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "oklch(0.22 0.02 45)" }}
                >
                  <Instagram size={16} style={{ color: "oklch(0.975 0.008 85)" }} />
                </a>
                <a
                  href="mailto:hello@christiapicks.com"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "oklch(0.22 0.02 45)" }}
                >
                  <Mail size={16} style={{ color: "oklch(0.975 0.008 85)" }} />
                </a>
              </div>
              <p className="text-xs mt-4" style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                @christia.picks on TikTok
              </p>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs border-t"
            style={{ borderColor: "oklch(0.22 0.02 45)", color: "oklch(0.38 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
          >
            <span>© 2026 Christia Picks. All rights reserved.</span>
            <span>Designed with intention. Priced with purpose.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

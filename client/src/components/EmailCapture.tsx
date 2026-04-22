import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Gift, ArrowRight, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subscribe = trpc.email.subscribe.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email });
  };

  return (
    <section
      id="email-capture"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.94 0.012 80)" }}
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Gift icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "oklch(0.35 0.09 155)" }}
          >
            <Gift size={28} style={{ color: "oklch(0.975 0.008 85)" }} />
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
              Free Download
            </span>
            <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
          >
            Get the Free
            <br />
            <em style={{ color: "oklch(0.35 0.09 155)" }}>AI Home Design Starter Guide</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-8"
            style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
          >
            My complete guide to using AI tools to design your home — prompts, tools,
            and the exact workflow I use to transform rooms on a budget.
          </motion.p>

          {/* What's inside */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left"
          >
            {[
              { icon: "🤖", title: "AI Prompts", desc: "The exact prompts I use to generate design ideas" },
              { icon: "🎨", title: "Color Formulas", desc: "My go-to palette combinations for every style" },
              { icon: "🛒", title: "Budget Breakdown", desc: "Where to spend, where to save, every time" },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-2xl"
                style={{ background: "oklch(0.975 0.008 85)" }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-medium text-sm mb-1" style={{ color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}>
                  {item.title}
                </div>
                <div className="text-xs" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          {!submitted ? (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.65 0.02 60)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full pl-10 pr-4 py-4 rounded-full border-2 outline-none transition-all text-sm"
                  style={{
                    borderColor: "oklch(0.88 0.015 75)",
                    background: "oklch(0.975 0.008 85)",
                    color: "oklch(0.18 0.015 45)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.35 0.09 155)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.015 75)")}
                />
              </div>
              <button
                type="submit"
                disabled={subscribe.isPending}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-wider uppercase font-medium transition-all hover:opacity-90 disabled:opacity-60 flex-shrink-0"
                style={{ background: "oklch(0.35 0.09 155)", color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {subscribe.isPending ? "Sending..." : <><ArrowRight size={16} /> Get the Guide</>}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-8"
            >
              <CheckCircle2 size={48} style={{ color: "oklch(0.35 0.09 155)" }} />
              <h3
                className="text-2xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
              >
                You're on the list!
              </h3>
              <p className="text-sm" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                Check your inbox — your AI Home Design Starter Guide is on its way.
              </p>
            </motion.div>
          )}

          <p className="text-xs mt-4" style={{ color: "oklch(0.62 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
            No spam, ever. Unsubscribe anytime. Powered by ConvertKit.
          </p>
        </div>
      </div>
    </section>
  );
}

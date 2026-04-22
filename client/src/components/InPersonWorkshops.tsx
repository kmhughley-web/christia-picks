import { motion } from "framer-motion";
import { MapPin, Sparkles, Home } from "lucide-react";

const WORKSHOP_IDEAS = [
  {
    icon: "🛋️",
    title: "Living Room Refresh",
    description: "Walk through how to anchor, layer, and light a living room — using what you already own plus a few strategic finds.",
  },
  {
    icon: "🍽️",
    title: "Dining Room Glow-Up",
    description: "Transform your dining space with the right table styling, lighting, and that one statement piece that ties it all together.",
  },
  {
    icon: "🛏️",
    title: "Bedroom Sanctuary",
    description: "Create a hotel-worthy bedroom on a real budget — bedding, layering, and the art of the nightstand moment.",
  },
  {
    icon: "🤖",
    title: "AI-Assisted Redesign",
    description: "Bring a photo of your room. We'll run it through the AI Room Designer together and build your personalized action plan.",
  },
];

export default function InPersonWorkshops() {
  return (
    <section
      id="workshops"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.94 0.012 80)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
          <span
            className="text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Coming Soon
          </span>
          <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
        >
          In-Person{" "}
          <em style={{ color: "oklch(0.35 0.09 155)" }}>Workshops</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-xl mx-auto mb-14"
          style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif", lineHeight: "1.8" }}
        >
          Small-group sessions where we redesign real rooms together — using the Christia Method,
          AI tools, and your actual budget. Bixby, Oklahoma and beyond.
        </motion.p>

        {/* Workshop idea cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-14">
          {WORKSHOP_IDEAS.map((idea, i) => (
            <motion.div
              key={idea.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-3xl"
              style={{ background: "oklch(0.975 0.008 85)" }}
            >
              <div className="text-3xl mb-4">{idea.icon}</div>
              <h4
                className="font-medium mb-2 text-sm"
                style={{ color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {idea.title}
              </h4>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {idea.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Coming soon card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto rounded-3xl p-8 md:p-10 text-center"
          style={{ background: "oklch(0.35 0.09 155)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin size={16} style={{ color: "oklch(0.65 0.12 75)" }} />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Bixby, Oklahoma
            </span>
          </div>
          <h3
            className="text-3xl md:text-4xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.975 0.008 85)" }}
          >
            Dates & details coming soon.
          </h3>
          <p
            className="text-sm mb-8 leading-relaxed"
            style={{ color: "oklch(0.78 0.03 80)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Join the email list to be the first to know when workshops open — including early access and founding member pricing.
          </p>
          <button
            onClick={() => document.querySelector("#email-capture")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.82 0.1 80))",
              color: "oklch(0.18 0.015 45)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Sparkles size={14} />
            Get Early Access
          </button>
        </motion.div>
      </div>
    </section>
  );
}

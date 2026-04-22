import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Clock, Users, Star } from "lucide-react";

const MODULES = [
  { number: "01", title: "The Luxury Framework", description: "Learn the 5 principles that separate a designed room from a furnished one" },
  { number: "02", title: "Color & Palette Mastery", description: "Build a cohesive color story that flows through your entire home" },
  { number: "03", title: "The Rule of Three", description: "Layer textures, heights, and tones like a professional stylist" },
  { number: "04", title: "Budget Allocation Strategy", description: "Know exactly where to splurge and where to save for maximum impact" },
  { number: "05", title: "AI-Assisted Design", description: "Use AI tools to visualize and plan your space before spending a dollar" },
  { number: "06", title: "The Christia Method", description: "My personal room-by-room transformation framework applied to your home" },
];

const INCLUDES = [
  "6 video modules with lifetime access",
  "Room-by-room design workbook (PDF)",
  "AI Home Design Starter Guide",
  "Curated vendor & affiliate resource list",
  "Private community access",
  "Live Q&A session with Kanika",
];

export default function Design101() {
  return (
    <section
      id="design-101"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.975 0.008 85)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
          <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
            Online Course
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
          Design 101
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-lg mx-auto mb-12"
          style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
        >
          The course that teaches you to design your home like a professional —
          without hiring one.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Left: Modules */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-2xl font-light mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
            >
              What You'll Learn
            </h3>
            <div className="space-y-4">
              {MODULES.map((mod, i) => (
                <motion.div
                  key={mod.number}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex gap-4 p-4 rounded-2xl border"
                  style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.985 0.006 80)" }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{ background: "oklch(0.35 0.09 155)", color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {mod.number}
                  </div>
                  <div>
                    <h4 className="font-medium mb-0.5" style={{ color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}>
                      {mod.title}
                    </h4>
                    <p className="text-sm" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                      {mod.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Enrollment card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div
              className="rounded-3xl overflow-hidden flex-1"
              style={{ background: "oklch(0.18 0.015 45)", boxShadow: "0 20px 60px oklch(0.18 0.015 45 / 0.25)" }}
            >
              {/* Card header */}
              <div
                className="p-8 border-b"
                style={{ borderColor: "oklch(0.28 0.02 45)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="oklch(0.72 0.12 75)" style={{ color: "oklch(0.72 0.12 75)" }} />
                  ))}
                  <span className="text-xs ml-1" style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                    Coming Soon
                  </span>
                </div>
                <h3
                  className="text-3xl font-light mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.975 0.008 85)" }}
                >
                  Design 101
                  <em className="block text-xl font-light italic" style={{ color: "oklch(0.72 0.12 75)" }}>
                    by Christia Picks
                  </em>
                </h3>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: "oklch(0.72 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}>
                    <Clock size={14} /> 6 Modules
                  </div>
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: "oklch(0.72 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}>
                    <Users size={14} /> Small Group
                  </div>
                </div>
              </div>

              {/* Includes */}
              <div className="p-8">
                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                  What's Included
                </p>
                <ul className="space-y-3 mb-8">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "oklch(0.82 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}>
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.12 75)" }} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-5xl font-light"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.975 0.008 85)" }}
                    >
                      $197
                    </span>
                    <span className="text-sm line-through" style={{ color: "oklch(0.52 0.04 80)", fontFamily: "'DM Sans', sans-serif" }}>
                      $297
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "oklch(0.65 0.12 75 / 0.2)", color: "oklch(0.72 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Early Bird
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: "oklch(0.52 0.04 80)", fontFamily: "'DM Sans', sans-serif" }}>
                    One-time payment · Lifetime access
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="https://app.gohighlevel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm tracking-widest uppercase font-medium transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.82 0.1 80))",
                    color: "oklch(0.18 0.015 45)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Enroll in Design 101 <ExternalLink size={14} />
                </a>
                <p className="text-center text-xs mt-3" style={{ color: "oklch(0.42 0.04 80)", fontFamily: "'DM Sans', sans-serif" }}>
                  Secure enrollment via GoHighLevel
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

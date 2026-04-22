import { motion } from "framer-motion";

const TIMELINE = [
  { year: "Langley Park, MD", label: "The Beginning", desc: "Growing up surrounded by beauty on a budget — learning that style is a mindset, not a price tag." },
  { year: "Germantown, MD", label: "The Rule", desc: "Discovered the principle that changed everything: every room needs one investment piece that anchors the whole space." },
  { year: "Florida & Chicago", label: "The Education", desc: "Moved across the country, designing every new space from scratch — developing the method through real experience." },
  { year: "Tulsa Remote", label: "The Pivot", desc: "Selected for the Tulsa Remote program — relocated and rebuilt a home with intention, purpose, and a tight budget." },
  { year: "Bixby, Oklahoma", label: "The Home", desc: "Found the forever home. Mint green walls, curated finds, and a community that inspired Christia Picks." },
];

const METHOD_STEPS = [
  { number: "01", title: "Anchor First", desc: "Choose one investment piece per room that sets the tone for everything else." },
  { number: "02", title: "Layer In Threes", desc: "Group objects in odd numbers — three heights, three textures, three tones." },
  { number: "03", title: "The 70/20/10 Rule", desc: "70% neutral base, 20% secondary color, 10% accent. Every time." },
  { number: "04", title: "Shop the Clearance", desc: "The best finds are always in the clearance section — you just have to know what to look for." },
  { number: "05", title: "AI-Assist Everything", desc: "Use AI to visualize before you buy. Never guess — always preview." },
];

export default function StorySection() {
  return (
    <>
      {/* Story Section */}
      <section
        id="story"
        className="py-20 md:py-28"
        style={{ background: "oklch(0.975 0.008 85)" }}
      >
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
                  <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                    The Story
                  </span>
                </div>
                <h2
                  className="text-4xl md:text-5xl font-light mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
                >
                  Luxury is a mindset,
                  <br />
                  <em style={{ color: "oklch(0.35 0.09 155)" }}>not a price tag.</em>
                </h2>
                <div className="space-y-4" style={{ color: "oklch(0.38 0.02 60)", fontFamily: "'DM Sans', sans-serif", lineHeight: "1.8" }}>
                  <p>
                    I grew up understanding that beautiful spaces weren't reserved for people with big budgets.
                    They were for people who knew how to look — really look — at a room and see its potential.
                  </p>
                  <p>
                    After moving across the country multiple times, designing every new space from scratch,
                    I developed what I now call the Christia Method: a framework for creating rooms that feel
                    intentional, elevated, and completely you — without the designer price tag.
                  </p>
                  <p>
                    In my Bixby home, I proved it was possible. Mint green walls. Clearance finds next to
                    investment pieces. A space that stops people in their tracks. That's what Christia Picks
                    is about — teaching you to see what I see.
                  </p>
                </div>
              </motion.div>

              {/* Right: Quote card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div
                  className="rounded-3xl p-8 md:p-10"
                  style={{ background: "oklch(0.35 0.09 155)" }}
                >
                  <div
                    className="text-6xl font-light mb-4 leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.65 0.12 75)" }}
                  >
                    "
                  </div>
                  <blockquote
                    className="text-2xl md:text-3xl font-light leading-relaxed mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.975 0.008 85)" }}
                  >
                    I walked past a house on my street and stopped dead. The sidewalk view alone
                    told me everything I needed to know about what a home could be.
                  </blockquote>
                  <cite
                    className="text-sm not-italic"
                    style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    — Kanika, Founder of Christia Picks
                  </cite>
                </div>
                {/* Decorative element */}
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full -z-10"
                  style={{ background: "oklch(0.65 0.12 75 / 0.2)" }}
                />
              </motion.div>
            </div>

            {/* Journey Timeline */}
            <div className="mt-20">
              <h3
                className="text-3xl font-light text-center mb-10"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
              >
                The Journey
              </h3>
              <div className="relative">
                {/* Line */}
                <div
                  className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                  style={{ background: "oklch(0.88 0.015 75)" }}
                />
                <div className="space-y-8">
                  {TIMELINE.map((stop, i) => (
                    <motion.div
                      key={stop.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      {/* Dot */}
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 mt-1.5 z-10"
                        style={{ background: "oklch(0.65 0.12 75)", borderColor: "oklch(0.975 0.008 85)" }}
                      />
                      {/* Content */}
                      <div className={`ml-14 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:ml-auto"}`}>
                        <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                          {stop.year}
                        </div>
                        <div className="font-medium mb-1" style={{ color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}>
                          {stop.label}
                        </div>
                        <div className="text-sm" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                          {stop.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Method Section */}
      <section
        id="method"
        className="py-20 md:py-28"
        style={{ background: "oklch(0.94 0.012 80)" }}
      >
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
              The Framework
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
            The Christia Method
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center max-w-md mx-auto mb-12"
            style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Five principles I apply to every room, every time.
          </motion.p>

          <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {METHOD_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl text-center"
                style={{ background: "oklch(0.975 0.008 85)" }}
              >
                <div
                  className="text-3xl font-light mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.65 0.12 75)" }}
                >
                  {step.number}
                </div>
                <h4
                  className="font-medium mb-2 text-sm"
                  style={{ color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.title}
                </h4>
                <p className="text-xs" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

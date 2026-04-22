import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.975 0.008 85)" }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.72 0.12 75)" }}
      />
      <div
        className="absolute bottom-20 left-0 w-48 h-48 md:w-72 md:h-72 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.35 0.09 155)" }}
      />

      <div className="container relative z-10 text-center pt-24 pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 75)" }} />
          <span
            className="text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Luxury Living on Any Budget
          </span>
          <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 75)" }} />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
        >
          Design Your
          <br />
          <em
            className="font-normal"
            style={{ color: "oklch(0.35 0.09 155)" }}
          >
            Dream Home
          </em>
          <br />
          <span className="font-light">Without the</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, oklch(0.65 0.12 75), oklch(0.82 0.1 80), oklch(0.65 0.12 75))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Dream Price Tag
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
        >
          AI-powered room design, curated shop picks, and the Design 101 course
          — everything you need to live luxuriously on your terms.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollTo("#ai-designer")}
            className="group flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{
              background: "oklch(0.35 0.09 155)",
              color: "oklch(0.975 0.008 85)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
            Try AI Room Designer
          </button>
          <button
            onClick={() => scrollTo("#shop-picks")}
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium border-2 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: "oklch(0.65 0.12 75)",
              color: "oklch(0.35 0.09 155)",
              fontFamily: "'DM Sans', sans-serif",
              background: "transparent",
            }}
          >
            Shop My Picks
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-12 border-t"
          style={{ borderColor: "oklch(0.88 0.015 75)" }}
        >
          {[
            { value: "500+", label: "Rooms Transformed" },
            { value: "AI", label: "Powered Design" },
            { value: "100%", label: "Budget Friendly" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-light mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.35 0.09 155)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs tracking-widest uppercase"
                style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={20} style={{ color: "oklch(0.65 0.12 75)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

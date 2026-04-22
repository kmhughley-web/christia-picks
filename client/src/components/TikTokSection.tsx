import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";

const TIKTOK_HANDLE = "@christia.picks";
const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@christia.picks";
const TIKTOK_SHOP_URL = "https://www.tiktok.com/@christia.picks/shop";

const RECENT_VIDEOS = [
  { id: "1", title: "I found a $49 dupe for a $900 lamp", views: "124K", emoji: "💡", tag: "Lighting Dupe" },
  { id: "2", title: "Transforming my living room for $200", views: "89K", emoji: "🛋️", tag: "Room Makeover" },
  { id: "3", title: "The Germantown rule that changed everything", views: "212K", emoji: "🏡", tag: "Design Tips" },
  { id: "4", title: "AI designed my bedroom — here's what happened", views: "178K", emoji: "🤖", tag: "AI Design" },
  { id: "5", title: "Clearance section haul — $300 total", views: "95K", emoji: "🛒", tag: "Budget Finds" },
  { id: "6", title: "Why your room doesn't look 'finished'", views: "341K", emoji: "✨", tag: "Design 101" },
];

export default function TikTokSection() {
  return (
    <section
      id="tiktok"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.18 0.015 45)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
          <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
            Watch & Shop
          </span>
          <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.975 0.008 85)" }}
        >
          Follow Along on TikTok
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-md mx-auto mb-4"
          style={{ color: "oklch(0.72 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Real rooms. Real budgets. Real transformations.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center mb-10 font-medium"
          style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}
        >
          {TIKTOK_HANDLE}
        </motion.p>

        {/* Video grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {RECENT_VIDEOS.map((video, i) => (
            <motion.a
              key={video.id}
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              className="group relative rounded-2xl overflow-hidden aspect-[9/16] flex flex-col justify-end p-4 cursor-pointer"
              style={{ background: "oklch(0.25 0.02 45)" }}
            >
              {/* Thumbnail placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl opacity-30">{video.emoji}</div>
              </div>

              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.975 0.008 85 / 0.9)" }}
                >
                  <Play size={20} style={{ color: "oklch(0.18 0.015 45)" }} />
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.12 0.01 45 / 0.9) 0%, transparent 60%)" }} />

              {/* Content */}
              <div className="relative z-10">
                <span
                  className="inline-block text-xs px-2 py-0.5 rounded-full mb-2"
                  style={{ background: "oklch(0.65 0.12 75 / 0.3)", color: "oklch(0.72 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {video.tag}
                </span>
                <p className="text-xs font-medium leading-snug" style={{ color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}>
                  {video.title}
                </p>
                <p className="text-xs mt-1" style={{ color: "oklch(0.72 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}>
                  {video.views} views
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href={TIKTOK_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium"
            style={{
              background: "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.82 0.1 80))",
              color: "oklch(0.18 0.015 45)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <ExternalLink size={16} /> Shop My Videos
          </motion.a>
          <motion.a
            href={TIKTOK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium border-2"
            style={{ borderColor: "oklch(0.45 0.04 80)", color: "oklch(0.82 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Follow {TIKTOK_HANDLE}
          </motion.a>
        </div>
      </div>
    </section>
  );
}

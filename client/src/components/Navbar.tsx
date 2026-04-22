import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "AI Designer", href: "#ai-designer" },
  { label: "Shop Picks", href: "#shop-picks" },
  { label: "Design 101", href: "#design-101" },
  { label: "Our Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.975_0.008_85/0.97)] backdrop-blur-md shadow-sm border-b border-[oklch(0.88_0.015_75)]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex flex-col leading-none"
          >
            <span
              className="text-2xl md:text-3xl font-light tracking-widest"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.35 0.09 155)" }}
            >
              CHRISTIA
            </span>
            <span
              className="text-xs tracking-[0.35em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.12 75)", marginTop: "-2px" }}
            >
              PICKS
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm tracking-wider uppercase transition-colors duration-200 hover:text-[oklch(0.65_0.12_75)] font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.35 0.09 155)" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#email-capture")}
              className="px-5 py-2 text-sm tracking-wider uppercase font-medium rounded-full transition-all duration-200 hover:opacity-90"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "oklch(0.35 0.09 155)",
                color: "oklch(0.975 0.008 85)",
              }}
            >
              Join the List
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: "oklch(0.35 0.09 155)" }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col pt-20"
            style={{ background: "oklch(0.975 0.008 85)" }}
          >
            <div className="container flex flex-col gap-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-3xl font-light tracking-wide pb-4 border-b"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "oklch(0.18 0.015 45)",
                    borderColor: "oklch(0.88 0.015 75)",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                onClick={() => handleNavClick("#email-capture")}
                className="mt-4 px-6 py-4 text-base tracking-widest uppercase font-medium rounded-full text-center"
                style={{
                  background: "oklch(0.35 0.09 155)",
                  color: "oklch(0.975 0.008 85)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Join the List
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

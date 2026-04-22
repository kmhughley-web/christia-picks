import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "wouter";

const STORAGE_KEY = "christia-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so it doesn't flash immediately on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50"
        >
          <div
            className="rounded-2xl p-5 shadow-2xl"
            style={{
              background: "oklch(0.18 0.015 45)",
              boxShadow: "0 20px 60px oklch(0.18 0.015 45 / 0.4)",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Cookie size={16} style={{ color: "oklch(0.65 0.12 75)" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.95 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cookie Preferences
                </span>
              </div>
              <button
                onClick={handleDecline}
                className="opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: "oklch(0.75 0.01 80)" }}
                aria-label="Decline cookies"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <p
              className="text-xs leading-relaxed mb-4"
              style={{ color: "oklch(0.72 0.01 80)", fontFamily: "'DM Sans', sans-serif" }}
            >
              We use essential cookies to keep the site running and analytics cookies to understand how you use it. Your photos are{" "}
              <strong style={{ color: "oklch(0.88 0.01 80)" }}>never stored</strong>.{" "}
              <Link href="/privacy">
                <span className="underline cursor-pointer" style={{ color: "oklch(0.65 0.12 75)" }}>
                  Privacy Policy
                </span>
              </Link>
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-opacity hover:opacity-90"
                style={{
                  background: "oklch(0.35 0.09 155)",
                  color: "oklch(0.975 0.008 85)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-opacity hover:opacity-80"
                style={{
                  background: "oklch(0.28 0.015 45)",
                  color: "oklch(0.72 0.01 80)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

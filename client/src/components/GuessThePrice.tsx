import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RefreshCw, ChevronRight } from "lucide-react";

interface GameItem {
  emoji: string;
  name: string;
  description: string;
  actualPrice: number;
  options: number[];
  hint: string;
  source: string;
}

const ITEMS: GameItem[] = [
  {
    emoji: "🛋️",
    name: "Restoration Hardware Cloud Sofa",
    description: "The iconic deep-seated, ultra-plush sofa seen in every luxury living room",
    actualPrice: 4995,
    options: [895, 1895, 4995, 7500],
    hint: "This is the sofa everyone screenshots on Pinterest",
    source: "Restoration Hardware",
  },
  {
    emoji: "🪑",
    name: "Boucle Accent Chair",
    description: "Cream textured boucle fabric with tapered gold legs — a designer staple",
    actualPrice: 349,
    options: [149, 349, 699, 1200],
    hint: "You can get this look for way less than you think",
    source: "Amazon",
  },
  {
    emoji: "🖼️",
    name: "Abstract Oil Painting (48x60\")",
    description: "Large-format neutral abstract canvas — the kind you see in luxury hotels",
    actualPrice: 79,
    options: [79, 350, 850, 2400],
    hint: "Amazon has incredible art dupes — this one will shock you",
    source: "Amazon",
  },
  {
    emoji: "💡",
    name: "Arteriors Arched Floor Lamp",
    description: "Matte black arched floor lamp with linen shade — a true design icon",
    actualPrice: 1250,
    options: [189, 450, 1250, 2800],
    hint: "The original is stunning — but there's a $89 version that looks identical",
    source: "Arteriors",
  },
  {
    emoji: "🪞",
    name: "Anthropologie Gleaming Primrose Mirror",
    description: "The sunburst mirror that's been on every design blogger's wall for a decade",
    actualPrice: 498,
    options: [89, 198, 498, 950],
    hint: "This mirror has been copied by every budget brand — the original is still worth it",
    source: "Anthropologie",
  },
  {
    emoji: "🏺",
    name: "Terracotta Vase Set (3 pieces)",
    description: "Matte terracotta vases in varying heights — the earthy centerpiece trend",
    actualPrice: 42,
    options: [42, 120, 280, 650],
    hint: "Pottery Barn charges 10x this for the same look",
    source: "Amazon",
  },
];

export default function GuessThePrice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const current = ITEMS[currentIndex];
  const isCorrect = selected === current.actualPrice;
  const hasAnswered = selected !== null;

  const handleSelect = (price: number) => {
    if (hasAnswered) return;
    setSelected(price);
    const correct = price === current.actualPrice;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, correct]);
  };

  const handleNext = () => {
    if (currentIndex < ITEMS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  const formatPrice = (p: number) =>
    p >= 1000 ? `$${(p / 1000).toFixed(p % 1000 === 0 ? 0 : 1)}K` : `$${p}`;

  return (
    <section
      id="guess-price"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.35 0.09 155)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
          <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
            Interactive Game
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
          Guess the Price
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-md mx-auto mb-10"
          style={{ color: "oklch(0.82 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Can you tell the difference between a $79 find and a $7,500 investment piece?
        </motion.p>

        {/* Progress */}
        {!finished && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: "oklch(0.82 0.02 80)", fontFamily: "'DM Sans', sans-serif" }}>
                {currentIndex + 1} of {ITEMS.length}
              </span>
              <div className="flex items-center gap-1">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ background: correct ? "oklch(0.72 0.12 75)" : "oklch(0.55 0.05 30)" }}
                  />
                ))}
                {Array.from({ length: ITEMS.length - answers.length }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ background: "oklch(0.5 0.04 155)" }} />
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                Score: {score}/{answers.length}
              </span>
            </div>
            <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "oklch(0.28 0.07 155)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "oklch(0.72 0.12 75)" }}
                animate={{ width: `${((currentIndex) / ITEMS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl overflow-hidden"
                style={{ background: "oklch(0.975 0.008 85)" }}
              >
                {/* Item display */}
                <div
                  className="flex flex-col items-center justify-center py-12 px-6 text-center"
                  style={{ background: "oklch(0.94 0.012 80)" }}
                >
                  <div className="text-7xl mb-4">{current.emoji}</div>
                  <h3
                    className="text-2xl md:text-3xl font-light mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
                  >
                    {current.name}
                  </h3>
                  <p className="text-sm max-w-sm" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                    {current.description}
                  </p>
                  {!hasAnswered && (
                    <p className="text-xs mt-3 italic" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                      💡 Hint: {current.hint}
                    </p>
                  )}
                </div>

                {/* Price options */}
                <div className="p-6">
                  <p className="text-center text-sm mb-4 font-medium" style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                    What does this actually cost?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {current.options.map((price) => {
                      const isSelected = selected === price;
                      const isActual = price === current.actualPrice;
                      let bg = "oklch(0.92 0.018 75)";
                      let textColor = "oklch(0.25 0.02 45)";
                      let border = "transparent";

                      if (hasAnswered) {
                        if (isActual) { bg = "oklch(0.35 0.09 155)"; textColor = "oklch(0.975 0.008 85)"; }
                        else if (isSelected && !isActual) { bg = "oklch(0.55 0.05 30)"; textColor = "oklch(0.975 0.008 85)"; }
                      } else if (isSelected) {
                        border = "oklch(0.35 0.09 155)";
                      }

                      return (
                        <motion.button
                          key={price}
                          whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                          whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                          onClick={() => handleSelect(price)}
                          disabled={hasAnswered}
                          className="py-4 rounded-2xl text-xl font-light transition-all duration-200 border-2"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            background: bg,
                            color: textColor,
                            borderColor: border,
                          }}
                        >
                          {formatPrice(price)}
                          {hasAnswered && isActual && (
                            <span className="block text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0.8 }}>
                              ✓ {current.source}
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Result message */}
                  <AnimatePresence>
                    {hasAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 rounded-2xl text-center"
                        style={{ background: isCorrect ? "oklch(0.35 0.09 155 / 0.08)" : "oklch(0.55 0.05 30 / 0.08)" }}
                      >
                        <p
                          className="font-medium mb-1"
                          style={{ color: isCorrect ? "oklch(0.35 0.09 155)" : "oklch(0.45 0.08 30)", fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {isCorrect ? "🎉 You got it!" : `Not quite — it's actually ${formatPrice(current.actualPrice)}`}
                        </p>
                        <p className="text-xs" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                          {isCorrect
                            ? "You have a great eye for design pricing!"
                            : `Available at ${current.source} — proof that luxury doesn't have to cost a fortune.`}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {hasAnswered && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={handleNext}
                      className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm tracking-wider uppercase font-medium"
                      style={{ background: "oklch(0.35 0.09 155)", color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {currentIndex < ITEMS.length - 1 ? (
                        <><ChevronRight size={16} /> Next Item</>
                      ) : (
                        <><Trophy size={16} /> See My Score</>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Final Score */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl p-8 md:p-12 text-center"
                style={{ background: "oklch(0.975 0.008 85)" }}
              >
                <div className="text-6xl mb-4">
                  {score >= 5 ? "🏆" : score >= 3 ? "🥈" : "🎯"}
                </div>
                <h3
                  className="text-4xl md:text-5xl font-light mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
                >
                  {score} / {ITEMS.length}
                </h3>
                <p
                  className="text-lg font-light mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.35 0.09 155)" }}
                >
                  {score >= 5 ? "You're a design pricing expert!" : score >= 3 ? "You have a good eye!" : "Design pricing is tricky — that's why I'm here!"}
                </p>
                <p className="text-sm mb-8" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                  Want to learn how to find luxury looks at budget prices every time?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="#design-101"
                    onClick={(e) => { e.preventDefault(); document.querySelector("#design-101")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="px-6 py-3 rounded-full text-sm tracking-wider uppercase font-medium"
                    style={{ background: "oklch(0.35 0.09 155)", color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Take Design 101
                  </a>
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider uppercase font-medium border-2"
                    style={{ borderColor: "oklch(0.65 0.12 75)", color: "oklch(0.35 0.09 155)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <RefreshCw size={14} /> Play Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

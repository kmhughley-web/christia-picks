import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ShoppingBag } from "lucide-react";

const ROOMS = ["Living Room", "Dining", "Bedroom", "Kitchen", "Bathroom", "Office"] as const;
type Room = (typeof ROOMS)[number];

interface Product {
  name: string;
  description: string;
  price: string;
  tag: string;
  url: string;
  emoji: string;
}

const PRODUCTS: Record<Room, Product[]> = {
  "Living Room": [
    { name: "Boucle Accent Chair", description: "Cream textured boucle with gold legs — looks $2K, costs under $400", price: "$349", tag: "Best Seller", url: "https://www.amazon.com/s?k=boucle+accent+chair", emoji: "🪑" },
    { name: "Arched Floor Lamp", description: "Matte black arch lamp — the designer staple for any living room", price: "$89", tag: "Under $100", url: "https://www.amazon.com/s?k=arched+floor+lamp+matte+black", emoji: "💡" },
    { name: "Linen Throw Pillow Set", description: "Neutral linen covers with feather inserts — instantly elevated", price: "$65", tag: "Christia Pick", url: "https://www.amazon.com/s?k=linen+throw+pillow+covers+neutral", emoji: "🛋️" },
    { name: "Rattan Side Table", description: "Natural rattan with glass top — boho-luxe at a steal", price: "$129", tag: "Trending", url: "https://www.amazon.com/s?k=rattan+side+table+glass+top", emoji: "🌿" },
    { name: "Abstract Canvas Art", description: "Oversized neutral abstract print — gallery wall anchor piece", price: "$79", tag: "Under $100", url: "https://www.amazon.com/s?k=abstract+canvas+art+neutral+large", emoji: "🖼️" },
    { name: "Jute Area Rug 8x10", description: "Natural jute weave — grounds any room with warmth and texture", price: "$189", tag: "Foundation Piece", url: "https://www.amazon.com/s?k=jute+area+rug+8x10", emoji: "🏠" },
  ],
  "Dining": [
    { name: "Rattan Dining Chairs (Set of 2)", description: "Woven rattan back with cushion — restaurant-worthy at home", price: "$219", tag: "Best Seller", url: "https://www.amazon.com/s?k=rattan+dining+chairs+set", emoji: "🪑" },
    { name: "Linen Table Runner", description: "Washed linen in warm oat — the easiest table upgrade", price: "$28", tag: "Under $30", url: "https://www.amazon.com/s?k=linen+table+runner+oat+neutral", emoji: "🍽️" },
    { name: "Matte Black Candleholders", description: "Set of 3 varying heights — instant editorial centerpiece", price: "$45", tag: "Christia Pick", url: "https://www.amazon.com/s?k=matte+black+taper+candleholders+set", emoji: "🕯️" },
    { name: "Woven Placemats (Set of 4)", description: "Seagrass woven mats — texture that elevates any tablescape", price: "$32", tag: "Under $35", url: "https://www.amazon.com/s?k=woven+seagrass+placemats+set+4", emoji: "🌾" },
    { name: "Ceramic Vase Set", description: "Matte white and terracotta trio — sculptural and timeless", price: "$58", tag: "Trending", url: "https://www.amazon.com/s?k=ceramic+vase+set+matte+white+terracotta", emoji: "🏺" },
    { name: "Globe Pendant Light", description: "Rattan globe pendant — warm ambient glow over any dining table", price: "$149", tag: "Statement Piece", url: "https://www.amazon.com/s?k=rattan+globe+pendant+light+dining", emoji: "💡" },
  ],
  "Bedroom": [
    { name: "Linen Duvet Cover Set", description: "100% washed linen in warm white — hotel-quality sleep", price: "$129", tag: "Christia Pick", url: "https://www.amazon.com/s?k=washed+linen+duvet+cover+set+white", emoji: "🛏️" },
    { name: "Upholstered Bed Frame", description: "Cream boucle headboard — the centerpiece your bedroom deserves", price: "$449", tag: "Investment Piece", url: "https://www.amazon.com/s?k=upholstered+bed+frame+boucle+cream", emoji: "🛏️" },
    { name: "Rattan Nightstand", description: "Natural rattan with drawer — light, airy, and perfectly textured", price: "$159", tag: "Best Seller", url: "https://www.amazon.com/s?k=rattan+nightstand+with+drawer", emoji: "🌿" },
    { name: "Linen Window Curtains", description: "Floor-to-ceiling linen panels — makes any room feel taller", price: "$89", tag: "Under $100", url: "https://www.amazon.com/s?k=linen+curtains+floor+ceiling+neutral", emoji: "🪟" },
    { name: "Bouclé Throw Blanket", description: "Chunky boucle throw in cream — cozy luxury you can feel", price: "$55", tag: "Trending", url: "https://www.amazon.com/s?k=boucle+throw+blanket+cream", emoji: "🧶" },
    { name: "Arched Vanity Mirror", description: "Brass-framed arch mirror — the most versatile bedroom accent", price: "$139", tag: "Christia Pick", url: "https://www.amazon.com/s?k=arched+vanity+mirror+brass+frame", emoji: "🪞" },
  ],
  "Kitchen": [
    { name: "Ceramic Canister Set", description: "Matte white canisters with bamboo lids — counter art and function", price: "$48", tag: "Under $50", url: "https://www.amazon.com/s?k=ceramic+canister+set+matte+white+bamboo", emoji: "🫙" },
    { name: "Woven Storage Baskets", description: "Seagrass baskets in 3 sizes — open shelving made beautiful", price: "$39", tag: "Christia Pick", url: "https://www.amazon.com/s?k=seagrass+storage+baskets+set+3", emoji: "🧺" },
    { name: "Marble Cutting Board", description: "White marble with gold handles — functional luxury on display", price: "$62", tag: "Trending", url: "https://www.amazon.com/s?k=marble+cutting+board+gold+handles", emoji: "🍳" },
    { name: "Linen Dish Towels (Set of 4)", description: "Striped linen towels — the detail that pulls a kitchen together", price: "$24", tag: "Under $25", url: "https://www.amazon.com/s?k=linen+dish+towels+striped+set", emoji: "🧻" },
    { name: "Copper Measuring Cups", description: "Hammered copper set — vintage-luxe that hangs on display", price: "$35", tag: "Best Seller", url: "https://www.amazon.com/s?k=copper+measuring+cups+set+hanging", emoji: "🥄" },
    { name: "Herb Garden Planter Set", description: "Terracotta pots with tray — fresh herbs and fresh style", price: "$42", tag: "Christia Pick", url: "https://www.amazon.com/s?k=terracotta+herb+planter+set+kitchen", emoji: "🌱" },
  ],
  "Bathroom": [
    { name: "Teak Bath Mat", description: "Solid teak wood mat — spa-level luxury underfoot every morning", price: "$79", tag: "Best Seller", url: "https://www.amazon.com/s?k=teak+bath+mat+wood", emoji: "🛁" },
    { name: "Linen Waffle Towel Set", description: "Turkish cotton waffle weave — absorbent, beautiful, and fast-drying", price: "$65", tag: "Christia Pick", url: "https://www.amazon.com/s?k=waffle+weave+towel+set+turkish+cotton", emoji: "🏖️" },
    { name: "Marble Soap Dispenser Set", description: "White marble with gold pump — instant spa counter upgrade", price: "$38", tag: "Under $40", url: "https://www.amazon.com/s?k=marble+soap+dispenser+set+gold", emoji: "🧴" },
    { name: "Rattan Towel Ladder", description: "Natural rattan 5-rung ladder — storage and style in one", price: "$89", tag: "Trending", url: "https://www.amazon.com/s?k=rattan+towel+ladder+bathroom", emoji: "🪜" },
    { name: "Scented Reed Diffuser", description: "Linen & white tea scent — the invisible luxury of a great-smelling bathroom", price: "$32", tag: "Under $35", url: "https://www.amazon.com/s?k=reed+diffuser+linen+white+tea+luxury", emoji: "🕯️" },
    { name: "Woven Storage Basket", description: "Seagrass with handles — toilet paper, towels, anything organized beautifully", price: "$29", tag: "Under $30", url: "https://www.amazon.com/s?k=seagrass+bathroom+storage+basket+handles", emoji: "🧺" },
  ],
  "Office": [
    { name: "Linen Desk Organizer Set", description: "Fabric-wrapped organizers in neutral tones — a desk that inspires", price: "$45", tag: "Christia Pick", url: "https://www.amazon.com/s?k=linen+desk+organizer+set+neutral", emoji: "📋" },
    { name: "Arched Desk Lamp", description: "Matte black arch lamp with USB port — designer look, smart function", price: "$79", tag: "Under $80", url: "https://www.amazon.com/s?k=arched+desk+lamp+matte+black+usb", emoji: "💡" },
    { name: "Rattan Bulletin Board", description: "Woven rattan frame with corkboard — vision board meets wall art", price: "$55", tag: "Trending", url: "https://www.amazon.com/s?k=rattan+bulletin+board+framed", emoji: "📌" },
    { name: "Marble Desk Accessories", description: "White marble pen holder, tray, and bookends — the executive set", price: "$68", tag: "Best Seller", url: "https://www.amazon.com/s?k=marble+desk+accessories+set+white", emoji: "🖊️" },
    { name: "Linen Storage Boxes (Set of 3)", description: "Stackable fabric boxes with labels — beautiful organization", price: "$36", tag: "Under $40", url: "https://www.amazon.com/s?k=linen+storage+boxes+set+3+labels", emoji: "📦" },
    { name: "Monstera Desk Plant", description: "Mini monstera in terracotta pot — every desk needs a plant moment", price: "$28", tag: "Christia Pick", url: "https://www.amazon.com/s?k=mini+monstera+plant+terracotta+pot+desk", emoji: "🌿" },
  ],
};

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "Best Seller": { bg: "oklch(0.35 0.09 155 / 0.1)", text: "oklch(0.35 0.09 155)" },
  "Christia Pick": { bg: "oklch(0.72 0.12 75 / 0.15)", text: "oklch(0.55 0.1 75)" },
  "Trending": { bg: "oklch(0.92 0.018 75)", text: "oklch(0.42 0.06 75)" },
  "Under $100": { bg: "oklch(0.94 0.012 80)", text: "oklch(0.42 0.02 60)" },
  "Under $50": { bg: "oklch(0.94 0.012 80)", text: "oklch(0.42 0.02 60)" },
  "Under $30": { bg: "oklch(0.94 0.012 80)", text: "oklch(0.42 0.02 60)" },
  "Under $35": { bg: "oklch(0.94 0.012 80)", text: "oklch(0.42 0.02 60)" },
  "Under $25": { bg: "oklch(0.94 0.012 80)", text: "oklch(0.42 0.02 60)" },
  "Under $40": { bg: "oklch(0.94 0.012 80)", text: "oklch(0.42 0.02 60)" },
  "Under $80": { bg: "oklch(0.94 0.012 80)", text: "oklch(0.42 0.02 60)" },
  "Investment Piece": { bg: "oklch(0.35 0.09 155 / 0.08)", text: "oklch(0.35 0.09 155)" },
  "Statement Piece": { bg: "oklch(0.35 0.09 155 / 0.08)", text: "oklch(0.35 0.09 155)" },
  "Foundation Piece": { bg: "oklch(0.35 0.09 155 / 0.08)", text: "oklch(0.35 0.09 155)" },
};

export default function ShopMyPicks() {
  const [activeRoom, setActiveRoom] = useState<Room>("Living Room");

  return (
    <section id="shop-picks" className="py-20 md:py-28" style={{ background: "oklch(0.975 0.008 85)" }}>
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
          <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
            Curated Finds
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
          Shop My Picks
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-lg mx-auto mb-10"
          style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Every piece I'd put in my own home — curated by room, priced for real life.
        </motion.p>

        {/* Room Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {ROOMS.map((room) => (
            <button
              key={room}
              onClick={() => setActiveRoom(room)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeRoom === room ? "oklch(0.35 0.09 155)" : "oklch(0.92 0.018 75)",
                color: activeRoom === room ? "oklch(0.975 0.008 85)" : "oklch(0.35 0.09 155)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {room}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoom}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {PRODUCTS[activeRoom].map((product, i) => {
              const tagStyle = TAG_COLORS[product.tag] || { bg: "oklch(0.94 0.012 80)", text: "oklch(0.42 0.02 60)" };
              return (
                <motion.a
                  key={product.name}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.985 0.006 80)" }}
                >
                  {/* Emoji placeholder */}
                  <div
                    className="flex items-center justify-center text-5xl py-8"
                    style={{ background: "oklch(0.94 0.012 80)" }}
                  >
                    {product.emoji}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        className="text-base font-medium leading-snug"
                        style={{ color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {product.name}
                      </h3>
                      <span
                        className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: tagStyle.bg, color: tagStyle.text, fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {product.tag}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-relaxed mb-3 flex-1"
                      style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-lg font-light"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.35 0.09 155)" }}
                      >
                        {product.price}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all"
                        style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <ShoppingBag size={12} /> Shop Now <ExternalLink size={10} />
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* LTK CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm mb-4" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
            Follow me on LTK for the full shoppable collection
          </p>
          <a
            href="https://www.ltk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider uppercase font-medium border-2 transition-all hover:-translate-y-0.5"
            style={{
              borderColor: "oklch(0.65 0.12 75)",
              color: "oklch(0.35 0.09 155)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <ShoppingBag size={14} /> View Full LTK Collection
          </a>
        </motion.div>
      </div>
    </section>
  );
}

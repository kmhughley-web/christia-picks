import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Sparkles, X, ExternalLink, RefreshCw, ShieldCheck, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface DesignSuggestion {
  title: string;
  description: string;
  palette: string[];
  actionItems: string[];
  products: { name: string; price: string; where: string; url: string; emoji: string }[];
}

interface AnalysisResult {
  styleName: string;
  styleTagline: string;
  suggestions: DesignSuggestion[];
}

type Step = "gate" | "upload" | "results";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
    <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </span>
    <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
  </div>
);

function UploadZone({
  label,
  sublabel,
  required,
  previewUrl,
  onFile,
  onClear,
}: {
  label: string;
  sublabel: string;
  required?: boolean;
  previewUrl: string | null;
  onFile: (file: File) => void;
  onClear: () => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }, [onFile]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs tracking-widest uppercase font-medium" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
          {label}
        </span>
        {required && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "oklch(0.92 0.018 75)", color: "oklch(0.35 0.09 155)", fontFamily: "'DM Sans', sans-serif" }}>
            Required
          </span>
        )}
        {!required && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "oklch(0.94 0.012 80)", color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
            Optional
          </span>
        )}
      </div>
      {previewUrl ? (
        <div className="relative rounded-2xl overflow-hidden" style={{ background: "oklch(0.985 0.006 80)" }}>
          <img src={previewUrl} alt={label} className="w-full h-40 object-cover" />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.18 0.015 45 / 0.75)", color: "white" }}
          >
            <X size={14} />
          </button>
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs" style={{ background: "oklch(0.35 0.09 155)", color: "white", fontFamily: "'DM Sans', sans-serif" }}>
            <CheckCircle2 size={10} className="inline mr-1" />Uploaded
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className="cursor-pointer rounded-2xl p-8 text-center border-2 border-dashed transition-all duration-200"
          style={{
            borderColor: dragOver ? "oklch(0.35 0.09 155)" : "oklch(0.78 0.015 75)",
            background: dragOver ? "oklch(0.94 0.012 80)" : "oklch(0.985 0.006 80)",
          }}
        >
          <Upload size={22} className="mx-auto mb-2" style={{ color: "oklch(0.35 0.09 155)" }} />
          <p className="text-sm font-medium mb-1" style={{ color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}>
            {sublabel}
          </p>
          <p className="text-xs" style={{ color: "oklch(0.62 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
            JPG, PNG · up to 10MB
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
          />
        </div>
      )}
    </div>
  );
}

export default function AIRoomDesigner() {
  const [step, setStep] = useState<Step>("gate");

  // Gate state
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateSubmitting, setGateSubmitting] = useState(false);

  // Upload state
  const [roomPreview, setRoomPreview] = useState<string | null>(null);
  const [roomBase64, setRoomBase64] = useState<string | null>(null);
  const [roomMime, setRoomMime] = useState("image/jpeg");
  const [inspPreview, setInspPreview] = useState<string | null>(null);
  const [inspBase64, setInspBase64] = useState<string | null>(null);
  const [inspMime, setInspMime] = useState("image/jpeg");

  // Results state
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const subscribeMutation = trpc.email.subscribe.useMutation();

  const analyzeMutation = trpc.design.analyzeRoom.useMutation({
    onSuccess: (data) => {
      setResult(data as AnalysisResult);
      setStep("results");
    },
    onError: () => {
      toast.error("Analysis failed. Please try again.");
    },
  });

  const processFile = (file: File, onBase64: (b64: string, mime: string, url: string) => void) => {
    if (!file.type.startsWith("image/")) { toast.error("Please upload an image file."); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error("Image must be under 10MB."); return; }
    const url = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(",")[1];
      onBase64(base64, file.type || "image/jpeg", url);
    };
    reader.readAsDataURL(file);
  };

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateName.trim() || !gateEmail.trim()) return;
    setGateSubmitting(true);
    try {
      await subscribeMutation.mutateAsync({ email: gateEmail, firstName: gateName });
    } catch {
      // non-blocking — proceed even if subscribe fails
    }
    setGateSubmitting(false);
    setStep("upload");
  };

  const handleAnalyze = () => {
    if (!roomBase64) { toast.error("Please upload a photo of your room."); return; }
    analyzeMutation.mutate({
      imageBase64: roomBase64,
      mimeType: roomMime,
      inspirationBase64: inspBase64 ?? undefined,
      inspirationMimeType: inspMime,
      userName: gateName,
      userEmail: gateEmail,
    });
  };

  const handleReset = () => {
    setStep("upload");
    setRoomPreview(null); setRoomBase64(null);
    setInspPreview(null); setInspBase64(null);
    setResult(null); setActiveTab(0);
  };

  const handleFullReset = () => {
    handleReset();
    setStep("gate");
    setGateName(""); setGateEmail("");
  };

  return (
    <section
      id="ai-designer"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.97 0.008 80)" }}
    >
      <div className="container">
        <SectionLabel>AI-Powered</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
        >
          Design My <em style={{ color: "oklch(0.35 0.09 155)" }}>Room</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-lg mx-auto mb-3"
          style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Upload your room — and a piece you love — and get 3 personalized luxury design directions with shoppable picks at every budget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <ShieldCheck size={14} style={{ color: "oklch(0.35 0.09 155)" }} />
          <span className="text-xs" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
            Your photos are analyzed instantly and never stored
          </span>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {(["gate", "upload", "results"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all"
                style={{
                  background: step === s ? "oklch(0.35 0.09 155)" : (["gate", "upload", "results"].indexOf(step) > i ? "oklch(0.65 0.12 75)" : "oklch(0.88 0.015 75)"),
                  color: step === s || ["gate", "upload", "results"].indexOf(step) > i ? "white" : "oklch(0.52 0.02 60)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {["gate", "upload", "results"].indexOf(step) > i ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className="text-xs hidden sm:block" style={{ color: step === s ? "oklch(0.18 0.015 45)" : "oklch(0.62 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                {s === "gate" ? "Your Info" : s === "upload" ? "Upload Photos" : "Your Results"}
              </span>
              {i < 2 && <div className="w-8 h-px" style={{ background: "oklch(0.82 0.015 75)" }} />}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: Email Gate ── */}
            {step === "gate" && (
              <motion.div
                key="gate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-3xl p-8 md:p-10"
                style={{ background: "oklch(0.985 0.006 80)", boxShadow: "0 8px 40px oklch(0.35 0.09 155 / 0.1)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "oklch(0.92 0.018 75)" }}>
                    <Lock size={18} style={{ color: "oklch(0.35 0.09 155)" }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>
                      Unlock Your Free Design Session
                    </h3>
                    <p className="text-xs" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                      We'll send your results and design tips to your inbox
                    </p>
                  </div>
                </div>

                <form onSubmit={handleGateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      value={gateName}
                      onChange={(e) => setGateName(e.target.value)}
                      required
                      placeholder="Your first name"
                      className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all text-sm"
                      style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.975 0.008 85)", color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.35 0.09 155)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.015 75)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={gateEmail}
                      onChange={(e) => setGateEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all text-sm"
                      style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.975 0.008 85)", color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.35 0.09 155)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.015 75)")}
                    />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 w-4 h-4 rounded flex-shrink-0 accent-[oklch(0.35_0.09_155)]"
                    />
                    <span className="text-xs leading-relaxed" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                      I agree to receive design tips, product picks, and updates from Christia Picks. Unsubscribe anytime. View our{" "}
                      <a href="/privacy" target="_blank" className="underline" style={{ color: "oklch(0.35 0.09 155)" }}>Privacy Policy</a>.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={gateSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm tracking-widest uppercase font-medium transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: "oklch(0.35 0.09 155)", color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {gateSubmitting ? <RefreshCw size={16} className="animate-spin" /> : <><ArrowRight size={16} /> Start My Design Session</>}
                  </button>
                </form>

                <p className="text-center text-xs mt-4" style={{ color: "oklch(0.65 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                  No spam. Unsubscribe anytime. Your photos are never stored.
                </p>
              </motion.div>
            )}

            {/* ── STEP 2: Upload ── */}
            {step === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-3xl p-8 md:p-10"
                style={{ background: "oklch(0.985 0.006 80)", boxShadow: "0 8px 40px oklch(0.35 0.09 155 / 0.1)" }}
              >
                <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>
                  Hi {gateName} — let's see your space.
                </h3>
                <p className="text-sm mb-8" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                  Upload your room photo. Optionally add a piece you love or already own — we'll build your design around it.
                </p>

                <div className="grid sm:grid-cols-2 gap-5 mb-8">
                  <UploadZone
                    label="Your Room"
                    sublabel="Drop your room photo here"
                    required
                    previewUrl={roomPreview}
                    onFile={(f) => processFile(f, (b64, mime, url) => { setRoomBase64(b64); setRoomMime(mime); setRoomPreview(url); })}
                    onClear={() => { setRoomPreview(null); setRoomBase64(null); }}
                  />
                  <UploadZone
                    label="A Piece You Love"
                    sublabel="Sofa, rug, lamp, art..."
                    previewUrl={inspPreview}
                    onFile={(f) => processFile(f, (b64, mime, url) => { setInspBase64(b64); setInspMime(mime); setInspPreview(url); })}
                    onClear={() => { setInspPreview(null); setInspBase64(null); }}
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!roomBase64 || analyzeMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm tracking-widest uppercase font-medium transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "oklch(0.35 0.09 155)", color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {analyzeMutation.isPending ? (
                    <><RefreshCw size={16} className="animate-spin" /> Analyzing Your Room...</>
                  ) : (
                    <><Sparkles size={16} /> Get My 3 Design Directions</>
                  )}
                </button>

                {analyzeMutation.isPending && (
                  <p className="text-center text-xs mt-3" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                    This takes about 15–20 seconds — hang tight ✨
                  </p>
                )}
              </motion.div>
            )}

            {/* ── STEP 3: Results ── */}
            {step === "results" && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Style name banner */}
                <div
                  className="rounded-3xl p-6 md:p-8 mb-6 text-center"
                  style={{ background: "oklch(0.35 0.09 155)" }}
                >
                  <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                    Your Design Profile
                  </p>
                  <h3 className="text-3xl md:text-4xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.975 0.008 85)" }}>
                    {result.styleName}
                  </h3>
                  <p className="text-sm" style={{ color: "oklch(0.78 0.03 80)", fontFamily: "'DM Sans', sans-serif" }}>
                    {result.styleTagline}
                  </p>
                </div>

                {/* Direction tabs */}
                <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                  {result.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className="flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: activeTab === i ? "oklch(0.35 0.09 155)" : "oklch(0.92 0.018 75)",
                        color: activeTab === i ? "oklch(0.975 0.008 85)" : "oklch(0.35 0.09 155)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {i + 1}. {s.title}
                    </button>
                  ))}
                  <button
                    onClick={handleReset}
                    className="flex-shrink-0 flex items-center gap-1 px-4 py-2.5 rounded-full text-xs font-medium"
                    style={{ background: "oklch(0.94 0.012 80)", color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <RefreshCw size={12} /> New Photos
                  </button>
                </div>

                {/* Active direction card */}
                <AnimatePresence mode="wait">
                  {result.suggestions[activeTab] && (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-3xl overflow-hidden"
                      style={{ background: "oklch(0.985 0.006 80)", boxShadow: "0 8px 40px oklch(0.35 0.09 155 / 0.1)" }}
                    >
                      <div className="p-6 md:p-8">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>
                            {result.suggestions[activeTab].title}
                          </h4>
                          <Sparkles size={20} style={{ color: "oklch(0.65 0.12 75)" }} />
                        </div>

                        <p className="mb-5 leading-relaxed text-sm" style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                          {result.suggestions[activeTab].description}
                        </p>

                        {/* Color palette */}
                        {result.suggestions[activeTab].palette?.length > 0 && (
                          <div className="mb-5">
                            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>Color Palette</p>
                            <div className="flex gap-2">
                              {result.suggestions[activeTab].palette.map((color, j) => (
                                <div key={j} className="w-9 h-9 rounded-full border-2 border-white shadow" style={{ background: color }} title={color} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action items */}
                        {result.suggestions[activeTab].actionItems?.length > 0 && (
                          <div className="mb-5 p-4 rounded-2xl" style={{ background: "oklch(0.94 0.012 80)" }}>
                            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>Your Action Plan</p>
                            <ul className="space-y-2">
                              {result.suggestions[activeTab].actionItems.map((item, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "oklch(0.28 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}>
                                  <ArrowRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: "oklch(0.35 0.09 155)" }} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Shop products */}
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>Shop This Look</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {result.suggestions[activeTab].products?.map((product, j) => (
                              <a
                                key={j}
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md"
                                style={{ borderColor: "oklch(0.88 0.015 75)", background: "oklch(0.975 0.008 85)" }}
                              >
                                <div>
                                  <div className="text-sm font-medium" style={{ color: "oklch(0.18 0.015 45)", fontFamily: "'DM Sans', sans-serif" }}>
                                    {product.emoji} {product.name}
                                  </div>
                                  <div className="text-xs" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                                    {product.price} · {product.where}
                                  </div>
                                </div>
                                <ExternalLink size={13} style={{ color: "oklch(0.52 0.02 60)" }} />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleFullReset}
                  className="w-full mt-4 py-3 rounded-2xl text-xs tracking-widest uppercase font-medium transition-all hover:opacity-80"
                  style={{ background: "transparent", border: "1.5px solid oklch(0.82 0.015 75)", color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Start Over with a New Room
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

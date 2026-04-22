import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Sparkles, X, ExternalLink, RefreshCw, ShieldCheck } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface DesignSuggestion {
  title: string;
  description: string;
  palette: string[];
  products: { name: string; price: string; where: string; url: string; emoji: string }[];
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
    <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "oklch(0.65 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </span>
    <div className="h-px w-10" style={{ background: "oklch(0.65 0.12 75)" }} />
  </div>
);

export default function AIRoomDesigner() {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [suggestions, setSuggestions] = useState<DesignSuggestion[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const analyzeMutation = trpc.design.analyzeRoom.useMutation({
    onSuccess: (data: { suggestions: DesignSuggestion[] }) => {
      setSuggestions(data.suggestions);
    },
    onError: (err: unknown) => {
      toast.error("Analysis failed. Please try again.");
      console.error(err);
    },
  });

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSuggestions([]);

    setMimeType(file.type || "image/jpeg");
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(",")[1];
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleAnalyze = () => {
    if (!imageBase64) return;
    analyzeMutation.mutate({ imageBase64, mimeType });
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setImageBase64(null);
    setSuggestions([]);
    setActiveTab(0);
    if (fileRef.current) fileRef.current.value = "";
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
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
        >
          AI Room Designer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-lg mx-auto mb-4"
          style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Upload a photo of any room and get 3 personalized luxury design suggestions
          — each with shoppable picks at every budget.
        </motion.p>

        {/* Privacy badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <ShieldCheck size={14} style={{ color: "oklch(0.35 0.09 155)" }} />
          <span className="text-xs" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
            Your photo is analyzed instantly and never stored — zero data liability
          </span>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Zone */}
          {!previewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl p-12 md:p-20 text-center transition-all duration-300 border-2 border-dashed ${
                dragOver ? "scale-[1.01]" : ""
              }`}
              style={{
                borderColor: dragOver ? "oklch(0.35 0.09 155)" : "oklch(0.72 0.12 75)",
                background: dragOver ? "oklch(0.94 0.012 80)" : "oklch(0.985 0.006 80)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.92 0.018 75)" }}
              >
                <Upload size={28} style={{ color: "oklch(0.35 0.09 155)" }} />
              </div>
              <h3
                className="text-xl font-light mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
              >
                Drop your room photo here
              </h3>
              <p className="text-sm mb-4" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                or click to browse — JPG, PNG up to 10MB
              </p>
              <span
                className="inline-block px-6 py-2.5 rounded-full text-sm tracking-wider uppercase font-medium"
                style={{ background: "oklch(0.35 0.09 155)", color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Choose Photo
              </span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </motion.div>
          )}

          {/* Preview + Analyze */}
          {previewUrl && suggestions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "oklch(0.985 0.006 80)", boxShadow: "0 8px 40px oklch(0.35 0.09 155 / 0.12)" }}
            >
              <div className="relative">
                <img src={previewUrl} alt="Room preview" className="w-full max-h-80 object-cover" />
                <button
                  onClick={handleReset}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.18 0.015 45 / 0.7)", color: "white" }}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-6 text-center">
                <p className="text-sm mb-4" style={{ color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                  Ready to analyze your room
                </p>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzeMutation.isPending}
                  className="flex items-center gap-2 mx-auto px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "oklch(0.35 0.09 155)", color: "oklch(0.975 0.008 85)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {analyzeMutation.isPending ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Analyzing Your Room...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Get 3 Design Suggestions
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Tab navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                      style={{
                        background: activeTab === i ? "oklch(0.35 0.09 155)" : "oklch(0.92 0.018 75)",
                        color: activeTab === i ? "oklch(0.975 0.008 85)" : "oklch(0.35 0.09 155)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Option {i + 1}: {s.title}
                    </button>
                  ))}
                  <button
                    onClick={handleReset}
                    className="flex-shrink-0 flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-medium"
                    style={{ background: "oklch(0.94 0.012 80)", color: "oklch(0.52 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <RefreshCw size={14} /> New Photo
                  </button>
                </div>

                {/* Active suggestion */}
                {suggestions[activeTab] && (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "oklch(0.985 0.006 80)", boxShadow: "0 8px 40px oklch(0.35 0.09 155 / 0.1)" }}
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3
                            className="text-2xl md:text-3xl font-light mb-1"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}
                          >
                            {suggestions[activeTab].title}
                          </h3>
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs tracking-wider uppercase"
                            style={{ background: "oklch(0.92 0.018 75)", color: "oklch(0.35 0.09 155)", fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {suggestions[activeTab].title}
                          </span>
                        </div>
                        <Sparkles size={24} style={{ color: "oklch(0.65 0.12 75)" }} />
                      </div>

                      <p className="mb-6 leading-relaxed" style={{ color: "oklch(0.42 0.02 60)", fontFamily: "'DM Sans', sans-serif" }}>
                        {suggestions[activeTab].description}
                      </p>

                      {/* Color Palette */}
                      {suggestions[activeTab].palette?.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-lg font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>Color Palette</h4>
                          <div className="flex gap-2">
                            {suggestions[activeTab].palette.map((color: string, j: number) => (
                              <div key={j} className="w-10 h-10 rounded-full border-2 border-white shadow-md" style={{ background: color }} title={color} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Shop Products */}
                      <div>
                        <h4 className="text-lg font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.18 0.015 45)" }}>Shop This Look</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {suggestions[activeTab].products?.map((product: { name: string; price: string; where: string; url: string; emoji: string }, j: number) => (
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
                              <ExternalLink size={14} style={{ color: "oklch(0.52 0.02 60)" }} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

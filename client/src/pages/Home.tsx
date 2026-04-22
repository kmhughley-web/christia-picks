import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AIRoomDesigner from "@/components/AIRoomDesigner";
import ShopMyPicks from "@/components/ShopMyPicks";
import GuessThePrice from "@/components/GuessThePrice";
import Design101 from "@/components/Design101";
import EmailCapture from "@/components/EmailCapture";
import TikTokSection from "@/components/TikTokSection";
import StorySection from "@/components/StorySection";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.975 0.008 85)" }}>
      <Navbar />
      <Hero />
      <AIRoomDesigner />
      <ShopMyPicks />
      <GuessThePrice />
      <Design101 />
      <EmailCapture />
      <TikTokSection />
      <StorySection />
      <ContactFooter />
    </div>
  );
}

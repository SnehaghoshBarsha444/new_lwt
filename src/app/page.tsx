import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { WorkplaceStoryline } from "@/components/sections/WorkplaceStoryline";
import { AIWorkforceSection } from "@/components/sections/AIWorkforceSection";
import { VerificationStamp } from "@/components/sections/VerificationStamp";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-ambient-clean overflow-x-hidden">
      <Navbar />
      <main className="relative z-10 flex flex-col gap-14">
        <Hero />
        <WorkplaceStoryline />
        <AIWorkforceSection />
        <VerificationStamp />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
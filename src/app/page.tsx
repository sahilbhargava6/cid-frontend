import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { GreenBanner, PinkBanner } from "@/components/Banners";
import BottomIllustration from "@/components/BottomIllustration";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <GreenBanner />
        <HowItWorks />
        <PinkBanner />
        <div className="w-full mt-20 mb-10">
          <img
            src="/images/services/bottombanner.png"
            alt="Consider It Done Bottom Banner"
            className="w-full h-auto object-cover block"
          />
        </div>
        {/* <Testimonials /> */}
        {/* <FAQ /> */}
        {/* <BottomIllustration />
        <CTA /> */}
      </main>
      <Footer />
    </>
  );
}

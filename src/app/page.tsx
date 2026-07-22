"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { GreenBanner, PinkBanner } from "@/components/Banners";
import dynamic from "next/dynamic";
import Image from "next/image";

const Background3D = dynamic(() => import("@/components/Background3D"), { ssr: false });

export default function Home() {
  return (
    <>
      <Background3D />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <GreenBanner />
        <HowItWorks />
        <PinkBanner />
        <div className="w-full max-w-[100vw] overflow-hidden mt-20 mb-10 relative aspect-[21/9]">
          <Image
            src="/images/services/bottombanner.webp"
            alt="Consider it Done Premium US Business and Home Solutions Bottom Banner"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* <Testimonials /> */}
        <FAQ />
        {/* <BottomIllustration /> */}
        {/* <CTA /> */}
      </main>
      <Footer />
    </>
  );
}

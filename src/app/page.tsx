"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import Image from "next/image";

const Background3D = dynamic(() => import("@/components/Background3D"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const CTA = dynamic(() => import("@/components/CTA"));
const Footer = dynamic(() => import("@/components/Footer"));
const GreenBanner = dynamic(() => import("@/components/Banners").then((mod) => mod.GreenBanner));
const PinkBanner = dynamic(() => import("@/components/Banners").then((mod) => mod.PinkBanner));
const BottomIllustration = dynamic(() => import("@/components/BottomIllustration"));

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
        <div className="w-full mt-20 mb-10 relative aspect-[21/9]">
          <Image
            src="/images/services/bottombanner.webp"
            alt="Consider it Done Premium US Business and Home Solutions Bottom Banner"
            fill
            className="object-cover"
            sizes="100vw"
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

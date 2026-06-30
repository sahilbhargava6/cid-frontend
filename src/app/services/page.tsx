"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

export default function ServicesPage() {
  return (
    <>
      <Background3D />
      <Navbar />
      <main className="pt-[76px] lg:pt-[90px] min-h-[calc(100vh-320px)] flex flex-col justify-center">
        <Services />
      </main>
      <Footer />
    </>
  );
}

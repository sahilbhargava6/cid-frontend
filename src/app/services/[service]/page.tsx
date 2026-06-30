import React from "react";
import ServiceDetailClient from "@/components/ServiceDetailClient";

export async function generateStaticParams() {
  return [
    { service: "procurement" },
    { service: "accounts_and_logistics" },
    { service: "tax_prep" },
    { service: "solar" },
    { service: "virtual_bookkeeping" }
  ];
}

interface PageProps {
  params: Promise<{ service: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ServiceDetailClient service={resolvedParams.service} />;
}

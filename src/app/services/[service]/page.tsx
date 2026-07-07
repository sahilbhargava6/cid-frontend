import React from "react";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import { defaultServices } from "@/data/servicesData";
import { Metadata, ResolvingMetadata } from 'next';

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

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const service = defaultServices.find((s) => s.key === resolvedParams.service)
 
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }
 
  const strippedDescription = service.description.replace(/<[^>]*>?/gm, '').substring(0, 160)

  return {
    title: `${service.title} | consider-itdone`,
    description: strippedDescription,
    openGraph: {
      title: `${service.title} | consider-itdone`,
      description: strippedDescription,
      images: [service.image],
    },
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ServiceDetailClient service={resolvedParams.service} />;
}

import React from "react";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import { defaultServices, getServiceSlug, getServiceByKeyAsync } from "@/data/servicesData";
import { Metadata, ResolvingMetadata } from 'next';

export async function generateStaticParams() {
  const params: { service: string }[] = [];
  defaultServices.forEach((s) => {
    params.push({ service: s.key });
    const slug = getServiceSlug(s);
    if (slug !== s.key) {
      params.push({ service: slug });
    }
  });
  return params;
}

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getServiceByKeyAsync(resolvedParams.service);
 
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }
 
  const strippedDescription = service.description.replace(/<[^>]*>?/gm, '').substring(0, 160);

  return {
    title: `${service.title} | consider-itdone`,
    description: strippedDescription,
    openGraph: {
      title: `${service.title} | consider-itdone`,
      description: strippedDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ServiceDetailClient service={resolvedParams.service} />;
}

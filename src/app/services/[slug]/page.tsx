import { Metadata, ResolvingMetadata } from 'next'
import { defaultServices } from '@/data/servicesData'
import ServiceDetailClient from '@/components/ServiceDetailClient'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const service = defaultServices.find((s) => s.key === slug)
 
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

export function generateStaticParams() {
  return defaultServices.map((service) => ({
    slug: service.key,
  }))
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  
  // We pass the slug to the client component. 
  // The client component will pull from localStorage if overrides exist, otherwise fallback to defaults.
  return <ServiceDetailClient service={slug} />
}

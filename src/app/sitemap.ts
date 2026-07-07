import { MetadataRoute } from 'next'
import { getServices } from '@/data/servicesData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.consideritdone.com'
  const services = getServices()

  // Base routes
  const routes = [
    '',
    '/about',
    '/services',
    '/contact-us',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic service routes
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.key}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...routes, ...serviceRoutes]
}

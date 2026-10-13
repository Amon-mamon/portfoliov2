// app/robots.ts
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin', // This blocks search engines from /admin
    },
    sitemap: 'https://v-devs.vercel.app/sitemap.xml',
  }
}
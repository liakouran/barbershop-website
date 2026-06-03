import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/el/admin', '/en/admin']
    },
    sitemap: 'https://athenianblade.gr/sitemap.xml'
  };
}

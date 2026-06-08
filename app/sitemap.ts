import type {MetadataRoute} from 'next';

const baseUrl = 'https://numahairsalon.gr';
const locales = ['el', 'en'];
const routes = ['', '/services', '/about', '/gallery', '/reservations', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route ? 'monthly' : 'weekly',
      priority: route ? 0.8 : 1,
      alternates: {
        languages: {
          el: `${baseUrl}/el${route}`,
          en: `${baseUrl}/en${route}`
        }
      }
    }))
  );
}

import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Athenian Blade Barbershop',
    short_name: 'Athenian Blade',
    description: 'Premium barber shop reservations in Thessaloniki.',
    start_url: '/el',
    display: 'standalone',
    background_color: '#080808',
    theme_color: '#c8a45d',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };
}

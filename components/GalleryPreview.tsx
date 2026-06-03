import {getTranslations} from 'next-intl/server';
import Section from './Section';
import {galleryImages} from '@/lib/content';

export default async function GalleryPreview() {
  const t = await getTranslations('gallery');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <div className="grid gap-4 md:grid-cols-4">
        {galleryImages.slice(0, 4).map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={t(`items.${index}`)}
            className="h-80 w-full object-cover grayscale transition duration-500 hover:grayscale-0"
          />
        ))}
      </div>
    </Section>
  );
}

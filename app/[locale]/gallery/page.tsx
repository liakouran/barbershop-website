'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {galleryImages} from '@/lib/content';

export default function GalleryPage() {
  const t = useTranslations('galleryPage');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-5 py-32 md:px-8">
      <p className="text-sm uppercase tracking-[0.28em] text-gold">{t('eyebrow')}</p>
      <h1 className="mt-3 font-display text-5xl md:text-7xl">{t('title')}</h1>
      <div className="masonry mt-10">
        {galleryImages.map((image, index) => (
          <button key={image.src} className="mb-4 block w-full" onClick={() => setSelected(image.src)}>
            <img src={image.src} alt={t(`items.${index}`)} className="w-full object-cover grayscale transition hover:grayscale-0" />
          </button>
        ))}
      </div>
      {selected ? (
        <button className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-6" onClick={() => setSelected(null)}>
          <img src={selected} alt="Selected gallery work" className="max-h-[86vh] max-w-full object-contain" />
        </button>
      ) : null}
    </section>
  );
}

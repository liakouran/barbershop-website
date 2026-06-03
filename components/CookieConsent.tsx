'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('cookies');

  useEffect(() => {
    setVisible(localStorage.getItem('cookie-consent') !== 'accepted');
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl luxury-border bg-ink p-4 shadow-gold md:flex md:items-center md:justify-between md:gap-6">
      <p className="text-sm leading-6 text-cream/72">{t('text')}</p>
      <button
        onClick={() => {
          localStorage.setItem('cookie-consent', 'accepted');
          setVisible(false);
        }}
        className="mt-4 bg-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink md:mt-0"
      >
        {t('accept')}
      </button>
    </div>
  );
}

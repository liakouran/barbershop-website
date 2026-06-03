import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['el', 'en'],
  defaultLocale: 'el',
  localePrefix: 'always',
  localeDetection: true
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);

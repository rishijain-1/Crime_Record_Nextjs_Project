import { createLocalizedPathnamesNavigation, createSharedPathnamesNavigation } from "next-intl/navigation";
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'hi'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
      hi: '/pfadnamen'
    },
    '/login': '/login',
    '/adminDashboard':'/adminDashboard',
    '/dashboard':'/dashboard',
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation(routing);
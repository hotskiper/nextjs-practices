import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'
import { i18n } from './i18n-config'

function getLocale(request) {
  const negotiatoHeaders = {}
  request.headers.forEach((value, key) => {
    negotiatoHeaders[key] = value
  })
  const locales = i18n.locales
  let languages = new Negotiator({ headers: negotiatoHeaders }).languages(
    locales,
  )
  const locale = match(languages, locales, i18n.defaultLocale)
  return locale
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    // const locale = ''
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    )
  }
}

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)'
    '/(i18n-test.*)',
  ],
}

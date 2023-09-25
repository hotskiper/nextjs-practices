import { getDictionary } from '@/get-dictionary'
import { i18n } from '@/i18n-config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function Example({ params: { lang }, children }) {
  const dictionary = await getDictionary(lang)
  return <>{children}</>
}

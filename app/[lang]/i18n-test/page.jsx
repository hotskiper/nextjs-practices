import { getDictionary } from '@/get-dictionary'
import Item from '@/components/i18n-test/Item'

export default async function Example({ params: { lang } }) {
  const dictionary = await getDictionary(lang)

  return (
    <>
      <Item dictionary={dictionary} />
      <div>{dictionary['server-component'].welcome}</div>
    </>
  )
}

'use client'
import { Select, MenuItem, FormControl } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'

export default function Example(dictionary) {
  const router = useRouter()
  const pathname = usePathname()
  const defaultLang = pathname.split('/')[1]

  const handleChange = (e, val) => {
    const lang = val.props.value
    const newUrl = pathname.replace(/\/[a-z]+/, `/${lang}`)
    router.push(newUrl)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        defaultValue={defaultLang}
        onChange={handleChange}
      >
        <MenuItem value={'zh'}>中文</MenuItem>
        <MenuItem value={'en'}>English</MenuItem>
        <MenuItem value={'de'}>German</MenuItem>
      </Select>
      <div>{dictionary['server-component']?.welcome}</div>
    </FormControl>
  )
}

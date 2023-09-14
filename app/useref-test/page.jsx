'use client'

import { useRef, forwardRef } from 'react'
import { Button } from '@mui/material'
import Image from 'next/image'

const catList = []
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i,
  })
}

const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} />
})

MyInput.displayName = ''

const Page = () => {
  const itemRef = useRef(null)
  const inputRef = useRef(null)
  function scrollToId(id) {
    const itemDom = itemRef.current.get(id)
    itemDom.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }
  return (
    <>
      <div>
        <Button
          onClick={() => {
            inputRef.current.focus()
          }}
        >
          focus
        </Button>
        <MyInput ref={inputRef} />
      </div>
      <nav>
        <Button
          onClick={() => {
            scrollToId(5)
          }}
        >
          scrollTo5
        </Button>
        <Button
          onClick={() => {
            scrollToId(8)
          }}
        >
          scrollTo8
        </Button>
      </nav>
      <div>
        <ul className="list-none">
          {catList.map((item) => (
            <li
              key={item.id}
              ref={(node) => {
                if (!itemRef.current) {
                  itemRef.current = new Map()
                }
                const map = itemRef.current
                if (node) {
                  map.set(item.id, node)
                }
              }}
            >
              <Image src={item.imageUrl} alt="" width={100} height={100} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Page

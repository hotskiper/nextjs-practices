'use client'

import { useContext } from 'react'
import Item from '@/components/cart-context/Item'
import { CartContext } from '@/contexts/cart/CartContext'

const List = () => {
  const list = useContext(CartContext)

  return (
    <>
      {list.map((item) => (
        <Item key={item._id} {...item} />
      ))}
    </>
  )
}

export default List

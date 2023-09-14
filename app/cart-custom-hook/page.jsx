'use client'

import { useEffect } from 'react'
import Item from '@/components/cart/Item'
import { Button } from '@mui/material'
import useShoppingCart from '@/hooks/cart/useShoppingCart'
const Page = () => {
  const {
    cart: list,
    setCart: setList,
    calculateTotal,
    setListItem,
    setSelected,
    removeFromCart,
    patchRemoveFromCart,
  } = useShoppingCart()
  const total = calculateTotal()
  useEffect(() => {
    const fetchGoods = async () => {
      const response = await fetch(`/api/list`, {
        method: 'POST',
        body: JSON.stringify({ pageNo: 1, pageSize: 10 }),
      })
      const data = await response.json()
      const arr = data.data.map((item) => {
        item.checked = true
        return item
      })
      setList(arr)
    }
    fetchGoods()
  }, [setList])

  return (
    <div className=" w-full">
      <Button
        variant="contained"
        onClick={() => {
          patchRemoveFromCart()
        }}
      >
        批量删除
      </Button>
      {list.map((item) => (
        <Item
          key={item._id}
          {...item}
          removeFn={removeFromCart}
          setFn={setListItem}
          checkFn={setSelected}
        />
      ))}
      <div>{total}</div>
      <Button variant="outlined" onClick={() => {}}>
        结算
      </Button>
    </div>
  )
}

export default Page

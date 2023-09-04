'use client'

import { useState, useEffect } from 'react'
import Item from '@/components/cart/Item'
import { Button } from '@mui/material'
import Decimal from 'decimal.js'

const Page = () => {
  const [list, setList] = useState([])
  const total =
    list.length > 0
      ? list
          .filter((item) => item.checked)
          .reduce((acc, current) => {
            const nextTotal =
              new Decimal(current.count) * new Decimal(current.price)
            return acc + nextTotal
          }, 0)
      : 0

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
  }, [])

  const setListItem = (id, propty, value) => {
    const newList = list.map((item) => {
      if (item._id === id) {
        item[propty] = value
      }
      return item
    })
    setList(newList)
  }

  const removeFromCart = (id) => {
    const newList = list.filter((item) => item._id !== id)
    setList(newList)
  }

  const setSelected = (id) => {
    const newList = list.map((item) => {
      if (item._id === id) {
        item.checked = !item.checked
      }
      return item
    })
    setList(newList)
  }

  const patchRemoveFromCart = () => {
    const restList = list.filter((item) => !item.checked)
    setList(restList)
  }

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

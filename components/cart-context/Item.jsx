'use client'

import { useContext } from 'react'
import { Checkbox, Button } from '@mui/material'
import NumberInput from './NumberInput'
import { CartDispatchContext } from '@/contexts/cart/CartContext'

const Item = ({ _id, checked, name, price, count }) => {
  const dispatch = useContext(CartDispatchContext)

  const total = price * count

  const removeFn = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id,
    })
  }

  const checkFn = (id) => {
    dispatch({
      type: 'CHECKED',
      id,
    })
  }

  const setFn = (num) => {
    dispatch({
      type: 'SET_LIST_ITEM_PROPERTY',
      id: _id,
      property: 'count',
      value: num,
    })
  }

  return (
    <div className="flex w-full" style={{ lineHeight: '42px' }}>
      <Checkbox
        checked={checked}
        onChange={() => {
          checkFn(_id)
        }}
      ></Checkbox>
      <div className="w-[300px]">{name}</div>
      <div className="w-[100px]">{price}</div>
      <div className="w-[100px] mr-10">
        <NumberInput num={count} setFn={setFn} />
      </div>
      <div className="w-[100px]">{total}</div>
      <div className="w-[100px]">
        <Button
          onClick={() => {
            removeFn(_id)
          }}
        >
          删除
        </Button>
      </div>
    </div>
  )
}

export default Item

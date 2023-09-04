'use client'

import { useContext } from 'react'
import { CartContext } from '@/contexts/cart/CartContext'
import { Button } from '@mui/material'
import { Decimal } from 'decimal.js'

const Buy = () => {
  const list = useContext(CartContext)

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
  return (
    <>
      <div>{total}</div>
      <Button variant="outlined" onClick={() => {}}>
        结算
      </Button>
    </>
  )
}

export default Buy

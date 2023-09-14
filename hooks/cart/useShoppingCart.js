import { useState } from 'react'
import Decimal from 'decimal.js'

const useShoppingCart = () => {
  const [cart, setCart] = useState([])

  const calculateTotal = () => {
    const total =
      cart.length > 0
        ? cart
            .filter((item) => item.checked)
            .reduce((acc, current) => {
              const nextTotal =
                new Decimal(current.count) * new Decimal(current.price)
              return acc + nextTotal
            }, 0)
        : 0
    return total
  }

  const setListItem = (id, propty, value) => {
    const newList = cart.map((item) => {
      if (item._id === id) {
        item[propty] = value
      }
      return item
    })
    setCart(newList)
  }

  const removeFromCart = (id) => {
    const newList = cart.filter((item) => item._id !== id)
    setCart(newList)
  }

  const setSelected = (id) => {
    const newList = cart.map((item) => {
      if (item._id === id) {
        item.checked = !item.checked
      }
      return item
    })
    setCart(newList)
  }

  const patchRemoveFromCart = () => {
    const restList = cart.filter((item) => !item.checked)
    setCart(restList)
  }

  return {
    cart,
    setCart,
    calculateTotal,
    setListItem,
    setSelected,
    removeFromCart,
    patchRemoveFromCart,
  }
}

export default useShoppingCart

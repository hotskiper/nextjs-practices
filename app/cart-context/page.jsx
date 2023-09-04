'use client'

import { useEffect, useReducer } from 'react'
import List from '@/components/cart-context/List'
import Buy from '@/components/cart-context/Buy'
import cartReducer from '@/reducers/cart/cartReducer'
import { CartContext, CartDispatchContext } from '@/contexts/cart/CartContext'

const Page = () => {
  const [list, dispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    const fetchGoods = async () => {
      const response = await fetch(`/api/list`, {
        method: 'POST',
        body: JSON.stringify({ pageNo: 1, pageSize: 10 }),
      })
      const data = await response.json()
      const arr = data.data
      dispatch({
        type: 'FETCH_LIST',
        list: arr,
      })
    }
    fetchGoods()
  }, [])

  return (
    <CartContext.Provider value={list}>
      <CartDispatchContext.Provider value={dispatch}>
        <div className=" w-full">
          {/* <Button
            variant="contained"
            onClick={() => {
              patchRemoveFromCart();
            }}
          >
            批量删除
          </Button> */}
          <List />
          <Buy />
        </div>
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

export default Page

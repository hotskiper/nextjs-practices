"use client";

import { useState, useEffect, useReducer } from "react";
import Item from "@/components/cart/Item";
import { Button } from "@mui/material";
import Decimal from "decimal.js";
import cartReducer from "@/reducers/cart/cartReducer";

const Page = () => {
  const [list, dispatch] = useReducer(cartReducer, [])
  const total = list.length > 0 ? list.filter(item=>item.checked).reduce((acc,current)=>{
    const nextTotal = new Decimal(current.count) * new Decimal(current.price);
    return acc + nextTotal;
  },0) : 0;

  useEffect(() => {
    const fetchGoods = async () => {
      const response = await fetch(`/api/list`, {
        method: "POST",
        body: JSON.stringify({ pageNo: 1, pageSize: 10 }),
      });
      const data = await response.json();
      const arr = data.data
      dispatch({
        type: 'FETCH_LIST',
        list: arr
      })
    };
    fetchGoods();
  }, []);

  const setListItem = (id, property, value) => {
    dispatch({
      type: 'SET_LIST_ITEM_PROPERTY',
      id,
      property,
      value
    })
  };

  const removeFromCart = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id
    })
    
  }

  const setSelected = (id) => {
    dispatch({
      type: 'CHECKED',
      id
    })
  }

  const patchRemoveFromCart = ()=>{
    dispatch({
      type: 'PATCH_REMOVE_FROM_CART'
    })
  }

  return (
    <div className=" w-full">
      <Button variant="contained" onClick={()=>{patchRemoveFromCart();}}>批量删除</Button>
      {list.map((item) => (
        <Item key={item._id} {...item} removeFn={removeFromCart} setFn={setListItem} checkFn={setSelected} />
      ))}
      <div>{total}</div>
      <Button variant="outlined" onClick={()=>{}}>结算</Button>
    </div>
  );
};

export default Page;

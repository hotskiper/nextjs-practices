"use client"

import {useState} from 'react'
import Image from 'next/image'
import { Checkbox, Button } from '@mui/material'
import NumberInput from './NumberInput'


const Item = ({_id, checked, name, price, count, setFn, removeFn, checkFn}) => {
  const total = price * count;

  const setNumFn = (num)=>{
    setFn(_id, 'count', num)
  }
  
  return (
    <div className='flex w-full' style={{lineHeight: '42px'}}>
        <Checkbox checked={checked} onChange={()=>{checkFn(_id)}}></Checkbox>
        {/* <Image src="" alt="" /> */}
        <div className='w-[300px]'>{name}</div>
        <div className='w-[100px]'>{price}</div>
        <div className='w-[100px] mr-10'>
          <NumberInput num={count} setFn={setNumFn} />
        </div>
        <div className="w-[100px]">{total}</div>
        <div className="w-[100px]">
          <Button onClick={()=>{removeFn(_id)}}>删除</Button>
        </div>
    </div>
  )
}

export default Item
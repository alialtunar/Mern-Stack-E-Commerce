import React from 'react'

const Button = ({text,onClick}) => {
  return (
 
      <button onClick={onClick} className='w-full h-10 flex items-center justify-center text-lg bg-black text-white rounded-md'>{text}</button>


  )
}

export default Button

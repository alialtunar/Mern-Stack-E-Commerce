import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {removeFromCart} from '../redux/cartSlice'


const Cart = () => {
  const {carts} = useSelector(state => state.cart);
  const dispatch = useDispatch();


  const deleteItem = (id) => {
    console.log(carts);
    dispatch(removeFromCart(id));
   
  };
  return (
    <div className='h-screen'>
      {
        carts.length > 0 ? <div> 
          {
            carts?.map((cart,i) =>( 
          <div key={i} className='flex items-center justify-between border-b mb-2 py-2 px-4'>
              <img className='w-20' src={cart?.image?.url} alt="" />
      <div>
        {cart?.name}
      </div>      
      <div>
        {cart?.price}
      </div>
      <div onClick={() => deleteItem(cart?.id)} className='w-[150px] flex items-center justify-center rounded-md bg-red-500 text-white'>
         Sil
      </div>
          </div>
   
            ))
          }
        </div> :<div>
          <h1>Sepetiniz boş</h1>         
           </div>
      }
    </div>
  )
}

export default Cart

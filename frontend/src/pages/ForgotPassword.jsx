import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../redux/userSlice';

const ForgotPassword = () => {
  const dispatch = useDispatch();
   const [email,setEmail] = useState("");


   
  const sendFunc = () => {
    dispatch(forgotPassword(email));
    console.log("çaıştı sendFunc");
  }
  
  return (
    <div className='flex h-screen items-center justify-center'>
        <div className='1/3 space-y-3'>
       <div className='text-3xl '>Şifremi Unuttum</div>
       <Input value={email} placeholder={"mail"} onChange={(e) => setEmail(e.target.value)} name={"email"} id={""} type={"text"} />
       <Button text={"Onayla"} onClick={sendFunc}/>
       </div>
    </div>
  )
}

export default ForgotPassword

import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { forgotPassword, resetPassword } from '../redux/userSlice'

const ResetPassword = () => {
  const [password,setPassword] = useState("");
  const {token} = useParams();
  const dispatch = useDispatch();

const forgotFunc = () => {
  let res = dispatch(resetPassword({token,password}));

  console.log(res,"reset password");
}

  return (
    <div className='flex h-screen items-center justify-center'>
    <div className='1/3 space-y-3'>
   <div className='text-3xl '>Yeni Şifre Oluştur</div>
   <Input placeholder={"Yeni Şifre"} onChange={(e) =>setPassword(e.target.value)} name={"password"} id={""} type={"password"} />
   <Button text={"Onayla"} onClick={forgotFunc}/>
   </div>
</div>
  )
}

export default ResetPassword

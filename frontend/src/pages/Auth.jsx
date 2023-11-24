import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import {useNavigate} from 'react-router-dom'
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux'
import { login, register } from '../redux/userSlice';

const Auth = () => {
  const [signUp,setSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [data,setData] = useState({name:"",password:"",email:"",avatar:""});
  const [preview,setPreview] = useState('https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=')

 const registerFunc = () => {
  
   dispatch(register(data)); 
 console.log("çalıştı register");
 }

 const loginFunc = () => {
  dispatch(login(data)); 
  console.log("çalıştı login");
 }

 const handleChange = (e) => {
   if(e.target.name == "avatar"){
     const reader = new FileReader();
     reader.onload = () => {
      if(reader.readyState === 2){
        setData(prev => ({...prev,avatar:reader.result}));
        setPreview(reader.result);
      }
     }
     reader.readAsDataURL(e.target.files[0]);
   }
   else{
    setData(prev => ({...prev,[e.target.name]:e.target.value}));
   }
 }

 useEffect(() => {
  if(token){
    navigate('/');
  }
 },[token])


  
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-1/3 -mt-10 border p-2 rounded-md'> {signUp ? "kayıt Ol" : "Giriş yap" }<div>
       


      {signUp && <Input onChange={handleChange} value={data.name}  type={"text"} name={"name"} id={""} placeholder={"Ad"} />}

       <Input onChange={handleChange} value={data.email} type={"text"} name={"email"} id={""} placeholder={"Email"} />
       
       <Input onChange={handleChange} value={data.password} type={"password"} name={"password"} id={""} placeholder={"Şifre"} />

      {signUp && <div className='flex items-center mx-2 gap-3 my-2'>
        <img className='w-10 h-10 rounded-full' src={preview} alt="" />
       <Input onChange={handleChange} type={"file"} name={"avatar"} id={""} placeholder={""} />
       </div>}
       <div className='text-red-500 text-sm cursor-pointer my-2' onClick={() => setSignUp(!signUp)}>
       {signUp ? "Giriş yap" : "kayıt Ol" }
       </div>

       <div className='text-red-500 text-sm cursor-pointer my-2' onClick={() => window.location = "/forgot"}>
          Şifremi Unuttum
       </div>

         <Button text={signUp ? "kayıt Ol" : "Giriş yap" } onClick={signUp ? registerFunc : loginFunc } />
        </div>
        </div>
    </div>
  )
}

export default Auth

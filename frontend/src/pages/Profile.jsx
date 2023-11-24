import React from 'react'
import { useSelector } from 'react-redux';
import Button from '../components/Button'

const Profile = () => {
    const {user,isAuth} = useSelector(state => state.user);
  return (
    <div className='min-h-screen'>
        <div className='flex justify-center gap-5 my-10'>
        <div className=''>
          <img className='w-[300px] rounded-full h-[300px]' src={user?.user?.avatar?.url || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="" />
        </div>
        <div className='space-y-2'>
            <div className='text-4xl font-bold'>{user?.user?.name}</div>
            <div className='text-3xl'>{user?.user?.email}</div>
            <Button text={"Profili Güncelle"} onClick={() => {}} />
        </div>
        </div>
     
    </div>
  )
}

export default Profile

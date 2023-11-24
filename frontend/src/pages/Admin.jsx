import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addAdminProducts, getAdminProducts} from '../redux/productSlice'
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { openModalFunc } from '../redux/generalSlice';
import Modal from '../components/Modal';
import Input from '../components/Input'

const Admin = () => {
  const dispatch = useDispatch();
   const {adminProducts,loading} = useSelector(state => state.products);
   const {openModal} = useSelector(state => state.general);
   const [data,setData] = useState({name:"",decription:"",price:null,stock:null,category:"",images:[],rating:null})

   useEffect(() =>{
     dispatch(getAdminProducts());
   },[dispatch])
  
const modalAddFunc = () => {
     dispatch(addAdminProducts(data));
     dispatch(openModalFunc());
}    
   const addProduct = () => {
     dispatch(openModalFunc())
   }

   const productHandler = (e) => {
     if(e.target.name =="images"){
       const files = Array.from(e.target.files);
        const imagesArray = [];

        files.forEach((file) =>{
          const reader = new FileReader();
      
          reader.onload = () => {
            if(reader.readyState === 2){
              imagesArray.push(reader.result);
              setData((prev) => ({...prev, images:imagesArray}));
            }
           
          }
          reader.readAsDataURL(file);
        })
     }else{
     setData(prev => ({...prev, [e.target.name]:e.target.value}))
     }
   }

    const content = (
      <div className='my-3 '>

        <Input onChange={productHandler} name={"name"} id={""} placeholder={"Ürün adı"} type={"text"} value={""} />

        <Input onChange={productHandler} name={"description"} id={""} placeholder={"Ürün açıklaması"} type={"text"} value={""} />

        <Input onChange={productHandler} name={"price"} id={""} placeholder={"Ürün fiyatı"} type={"number"} value={""} />

        <Input onChange={productHandler} name={"category"} id={""} placeholder={"Ürün kategorisi"} type={"text"} value={""} />

        <Input onChange={productHandler} name={"stock"} id={""} placeholder={"Ürün stoğu"} type={"number"} value={""} />

        <Input onChange={productHandler} name={"rating"} id={""} placeholder={"Ürün puanlama"} type={"number"} value={""} />

        <Input onChange={productHandler} name={"images"} id={""} placeholder={"Ürün resmi"} type={"file"}  />
         
      </div>
    )

  return (
    <div className='min-h-screen'>
      <Button text={"Ürün Ekle"} onClick={addProduct} />
       {loading ? "loading...." : adminProducts?.products && <div className='flex items-center justify-center gap-5 my-5 flex-wrap'>
      {
      
      adminProducts?.products?.map((product,i)=>(
             <ProductCard edit={true} product={product} key={i} />
      ))
      }
     </div> 
     }
     {openModal && <Modal title={"Ürün Ekle"} content={content} onClick={modalAddFunc} btnName={"Ürün Ekle"} />}
    </div>
  )
}

export default Admin

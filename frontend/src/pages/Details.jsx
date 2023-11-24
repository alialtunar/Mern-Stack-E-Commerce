import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductDetail } from '../redux/productSlice';
import Slider from 'react-slick';
import { BsFillStarFill } from "react-icons/bs";
import Button from '../components/Button';
import { addToCart } from '../redux/cartSlice';

const Details = () => {
 const {id} = useParams();
 const dispatch = useDispatch();
 const {loading,product} = useSelector(state => state.products);
 const [quantity,setQuantity] = useState(1);
   useEffect(()=>{
     if(id){
       dispatch(getProductDetail(id));
     }
},[dispatch,id])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

const addBasket = () =>{
  const data = {
    id: product?.product?._id,
    name: product?.product?.name,
    price: product?.product?.price,
    image: product?.product?.images?.[0],
    quantity:quantity
  }
  dispatch(addToCart(data))
 }

 const decrement = () =>{
  if(quantity<product?.product?.stock){
    setQuantity(quantity+1);
  }

 }

 const increment = () =>{


  if(quantity > 1){
    setQuantity(quantity-1);
  }
  
 }

  return (
    <React.Fragment>
      {loading ? 
        "loading.."
       : (
        <div className='mx-3'>
          <div className="flex mt-4 justify-center gap-5">
            {product?.product && (
              <div className="w-[400px]">
                <Slider {...settings}>
                  {product?.product?.images.map((image, i) => (
                    <img key={i} className="w-[500px]"  src={image.url} alt="" />
                  ))}
                </Slider>
              </div>
            )}
            <div className="flex flex-col gap-3">
              <div className="text-3xl">{product?.product?.name}</div>
              <div className="text-xl">{product?.product?.description}</div>
              {product?.product?.stock > 0 ? (
                <div className="text-xl text-green-500">
                  Stock Sayısı: {product?.product?.stock}
                </div>
              ) : (
                <div className="text-xl">ürün stokta kalmamıştır</div>
              )}
              <div className="text-3xl">
                Kategori: {product?.product?.category}
              </div>
              <div className="text-3xl flex items-center gap-3">
                Rating: {product?.product?.rating} <BsFillStarFill />
              </div>
              <div className="flex items-center gap-4">
                <div onClick={decrement}className="text-3xl cursor-pointer">+</div>
                <div className="text-3xl">{quantity}</div>
                <div onClick={increment} className="text-3xl cursor-pointer">-</div>
              </div>
              <Button text={"Sepete Ekle"} onClick={addBasket} />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Details
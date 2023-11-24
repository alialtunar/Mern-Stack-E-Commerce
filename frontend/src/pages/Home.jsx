import React, { useEffect } from 'react'
import { getProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
const {useDispatch, useSelector} = require("react-redux");

const Home = () => {
 const dispatch = useDispatch();
 const {products,loading} = useSelector(state => state.products);

  useEffect(()=>{
  dispatch(getProducts());
  },[dispatch])


  return (
    <React.Fragment>
      <div>
      <img src="https://static.vecteezy.com/system/resources/previews/002/006/605/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-pink-backgroud-for-banner-market-ecommerce-free-vector.jpg" alt="" /> 
      </div>
     {loading ? "loading...." : products?.products && <div className='flex items-center justify-center gap-5 my-5 flex-wrap'>
      {
      
      products?.products?.map((product,i)=>(
             <ProductCard product={product} key={i} />
      ))
      }
     </div> 
     }
    </React.Fragment>
  );
}

export default Home
const Product = require("../models/product");
const ProductFilter = require("../utils/productFilter");
const cloudinary = require("cloudinary").v2;





const allProducts = async (req,res) =>{
   
   const resultPerPage = 10;
  
  const productFilter = new ProductFilter(Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await productFilter.query;
   
   res.status(200).json({products}) 

}

const adminProducts = async (req,res,next) =>{
   
   const products = await Product.find();

  products ? res.status(200).json({ products }) : console.log(err);
}


const productDetails = async (req,res) => {
  
  const product = await Product.findById(req.params.id);

  product ? res.status(200).json({ product }) : console.log(err);

}

const createProduct = async (req, res, next) => {
  let images = [];

  if (req.body.images === "String") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let allImages = [];

  for (let index = 0; index < images.length; index++) {
    const result = await cloudinary.uploader.upload(images[index], {
      folder: "products",
    });

    allImages.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = allImages;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  product ? res.status(201).json({ product }) : console.log(err);
};


const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  for (let index = 0; index < product.images.length; index++) {
    await cloudinary.uploader.destroy(product.images[index].public_id);
  }

  consol = await product.remove();

  product
    ? res.status(200).json({ message: "ürün başarıyla silindi" }, product)
    : console.log(err);

  console.log(consol);
};


const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  let images = [];

  if (req.body.images === "String") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let index = 0; index < product.images.length; index++) {
      await cloudinary.uploader.destroy(product.images[index].public_id);
    }
  }

  let allImages = [];

  for (let index = 0; index < images.length; index++) {
    const result = await cloudinary.uploader.upload(images[index], {
      folder: "products",
    });

    allImages.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = allImages;

  newProduct
    ? Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
    : console.log(err);

  newProduct ? res.status(200).json({ newProduct }) : console.log(err);
};

const createReview = async (req,res,next) => {
  const {productId,comment,rating} = req.body;

  const review = {
    user:req.user._id,
    name:req.user.name,
    comment,
    rating:Number(rating)
  }
  
  const product = Product.findById(productId);
   
   product.reviews.push(review);

   let avg = 0;
   product.reviews.forEach(rev => {
     avg += rev.rating;
   });
    
    product.rating = avg / product.reviews.length;

    await product.save({validateBefore:false});

    res.status(200).json("yorumunuz başarıyla eklendi");

};

module.exports = {
  updateProduct,
  allProducts,
  createProduct,
  deleteProduct,
  productDetails,
  createReview,
  adminProducts
};
const express = require("express")
const {
  updateProduct,
  allProducts,
  createProduct,
  deleteProduct,
  productDetails,
  createReview,
  adminProducts,
} = require("../controllers/product");
const { authenticatonmid, roleChecked } = require("../middleware/auth");



const router = express.Router(); 

router.get("/products", allProducts);
router.get("/admin/products",authenticatonmid,roleChecked("admin"), adminProducts);
router.get("/products/:id", productDetails);
router.post("/products/new", authenticatonmid,roleChecked("admin"), createProduct);
router.post("/products/newReview", authenticatonmid, createReview);
router.delete("/products/:id", authenticatonmid,roleChecked("admin"), deleteProduct);
router.put("/products/:id", authenticatonmid,roleChecked("admin") ,updateProduct);



module.exports = router;

import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import generalSlice from "./generalSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    products: productSlice,
    general: generalSlice,
    user: userSlice,
    cart:cartSlice
  },
});

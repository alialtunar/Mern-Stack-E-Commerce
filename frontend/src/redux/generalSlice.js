import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   keyword:"",
   openModal:true
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: { 
    getkeyword: (state, action) => {
    state.keyword = action.payload
  },
  openModalFunc: (state, action) => {
    state.openModal = action.payload
  }
}
});

 export const {getkeyword,openModalFunc} = generalSlice.actions;


export default generalSlice.reducer;

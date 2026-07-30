import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: [],
     addresses:[],
     selectedAddress:null    //currenly chosen address
   
  },
    reducers: {
        //actions
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        // setCard
        setCart: (state, action) => {
      state.cart = action.payload;
        },
        // Address Menagement
        addAddress:(state, action)=>{
          if(!state.addresses) state.addresses=[];
          state.addresses.push(action.payload)
        },
        setSelectedAddress:(state, action)=>{
          state.selectedAddress = action.payload
        },
        deleteAddress: (state, action) => {
  const deletedAddress = state.addresses[action.payload];

  state.addresses = state.addresses.filter(
    (_, index) => index !== action.payload
  );

  if (state.selectedAddress === deletedAddress) {
    state.selectedAddress = null;
  }
}
      }
});

export const { setProducts, setCart, addAddress, setSelectedAddress, deleteAddress } = productSlice.actions;
export default productSlice.reducer;
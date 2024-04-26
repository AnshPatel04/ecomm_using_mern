import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
  user: {firstName: 'Guest',lastName:'User', email:'no login', _id: 0, location: '??'},
  token: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      // localStorage.setItem('user',{firstName: 'Guest',lastName:'User', email:'no login', _id: null})
      state.user = {firstName: 'Guest',lastName:'User', email:'no login', _id: null};
      state.token = null;
    },
    addToCart: (state, action) => {
        state.cart = [...state.cart, action.payload.item];
    },

    removeFromCart: (state, action) => {
        state.cart = state.cart.filter((item) => item._id !== action.payload.id);
    },

    increaseCount: (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload.id) {
            item.count++;
          }
          return item;
        });
    },

    decreaseCount: (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload.id && item.count > 1) {
            item.count--;
          }
          return item;
        });
    },

    setIsCartOpen: (state) => {
        state.isCartOpen = !state.isCartOpen;
    },
   }
});


export const {
    setLogout,
    setLogin,
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
  } = cartSlice.actions;
  
  export default cartSlice.reducer;
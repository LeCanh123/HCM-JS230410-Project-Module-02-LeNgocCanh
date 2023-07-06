
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cart } from "../../pages/Cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    temp:""
  },
  reducers: {
    addToCart: (state, action) => {
      return {...state,cartItems:[...action.payload]};
    },
    addToCart1:(state, action) => {
      return {...state};
    },
    removeFromCart: (state, action) => {
      return {...state,cartItems:[...action.payload]}
    },
    incrementQuantity: (state, action) => {
      return {...state,cartItems:[...action.payload.product]}
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const handleAddToCart =
  (payloadcartItems,el,checkIdCartItem) =>
  async (dispatch) => {

if(payloadcartItems.length==0&&checkIdCartItem=="false"){
 // dispatch(signUpRequest());
 try {
  const response = await axios.post(
    process.env.REACT_APP_HOST + "cart1",
    el
  ).then((res)=>{
    dispatch(addToCart(res.data.product))
  }).catch((e)=>{}

  
  );
  // dispatch(signUpSuccess());
} catch (e) {
  // dispatch(signUpFailure());
}

  
}else{

      try {
        let flag="true";

        let payloadcartItems1= payloadcartItems.map(element => {
          if(element.image==el.product[0].image){
            flag="false"
            return {...element,quantity:element.quantity+1}
           
          }else {return {...element}}
        });



        if(flag=="false"){
          const response = await axios.put(
            process.env.REACT_APP_HOST + "cart1/"+el.id,
            {id:el.id,product:[...payloadcartItems1]}
          ).then((res)=>{
            dispatch(addToCart(res.data.product))
          });
          // dispatch(signUpSuccess());
        }else{
          const response = await axios.put(
            process.env.REACT_APP_HOST + "cart1/"+el.id,
            {id:el.id,product:[...payloadcartItems1,el.product[0]]}
          ).then((res)=>{
            dispatch(addToCart(res.data.product));
          });
          // dispatch(signUpSuccess());


        }

      } catch (e) {
        // dispatch(signUpFailure());
      }

}


  };




  export const handleRemove =
  (cartItems,e,id) =>
  async (dispatch) => {
    // dispatch(signUpRequest());
    try {
      let cartItems1=cartItems.filter((item)=>{
        return item.image!=e.image
      })
      const response = await axios.put(
        process.env.REACT_APP_HOST + "cart1/"+id,
        {id:id,product:[...cartItems1]}
      ).then((res)=>{
        dispatch(removeFromCart(res.data))
      });
      // dispatch(signUpSuccess());
    } catch (e) {
      // dispatch(signUpFailure());
    }
  };



export const { addToCart,addToCart1, removeFromCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

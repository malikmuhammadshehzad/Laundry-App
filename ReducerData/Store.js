
import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import ProductReducer from "./ProductReducer";

const store = configureStore({
    reducer: {  // this reducer take all the  Slices
        cart: CartReducer,
        product: ProductReducer
    }
});

export default store;


// import configureStore from "@reduxjs/toolkit"
// import CartReducer from "./CartReducer"
// import ProductReducer from "./ProductReducer"
 

// export default configureStore=({
//     reducer:{ 
//         cart:CartReducer,
//        product:ProductReducer
//     }
// })
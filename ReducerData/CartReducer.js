import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name:"cart", // 
    initialState:{
        cart:[],
    },
    reducers:{
        //addToCart is a function that takes two parameters: state and action. In the context of Redux, state represents the current state of your application, and action represents the action dispatched to trigger this reducer.
        addToCart:(state,action )=>{  // when user press add button on the first time, then we need to push these details(image , price etc) 
             const itemPresent = state.cart.find((item)=>item.id===action.payload.id);   // if the condition is true that mean item is present or (we are checking  the condition item is present or not ) 
             if(itemPresent){ // if the item is present then we increase the countity of that particular item 
                itemPresent.quantity++;
             }else{ // if the item is not present mean user click first time on the add button 
                state.cart.push({...action.payload,quantity:1}) // in that case just push all the detail of cart 
             }
        },
        removeFromCart:(state,action)=>{
            const removeItem =state.cart.filter((item)=>item.id!== action.payload.id)
            state.cart=removeItem;
        },
        // we will apply this incrementQuantity on Plus button 
        incrementQuantity:(state, action)=>{
            const itemPresent =state.cart.find((item)=>item.id === action.payload.id)
            itemPresent.quantity++;
        },
        decrementQuantity:(state ,action)=>{
            const itemPresent=state.cart.find((item)=>item.id === action.payload.id); // in this case item is already present 
            if(itemPresent.quantity==1){
                itemPresent.quantity = 0;
                const removeItem =state.cart.filter((item)=>item.id!== action.payload.id)
                state.cart = removeItem;

            }else{
                itemPresent.quantity--;
            }
        },
        cleanCart:(state)=>{
            state.cart = []
        }
        
    }
});
// we can not direct export these action because react allow only a function for export, in this ways we make function for export
// this export method is same for every project     
export const {addToCart , removeFromCart , incrementQuantity , decrementQuantity , cleanCart }= CartSlice.actions; 
export default CartSlice.reducer;


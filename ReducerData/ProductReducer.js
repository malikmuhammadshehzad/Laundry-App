import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
    name:'product',
    initialState:{
        product:[]
    },
    reducers:{
        // this getProducts is emty in initialState , then we push data of service of DealItem 
        getProducts:(state, action)=>{
            state.product.push({...action.payload})
        },
        incrementQty:(state, action)=>{ // when i click on the add button in the home screen then this function run 
            const itemPresent =state.product.find((item)=>item.id === action.payload.id) 
            itemPresent.quantity++;
        },
        decrementQty:(state, action)=>{
            const itemPresent=state.product.find((item)=>item.id === action.payload.id);  
            if(itemPresent.quantity==1){
                itemPresent.quantity = 0;
                const removeItem =state.product.filter((item)=>item.id!== action.payload.id)
                state.product = removeItem;

            }else{
                itemPresent.quantity--;
            }
        }
    }
}) 
export const {getProducts , incrementQty , decrementQty} =  ProductSlice.actions;
export default ProductSlice.reducer;
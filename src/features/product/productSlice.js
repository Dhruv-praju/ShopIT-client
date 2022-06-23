import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'products',
    initialState: [],
    reducers:{
        setProducts: (state, action) => {
            const products = action.payload

            return products
        }
    }
})

export const {setProducts} = productSlice.actions

export default productSlice.reducer
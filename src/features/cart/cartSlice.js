import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        items: JSON.parse(localStorage.getItem('items')) || []
    },
    reducers:{
        addItemToCart : (state, action) => {
            // item: {product_id, qty}
            const {product_id:product, qty, price, stock} = action.payload
            let newItem = true
            for (let item of state.items) {
                if(item.product===product){
                    newItem = false
                    if((item.qty+qty) >= stock) item.qty = stock
                    else item.qty += qty
                }
            }
            if(newItem) state.items.push({product, qty, price})
            localStorage.setItem('items', JSON.stringify(state.items))
        },
        removeItemFromCart : (state, action) => {
            const id = action.payload

            state.items = state.items.filter(item => item.product!==id)
            localStorage.setItem('items', JSON.stringify(state.items))

        },
        incrementQty : (state, action) => {
            const id = action.payload

            state.items.forEach(item => {
                if(item.product===id) item.qty += 1
            })
            localStorage.setItem('items', JSON.stringify(state.items))

        },
        decrementQty : (state, action) => {
            const {id, qty} = action.payload
            if(qty===1) {
                state.items = state.items.filter(item => item.product!==id)
            } else {
                state.items.forEach(item => {
                    if(item.product===id) {
                         item.qty -= 1
                    }
                })
            }

            localStorage.setItem('items', JSON.stringify(state.items))
        },
        
    }
})

export const {addItemToCart, removeItemFromCart, incrementQty, decrementQty} = cartSlice.actions

export default cartSlice.reducer
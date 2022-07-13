import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from './features/product/productApiSlice'
import userReducer from './features/user/userSlice'
import productReducer from './features/product/productSlice'
import { userApi } from './features/user/userApiSlice'
import cartReducer from './features/cart/cartSlice'
import { orderApi } from './features/order/orderApiSlice'

const rootReducer = {
    reducer:{
        [productApi.reducerPath] : productApi.reducer,
        user: userReducer,
        products: productReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware).concat(userApi.middleware).concat(orderApi.middleware),
}
// make a central store
const store = configureStore(rootReducer)

setupListeners(store.dispatch)

export default store
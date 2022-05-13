import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from './features/product/productApiSlice'

const rootReducer = {
    reducer:{
        [productApi.reducerPath] : productApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
}
// make a central store
const store = configureStore(rootReducer)

setupListeners(store.dispatch)

export default store
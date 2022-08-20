import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service with BASE URL and endpoints
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SERVER_URL}/api/`,
        credentials: 'include'
    }),
    endpoints: builder => ({
        getAllProducts : builder.query({
            query: () => 'products/'
        }),
        getProductsByPage :builder.query({
            query: (page) => `products?page=${page}`
        }),
        getProductsBySearch: builder.query({
            query: (search, page) => `products?keyword=${search}&page=${page}`
        }),
        getProductById : builder.query({
            query: (id) => `products/${id}`
        }),
        addNewProduct : builder.mutation({
            query: product => ({
                url: 'products/new',
                method: 'POST',
                body: product
            })
        })
    })
})

export const { useGetAllProductsQuery, useGetProductByIdQuery, useGetProductsByPageQuery, useGetProductsBySearchQuery, useAddNewProductMutation } = productApi
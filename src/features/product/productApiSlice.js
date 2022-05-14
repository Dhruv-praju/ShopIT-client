import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service with BASE URL and endpoints
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/products/'}),
    endpoints: builder => ({
        getAllProducts : builder.query({
            query: () => '/'
        }),
        getProductById : builder.query({
            query: (id) => `${id}`
        })
    })
})

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi
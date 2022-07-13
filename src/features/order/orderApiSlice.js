import { productApi } from "../product/productApiSlice";

export const orderApi = productApi.injectEndpoints({
    endpoints: builder => ({
        getStripeAPIkey : builder.query({
            query : () => 'payment/stripeapi'
        }),

        processPayment : builder.mutation({
            query : (data) => ({
                url: 'payment/process',
                method: 'POST',
                body: data
            })
        }),
        createOrder : builder.mutation({
            query : (data) => ({
                url: 'orders/new',
                method: 'POST',
                body: data
            }) 
        })
    }) 
})

export const {useGetStripeAPIkeyQuery, useProcessPaymentMutation, useCreateOrderMutation} = orderApi
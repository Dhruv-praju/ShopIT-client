import { productApi } from "../product/productApiSlice";

export const userApi = productApi.injectEndpoints({
    endpoints: builder => ({
        logIn : builder.mutation({
            query: data => ({
                url: 'login/',
                method: 'POST',
                body: data,
                // credentials: 'include'
            })
        }),
        logOut : builder.query({
            query: () => 'logout/'
        }),
        SignUp: builder.mutation({
            query: data => ({
                url: 'signup/',
                method: 'POST',
                body: data
            })
        }),
        forgotPassword : builder.mutation({
            query: data => ({
                url: 'password/forgot',
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: ({token, password, confirmPassword}) => ({
                url: `password/reset/${token}`,
                method: 'POST',
                body: {password, confirmPassword}
            })
        }),
        getMyProfile: builder.query({
            query: () => 'me/'
        }),
        getUsers : builder.query({
            query: () => 'users/'
        }),
        getUserById : builder.query({
            query: (id) => `users/${id}`
        })
    }),
    overrideExisting: false,
})

export const {useLogInMutation, useGetUserByIdQuery, useGetUsersQuery, useGetMyProfileQuery, useSignUpMutation, useForgotPasswordMutation, useResetPasswordMutation, useLogOutQuery} = userApi
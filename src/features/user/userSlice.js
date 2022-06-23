import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        isSignedIn:JSON.parse(localStorage.getItem('userProfile'))?.isSignedIn || false,
        name: JSON.parse(localStorage.getItem('userProfile'))?.name,
        full_name: JSON.parse(localStorage.getItem('userProfile'))?.full_name,
        email: JSON.parse(localStorage.getItem('userProfile'))?.email,
        picture: JSON.parse(localStorage.getItem('userProfile'))?.picture,
        isAdmin: JSON.parse(localStorage.getItem('userProfile'))?.isAdmin
    },
    reducers:{
        googleAuthUser: (state, action) => {
            // action.payload contains argument that we pass while calling(in dispatch)
            // console.log(action.payload);
            const {name, given_name, email, picture} = action.payload
            const profile = {
                isSignedIn:true,
                name: given_name,
                full_name: name,
                email,
                picture
            }
            localStorage.setItem('userProfile', JSON.stringify(profile))
            return {
                ...state,
                ...profile
            }
        },
        signUpUser : (state, action) => {
            const {avatar:{url:picture}, firstName, lastName, email, role=''} = action.payload

            const profile = {
                isSignedIn:true,
                isAdmin: role==='admin'?true: false,
                name : firstName,
                full_name: `${firstName} ${lastName}`,
                email,
                picture
            }
            localStorage.setItem('userProfile', JSON.stringify(profile))
            return {
                ...state,
                ...profile
            }
        },
        logInUser : (state, action) => {
            const {avatar:{url:picture}, name, email, role} = action.payload
            const [firstName, lastName] = name.split(' ')
            const profile = {
                isSignedIn:true,
                isAdmin: role==='admin'?true: false,
                name : firstName,
                full_name: name,
                email,
                picture
            }
            localStorage.setItem('userProfile', JSON.stringify(profile))
            return {
                ...state,
                ...profile
            }
        },
        logOutUser: (state) => {
            const profile = {
                isSignedIn:false,
                name: null,
                full_name:null,
                email:null,
                picture:null
            }
            localStorage.setItem('userProfile', JSON.stringify(profile))
            return {
                ...state,
                ...profile
            }
        }
    }
})

// export user action
export const {googleAuthUser, logOutUser, signUpUser, logInUser} = userSlice.actions

// export reducer
export default userSlice.reducer
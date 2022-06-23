import React, { useState } from 'react'
import useFormState from '../../hooks/useFormState'
import useToggle from '../../hooks/useToggle'
import { Avatar, Button, Paper, Grid, Typography, Container,Box, InputAdornment,InputLabel, IconButton, OutlinedInput, FormControl } from '@mui/material'
import { Checkbox, TextField, FormControlLabel } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';

import axios from 'axios'
import { googleAuthUser, signUpUser, logInUser } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Icon from '../google_icon'
import { useForgotPasswordMutation, useLogInMutation, useResetPasswordMutation, useSignUpMutation } from '../../features/user/userApiSlice'
/** COLORS:
 *   yellow - #e27117
 *   maroonish - #b83e3e
 */
const fetchGoogleUser = async token => {
    const resp = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo', {
        params:{
            access_token: token
        }
    })

    return resp.data
}

const initialState = { firstName:'', lastName:'', email:'', password:'' }

const Auth = () => {
    // const currUser = useSelector(state => state.user)
    // console.log('current user is',currUser);

    const [isSignUp, toggleSignUp] = useToggle(false)
    const [forgotPassword, toggleForgotPassword] = useToggle(false)
    const [showPassword, toggleShowPassword] = useToggle(false)
    const [formData, setFormData] = useState(initialState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logIn, {isLoading}] = useLogInMutation()
    const [signUp,{}] = useSignUpMutation()
    
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            // console.log(tokenResponse);
            const {access_token} = tokenResponse
            const user = await fetchGoogleUser(access_token)
            // console.log(user);
            if(user.email_verified) dispatch(googleAuthUser(user))
            else console.log(user.error);

            navigate('/')
        },
        onError:() => {console.log('Failed');},
    })

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (evt)=>{
        evt.preventDefault()
        if(isSignUp){
            const {firstName, lastName, email, password} = formData

            const result = await signUp({firstName:firstName.trim(), lastName:lastName.trim(), email:email.trim().toLowerCase(), password})

            // console.log(result);
            if(result.data){
                const {data} = result
                if(data.success){
                    // console.log(data);
                    const {user} = data

                    dispatch(signUpUser(user))
                    navigate('/')
                    
                }
            } else{
                alert(`Error: ${result.error.data.message}`)
            }
        }
        else{
            const {email, password} = formData

            const result = await logIn({email:email.trim().toLowerCase(), password})
            // console.log(result);

            if(result.data){
                const {data} = result
                if(data.success){
                    // console.log(data);
                    const {user} = data

                    dispatch(logInUser(user))
                    navigate('/')
                }
            }
            else{
                alert(`${result.error.data.message}`)
            }
        }
    }
    
    return (
        <Container component="main" maxWidth="xs">
              <Paper elevation={12} sx={{bgcolor:'white', px:3, pb:2}}>
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    {forgotPassword ? 'Reset Password' : isSignUp ? 'Sign Up' :'Log In'}
                    </Typography>

                    {forgotPassword ?
                     <ForgotPassword forgotPassword={forgotPassword} toggleForgotPassword={toggleForgotPassword} />
                    :
                    <Box component='form' sx={{ mt: 1 }} onSubmit={handleSubmit}>

                        {isSignUp && (
                        <>
                           <Grid container spacing={2}>
                               <Grid item xs={6}>
                                <TextField margin="normal" required fullWidth id="firstName" label='First Name' name="firstName" onChange={handleChange}
                                    /> 

                               </Grid>
                               <Grid item xs={6}>
                                <TextField margin="normal" required fullWidth id="lastName" label='Last Name' name="lastName" onChange={handleChange}
                                    /> 

                               </Grid> 
                           </Grid>
                        </>
                        )}
                        <> 
                        <Grid container spacing={1}>
                            
                            <Grid item xs={12}>
                                <TextField margin="normal" required fullWidth id="email" label='Email Address' name="email" onChange={handleChange}
                                />
                            </Grid>
                        
                            <Grid item xs={12}>
                                <Password label='Password' showPassword={showPassword} toggleShowPassword={toggleShowPassword} handleChange={handleChange}/>
                            </Grid>
                        </Grid>
                            <Button type='submit' fullWidth variant="contained" sx={{ mt: 3, mb: 2 , bgcolor:'#0a1c47', '&:hover': {bgcolor:'#163681'}}}
                            >
                            {isSignUp ? 'Sign Up' :'Log In'}
                            </Button>
                            <Button startIcon={<Icon />} fullWidth variant='contained' sx={{bgcolor:'#b83e3e', '&:hover': {bgcolor:'#903030'} }} onClick={login}>Google Sign In</Button>
                            <Grid container pt={2}>
                                {isSignUp 
                                ? 
                                <>
                                    <Grid item >
                                        <Button size='small' onClick={toggleSignUp}> 
                                            Already have account? Log In 
                                        </Button>
                                    </Grid>
                                </>
                                : 
                                <>
                                    <Grid item xs>
                                        <Button size='small' onClick={toggleForgotPassword}>
                                            Forgot password ?
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size='small' onClick={toggleSignUp}>
                                            Don't have an account? Sign Up
                                        </Button>
                                    </Grid>
                                </>}
                            </Grid>
                        </>

                        
                    </Box>
                     }


                </Box>

              </Paper>
            </Container>
    )
}

const Password = ({label='Password', handleChange, showPassword, toggleShowPassword, name='password'})=>{
    return (
        <>
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput fullWidth name={name} label='Password' required type={showPassword ? 'text' : 'password'} id={name} onChange={handleChange} endAdornment={
                    <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
        </>
    )
}

const initialConfirm = {email:'', password:'', confirmPassword:'', token:''}

const ForgotPassword = ({forgotPassword, toggleForgotPassword})=>{
    const [resetPassword, toggleResetPassword] = useToggle(false)
    const [showPassword, toggleShowPassword] = useToggle(false)
    const [formData, setFormData] = useState(initialConfirm)
    const navigate = useNavigate()

    const [forgotPassReq, {}] = useForgotPasswordMutation()
    const [resetPassReq, {}] = useResetPasswordMutation()

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const {token, password, confirmPassword} = formData

        if(!token.trim()) alert('Token is empty')
        else{
            if(password!==confirmPassword) alert("Password doesn't match! Please retry")
            else{
                // console.log({token, password, confirmPassword});
                const resp = await resetPassReq({token:token.trim(), password, confirmPassword})
                
                if(resp.data){
                    const {data} = resp
                    if(data.success){
                        navigate('/')
                        setTimeout(()=>alert('Password is reset Succesfully.'), 500) 
                    }
                } else{
                    alert(resp.error.data.message)
                }
            }
        }
    }
    return (
        <Box component='form' onSubmit={handleSubmit}>
            <Grid container spacing={1}>
            {(forgotPassword && !resetPassword) ?
            <>
            <Grid item xs={12}>
                <TextField margin="normal" required fullWidth id="email" label='Email Address' name="email" onChange={handleChange} />
            </Grid>
            <Grid item xs>
                <Button size='small' onClick={toggleForgotPassword}>
                    Cancel
                </Button>
            </Grid>
            <Grid item>
                <Button size='small' onClick={async () => {
                    const {email} = formData
                    if(email.trim()){
                        // console.log('MAKING FORGOT PASS REQUEST', email);
                        // console.log(resetPassword);
                        const resp = await forgotPassReq({email:email.trim().toLowerCase()})
                        // console.log(resp);
                        if(resp.data){
                            const {data} = resp
                            if(data.success){
                                toggleResetPassword()
                            }
                        } else{
                            const {error} = resp
                            alert(`${error.data.message}`)
                        }
                    } else {
                        alert('Email must not be empty')
                    }
                    }}>
                    Submit
                </Button>
            </Grid> 
            </>
            :
            resetPassword ?
            <>
                <Grid item xs={12}>
                    <TextField margin="normal" required fullWidth id="token" label='Token' name="token" onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <Password  showPassword={showPassword} toggleShowPassword={toggleShowPassword} handleChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                    <Password name='confirmPassword' label='Confirm Password' showPassword={showPassword} toggleShowPassword={toggleShowPassword} handleChange={handleChange}/>
                </Grid>
                <Button type='submit' fullWidth variant="contained" sx={{ mt: 3, mb: 2 , bgcolor:'#0a1c47', '&:hover': {bgcolor:'#163681'}}}
                            >
                            Submit
                </Button>
            </>
            : 
            null}
            </Grid>
        </Box>
    )
}
export default Auth
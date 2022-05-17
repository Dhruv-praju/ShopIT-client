import React from 'react'
import useFormState from '../../hooks/useFormState'
import useToggle from '../../hooks/useToggle'
import { Avatar, Button, Paper, Grid, Typography, Container,Box, InputAdornment,InputLabel, IconButton, OutlinedInput, FormControl } from '@mui/material'
import { Checkbox, TextField, FormControlLabel } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { GoogleLogin } from 'react-google-login';
import icon from '../google_icon'

const Auth = () => {

    const [isSignUp, toggleSignUp] = useToggle(false)
    const [showPassword, toggleShowPassword] = useToggle(false)

    const googleSuccess = () => {

    }

    const googleFailure = () => {
        console.log('GOOGLE SIGN IN WAS UNSUCCESSFUL !!');
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
                    {isSignUp ? 'Sign Up' :'Log In'}
                    </Typography>


                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        {isSignUp && (
                        <>
                           <Grid container spacing={2}>
                               <Grid item xs={6}>
                                <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label='First Name'
                                        name="firstName"
                                        
                                    /> 

                               </Grid>
                               <Grid item xs={6}>
                                <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label='Last Name'
                                        name="lastName"
                                        
                                    /> 

                               </Grid> 
                           </Grid>
                        </>
                        )}
                        <> 
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label='Email Address'
                                    name="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        name="password"
                                        label='Password'
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={toggleShowPassword}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 , bgcolor:'#0a1c47', '&:hover': {bgcolor:'#0a1c47'}}}
                            >
                            {isSignUp ? 'Sign Up' :'Log In'}
                            </Button>
                            <GoogleLogin 
                                clientId='GOOGLE ID'
                                render={renderProps => (
                                    <Button variant='contained' fullWidth onClick={renderProps.onClick}>
                                        Google Sign In
                                    </Button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                            />
                            <Grid container>
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
                                        <Button size='small'>
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
                </Box>

              </Paper>
            </Container>
    )
}

export default Auth
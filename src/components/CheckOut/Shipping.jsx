import { Grid, Paper, Typography, TextField, Button, Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

const validateInput = ({address, city, pincode, phoneNo}) => {
  if(address.trim() && city.trim() && pincode.trim() && phoneNo.trim()){
    if(!Number(pincode)) return {valid: false, msg: 'Pincode must be Numeric'}
    if(!Number(phoneNo)) return {valid: false, msg: 'Phone Number must be Numeric'}
    if(phoneNo.trim().length !== 10) return {valid: false, msg: 'Phone Number must be of 10 digits'}
    return {valid: true, msg:'VALIDATED'}
  }
  return {valid: false, msg: 'Empty Input is not valid'}
}

const initialData = JSON.parse(localStorage.getItem('shipmentInfo')) || {address:'', city:'', pincode:'', phoneNo: ''}
const Shipping = () => {
    const [formData, setFormData] = useState(initialData)

    const {handleNext} = useOutletContext()
    const navigate = useNavigate()
    
    const handleChange = (e)=> {
      setFormData({...formData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (evt) => {
      evt.preventDefault()
      // console.log('submitted');
      // console.log(formData);
      const {valid, msg} = validateInput(formData)
      if(valid){
        localStorage.setItem('shipmentInfo', JSON.stringify(formData))
        handleNext()
        navigate('/checkout/confirm', {state:formData})
      } else { 
        alert(msg)
      }
    }
  return (
    <Container component='main' maxWidth='xs'>

      <Paper elevation={4} sx={{padding:3}}>
        <Box component='form' onSubmit={handleSubmit}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Typography variant='h4' component='div' gutterBottom>
                Shipping Info
              </Typography>
            </Grid>
            <Grid item>
              <TextField required fullWidth id="filled-basic" label="Address" name='address' onChange={handleChange} value={formData.address} variant="filled" />
            </Grid>
            <Grid item>
              <TextField required fullWidth id="filled-basic" label="City" name='city' onChange={handleChange} value={formData.city} variant="filled" />
            </Grid>
            <Grid item>
              <TextField required fullWidth id="filled-basic" label="Pincode" name='pincode' onChange={handleChange} value={formData.pincode} variant="filled" />
            </Grid>
            <Grid item>
              <TextField required fullWidth id="filled-basic" label="Phone No." name='phoneNo' onChange={handleChange} value={formData.phoneNo} variant="filled" />
            </Grid>
            <Grid item mt={3}>
              <Button color='warning' type='submit' variant='contained' fullWidth>
                CONTINUE
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}

export default Shipping
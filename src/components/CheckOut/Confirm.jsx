import { Container, Grid, Typography, Paper, Button } from '@mui/material'
import { Box } from '@mui/system'
import { styled } from "@mui/material/styles";
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

const Img = styled("img")({
  marginY: "auto",
  display: "block",
  maxWidth: "60%",
  maxHeight: "60%",
});

const Confirm = () => {
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)

  // Calculate order prices
  const itemsPrice = cart.items.reduce((sum, currItem) => (sum + currItem.price*currItem.qty), 0)
  const shippingPrice = itemsPrice > 200 ? 0 : 25
  const taxPrice = Number((itemsPrice*(5/100)).toFixed(2))
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2))

  const {handleNext} = useOutletContext()
  const {state:destinationInfo} = useLocation()

  const navigate = useNavigate()

  const processToPayment = ()=>{
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      shipmentInfo:{destination:destinationInfo}
    }

    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    handleNext()
    navigate('/checkout/payment')
  }
  // console.log('confirming',destinationInfo);
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3}>
        <Grid item xs sm={8} container spacing={3} >

          <Grid item xs={12}>
            <Typography variant='h4' component='div' gutterBottom>
              Shipping Info
            </Typography>
            <Box pl={3} pb={3} sx={{borderBottom:1 ,borderColor:'#aaa'}}>
              <Typography component='div' gutterBottom fontWeight='medium' fontSize={17}>
                Name: 
              <Typography variant='body1' component='span'> {user.full_name}</Typography>
              </Typography>
              <Typography component='div' gutterBottom fontWeight='medium' fontSize={17}>
                Phone:  
              <Typography variant='body1' component='span'> {destinationInfo.phoneNo}</Typography>
              </Typography>
              <Typography component='div' gutterBottom fontWeight='medium' fontSize={17}>
                Address:  
              <Typography variant='body1' component='span'> {destinationInfo.address}, {destinationInfo.city} - {destinationInfo.pincode}, Maharashtra, India</Typography>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h4' component='div' gutterBottom>
              Your Cart Items:
            </Typography>
            {cart.items.map(item => {
              return (
                <Paper variant="outlined" sx={{maxHeight: '8rem', marginBottom:2}} key={item.product}>

                  <Grid container spacing={1}>
                    <Grid item xs display='flex' justifyContent='center' alignItems='center'>
                      <Img src={item.url} />
                    </Grid>

                    <Grid item xs display='flex' justifyContent='center' alignItems='center'>
                      <Typography variant="h6" component="div" gutterBottom fontWeight={400}>
                        {item.name}
                      </Typography>
                    </Grid>

                    <Grid item xs display='flex' justifyContent='center' alignItems='center'>
                      <Typography variant="body1" component="div" gutterBottom>
                        {item.qty} x ${item.price} = <Box component='span' fontWeight={600}>${item.qty*item.price}</Box>
                      </Typography>
                    </Grid>
                  </Grid>

                </Paper>

              )
            })}
          </Grid>
        </Grid>

        <Grid item xs sm={4}>
          <Paper variant='outlined'>
            <Grid container direction='column'>
              <Typography variant='h4' component='div' gutterBottom align='center' p={2}>
                Order Summary
              </Typography>
              <Box display='flex' justifyContent='space-between' paddingX={1} marginX={2}>
                <Box>
                  <Typography marginBottom>Subtotal:</Typography>
                  <Typography marginBottom>Shipping:</Typography>
                  <Typography marginBottom>Tax:</Typography>
                </Box>
                <Box>
                  <Typography align='right' fontWeight={800} marginBottom>${itemsPrice}</Typography>
                  <Typography align='right' fontWeight={800} marginBottom>${shippingPrice}</Typography>
                  <Typography align='right' fontWeight={800} marginBottom>${taxPrice}</Typography>
                </Box>
              </Box>
              <Box display='flex' justifyContent='space-between' paddingX={1} borderTop={2} borderBottom={2} borderColor='#ddd' marginX={2} paddingY={1}>
                <Typography marginBottom>Total:</Typography>
                <Typography align='right' fontWeight={800}>${totalPrice}</Typography>
              </Box>
              <Box p={4} pb={3}>
                <Button fullWidth color='warning' variant='contained' size='large' sx={{borderRadius:6}} onClick={processToPayment}>
                    Proceed to Payment
                </Button>
              </Box>

            </Grid>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  )
}

export default Confirm
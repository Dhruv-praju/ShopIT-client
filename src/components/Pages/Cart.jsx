import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../Cart/CartItem';

const Cart = () => {
    const cart = useSelector(state => state.cart)
    // console.log(cart);
    const itemPrice = cart.items.reduce((sum, currItem) => (sum + currItem.price*currItem.qty), 0)
    const totalQty = cart.items.reduce((sum, currItem) => (sum + currItem.qty), 0)
  return (
    <>
    {cart.items.length ? 
        <Grid container mt={4}>
            <Grid item xs={12}>
                <Typography variant='h4' component='div'>
                    Your Cart: {cart.items.length} items
                </Typography>
            </Grid>
    
            <Grid item container spacing={3}>
                <Grid item xs>
                    {cart.items.map(item => <CartItem key={item.product} id={item.product} qty={item.qty}/>)}
                </Grid>

                <Grid item xs={4} mt={1.5}>
                    <Paper variant='outlined'>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h4' component='div' gutterBottom justifyContent='center' mt={3}>
                                Order Summary
                            </Typography>
                        </Box>
                        <Box p={3}>
                            <Typography variant='h6' component='div' gutterBottom>
                                Subtotal ({totalQty} units) : $ {itemPrice}
                            </Typography>
                        </Box>
                        <Box px={4} pb={3}>
                            <Button fullWidth color='warning' variant='contained' size='large' sx={{borderRadius:6}}>
                                Check out
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    
    : <Typography variant='h4' p={4} component='div'>Your Cart is Empty</Typography>}
    </>
  )
}

export default Cart
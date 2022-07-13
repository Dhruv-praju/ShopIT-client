import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import {useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements, CardElement, PaymentElement} from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Paper, Typography } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import { useCreateOrderMutation, useGetStripeAPIkeyQuery, useProcessPaymentMutation } from "../../features/order/orderApiSlice";
import { removeItems } from '../../features/cart/cartSlice'

const Payment = () => {
  
  const [processPayment, {}] = useProcessPaymentMutation()
  const [createOrder, {}] = useCreateOrderMutation()
  const {handleNext} = useOutletContext()

  const stripe = useStripe()
  const elements = useElements()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)
  const cartItems = cart.items.map(({product, qty}) => ({product, qty}))
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  const order = {
    orderItems: cartItems,
    ...orderInfo
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if (!stripe || !elements) {
      // 
      return;
    }

    const result = await processPayment({amount:order.totalPrice})
    // console.log(result);
    if(result.data){
      const {success, client_secret} = result.data
      if(success){

        const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                alert(result.error.message);
            } else {
              // console.log('SUCCESSFULLY DONE PAYMENT');

                order.paymentInfo ={
                  mode: 'online',
                  status: 'paid'
                }

                // console.log(order);
                const result = await createOrder(order)

                if(result.data){
                  const {success} = result.data
                  if(success) {

                    localStorage.removeItem('items')
                    sessionStorage.removeItem('orderInfo')
                    dispatch(removeItems())
                    handleNext()
                    setTimeout(()=> alert('Successfully placed your order'), 800)
                    navigate('/')
                  }
                }
            }

      }
    }
  }
  return (
      <Container component='main' maxWidth='xs'>
        <Paper>
          <Typography component='div' variant='h4' marginBottom>
            Card Info
          </Typography>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <Button fullWidth variant='contained' type='submit' sx={{marginTop:2}}>Pay</Button>
          </form>
        </Paper>
      </Container>
  )
}

export const PaymentWrapper = (props) => {
  const {isSuccess, data} = useGetStripeAPIkeyQuery()
  // console.log(data);
  
  return (
    isSuccess ? 
    <Elements stripe={loadStripe(data.stripeApiKey)}>
      {props.children}
    </Elements>
    : null
  
  )
}
export default Payment
import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography, CircularProgress, Box, Grid, ButtonBase, Rating, Button, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useGetProductByIdQuery } from '../../features/product/productApiSlice'
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Product = () => {
  const {id} = useParams()
  const [qty, setQty] = useState(1)

  const {isSuccess ,data, isLoading, isError, error} = useGetProductByIdQuery(id)
  let product
  if(isSuccess){
    const {product:pr} = data
    product = pr
    console.log(product);
  }
  return (
    <>{isError ? <h1>Product NOT FOUND!!</h1> :
      isLoading ? 
      <Box 
        width='100%' 
        height='50rem' 
        display='flex' 
        justifyContent='center' 
        alignItems='center'>
        <CircularProgress size={50} thickness={4} />
      </Box> : 
      isSuccess ? 
      <>
          <Grid container mt={6}>
            <Grid item xs> 
              <ButtonBase>
                <Img alt={product.name} src={product.image.url}/>
              </ButtonBase>
            </Grid>

            <Grid item container direction='column' xs>
              <Grid item>
                <Typography variant="h4" gutterBottom component="div">
                  {product.name}
                </Typography>
              </Grid>

              {product.company && 
              <Grid item>
                <Typography variant="h6" gutterBottom component="div">
                  Company : {product.company}
                </Typography>
              </Grid>}

              <Grid item container>
                <Grid item>
                  <Rating value={product.ratings} size='large' readOnly/>
                </Grid>
                <Grid item mt={.5} pl={1}>
                  <Typography variant='body1' gutterBottom>
                    ({product.reviews.length}) Reviews
                  </Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Typography variant='h3' gutterBottom>
                {'\u0024'} {product.price}
                </Typography>
              </Grid>

              <Grid item container>
                <Grid item>
                  <IconButton  color='error' component='span' onClick={()=> setQty(prevQty => prevQty-1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant='h5' component='span'>
                    {qty}
                  </Typography>
                  <IconButton  color='primary' component='span' disabled={qty===product.stock} onClick={() => setQty(prevQty => prevQty+1)}>
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Button color='warning' sx={{borderRadius:8}} variant="contained">Add to Cart</Button>
                </Grid>
              </Grid>

              <Grid item>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Status: {product.stock ? 'In stock' : 'Out of Stock'}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h5' component='div' gutterBottom>
                  Description :
                </Typography>
                <Typography variant='subtitle1' component='div' gutterBottom>
                  {product.description}
                </Typography>
              </Grid>
              <Grid item></Grid>
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
      </>
      : null}
    </>
  )
}

export default Product
import React from 'react'
import { Grid, CircularProgress, Box } from '@mui/material'
import { useGetAllProductsQuery } from '../../features/product/productApiSlice'
import ProductCard from '../Product/ProductCard'

const Home = () => {
  const {data, isLoading, error} = useGetAllProductsQuery()
  // console.log(data);
  return (
    <>  
      {error ? <h1>Oh no, There was an error</h1> :
       isLoading ? 
       <Box width='100%' height='50rem' display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress size={50} thickness={4} />
        </Box> : 
       data ? 
        <Grid container rowSpacing={4} spacing={1} pt={3}>
          {data?.products.map(p => 
            <Grid item key={p._id} display='flex' justifyContent='center' xs={12} sm={6} md={4} lg={3}>
                <ProductCard name={p.name} img={p.image} price={p.price}/>
            </Grid>
            )}
        </Grid>
       : 
        null
      }
    </>
  )
}

export default Home
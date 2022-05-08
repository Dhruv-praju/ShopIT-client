import React from 'react'
import { Grid } from '@mui/material'
import Product from '../Product/Product'

import products from '../../shopData'

const Home = () => {
  return (
    <>
        <Grid container rowSpacing={4} spacing={1} pt={3}>
          {products.map(p => 
            <Grid item display='flex' justifyContent='center' xs={12} md={6} lg={3}>
                <Product name={p.name} img={p.image} price={p.price}/>
            </Grid>
            )}
        </Grid>
    </>
  )
}

export default Home
import React from 'react'
import { Grid } from '@mui/material'
import Product from '../Product/Product'

const Home = () => {
  return (
    <>
        <Grid container spacing={1} pt={3}>
            <Grid item xs={12} md={6} lg={4}>
                <Product/>
            </Grid>
        </Grid>
    </>
  )
}

export default Home
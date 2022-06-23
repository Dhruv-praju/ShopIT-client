import React, { useState } from 'react'
import { Grid, CircularProgress, Box, Pagination } from '@mui/material'
import ProductCard from '../Product/ProductCard'

import { useGetProductsBySearchQuery } from '../../features/product/productApiSlice'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
    const [searchParams] = useSearchParams()
    const searchVal = searchParams.get('q')
    // console.log(searchVal);

    const [page, setPage] = useState(1)
    const {data, isLoading, error} = useGetProductsBySearchQuery(searchVal, page)

    const handlePageChange = (evt, value) => {
        // console.log('Page changed', value)
        setPage(value)
      }

  return (
    <>  
      {error ? <h1>Oh no, There was an error</h1> :

       isLoading ? 
       <Box width='100%' height='50rem' display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress size={50} thickness={4} />
        </Box> : 

       data?.success && data?.products.length ? 
       <>
        <Grid container rowSpacing={4} spacing={1} pt={3}>
          {data?.products.map(p => 
            <Grid item key={p._id} display='flex' justifyContent='center' xs={12} sm={6} md={4} lg={3}>
                <ProductCard id={p._id} name={p.name} img={p.image.url} price={p.price}/>
            </Grid>
            )}
        </Grid>
        <Pagination count={Math.ceil(data.totalProducts/6)} page={page} onChange={handlePageChange}/>
       </>

       : 
        null
      }
    </>
  )
}

export default Search
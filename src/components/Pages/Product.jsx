import React from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'
import { useGetProductByIdQuery } from '../../features/product/productApiSlice'

const Product = () => {
  const {id} = useParams()
  const {isSuccess ,data, isLoading, isError, error} = useGetProductByIdQuery(id)

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
      <div>
          <h1>Product Details of {id}</h1>
      </div>
      : null}
    </>
  )
}

export default Product
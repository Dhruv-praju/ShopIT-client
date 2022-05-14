import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../../features/product/productApiSlice'

const Product = () => {
  const {id} = useParams()
  const {data, isLoading, error} = useGetProductByIdQuery(id)
  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <div>
        <h1>Product Details of {id}</h1>
    </div>
  )
}

export default Product
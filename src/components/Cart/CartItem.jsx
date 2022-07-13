import React from "react";
import { Grid, Paper, Typography, IconButton, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetProductByIdQuery } from "../../features/product/productApiSlice";
import { useState } from "react";
import { decrementQty, incrementQty, removeItemFromCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const Img = styled("img")({
  margin: "auto", 
  display: "block",
  maxWidth: "100%",
  maxHeight: "80%",
});

const CartItem = ({ id, qty }) => {
  const { isSuccess, data, isError, error } = useGetProductByIdQuery(id);

  let product;
  if (isSuccess) product = data.product;
//   console.log('CART ITEM IS',data)

  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch()

  return isSuccess ? (
    <Paper variant="outlined" sx={{ marginY: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs m={1}>
          <Img src={product.image.url} />
        </Grid>

        <Grid item xs display='flex' justifyContent='center' alignItems='center'>
          <Typography variant="h6" component="div" gutterBottom>
            {product.name}
          </Typography>
        </Grid>

        <Grid item xs display='flex' justifyContent='center' alignItems='center'>
          <Typography variant="body1" component="div" gutterBottom>
            ${product.price}
          </Typography>
        </Grid>

        <Grid item xs display='flex' justifyContent='center' alignItems='center'>
          <IconButton
            color="error"
            component="span"
            disabled={quantity === 0}
            onClick={() => {
                setQuantity((prevQty) => prevQty - 1)
                dispatch(decrementQty({id:product._id, qty:quantity}))
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="h6" component="span">
            {quantity}
          </Typography>
          <IconButton
            color="primary"
            component="span"
            disabled={quantity >= product.stock}
            onClick={() => {
                setQuantity((prevQty) => prevQty + 1)
                dispatch(incrementQty(product._id))
            }}
          >
            <AddIcon />
          </IconButton>
        </Grid>

        <Grid item xs display='flex' justifyContent='center' alignItems='center'>
          <Button
            size="small"
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={()=> dispatch(removeItemFromCart(product._id))}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  ) : isError ? (
    <h2>Error : {error.data.message}</h2>
  ) : null;
};

export default CartItem;

import React from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Box,
  Grid,
  ButtonBase,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetProductByIdQuery } from "../../features/product/productApiSlice";
import { red } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ShoppingCartRounded } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Product = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const { isSuccess, data, isLoading, isError, error } =
    useGetProductByIdQuery(id);

  const dispatch = useDispatch();

  let product;
  if (isSuccess) {
    const { product: pr } = data;
    product = pr;
    // console.log(product);
  }
  return (
    <>
      {isError ? (
        <h1>Product NOT FOUND!!</h1>
      ) : isLoading ? (
        <Box
          width="100%"
          height="50rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={50} thickness={4} />
        </Box>
      ) : isSuccess ? (
        <>
          <Grid container mt={1} columnSpacing={5} rowSpacing={5}>
            <Grid
              item
              xs={12}
              sm={5}
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
            >
              <ButtonBase>
                <Img alt={product.name} src={product.image.url} />
              </ButtonBase>
            </Grid>

            <Grid item container direction="column" xs={12} sm={7}>
              <Grid item>
                <Typography variant="h4" gutterBottom component="div">
                  {product.name}
                </Typography>
              </Grid>

              {product.company && (
                <Grid item>
                  <Typography variant="h6" gutterBottom component="div">
                    Company : {product.company}
                  </Typography>
                </Grid>
              )}

              <Grid
                item
                container
                sx={{ borderTop: 1, borderBottom: 1, borderColor: "#aaa" }}
                paddingY={2}
              >
                <Grid item>
                  <Rating value={product.ratings} size="large" readOnly />
                </Grid>
                <Grid item mt={0.5} pl={1}>
                  <Typography variant="body1" gutterBottom>
                    ({product.reviews.length}) Reviews
                  </Typography>
                </Grid>
              </Grid>

              <Grid item paddingTop={2}>
                <Typography variant="h3" gutterBottom>
                  {"\u0024"} {product.price}
                </Typography>
              </Grid>

              <Grid item container paddingY={1}>
                <Grid item>
                  <IconButton
                    color="error"
                    component="span"
                    disabled={qty === 0}
                    onClick={() => setQty((prevQty) => prevQty - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h5" component="span">
                    {qty}
                  </Typography>
                  <IconButton
                    color="primary"
                    component="span"
                    disabled={qty === product.stock}
                    onClick={() => setQty((prevQty) => prevQty + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item ml={6}>
                  <Button
                    color="warning"
                    sx={{ borderRadius: 3 }}
                    disabled={qty === 0}
                    variant="contained"
                    startIcon={<ShoppingCartRounded />}
                    onClick={() => {
                      const { _id: product_id, price, stock, name, image:{url} } = product;
                      //  console.log(product);
                      dispatch(addItemToCart({ product_id, qty, price, stock, name, url }));
                    }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{ borderTop: 1, borderBottom: 1, borderColor: "#aaa" }}
                p={1}
              >
                <Typography variant="subtitle1" gutterBottom component="div">
                  Status: {product.stock ? "In stock" : "Out of Stock"}
                </Typography>
              </Grid>

              <Grid item pt={1} mt={1}>
                <Typography variant="h5" component="div" gutterBottom>
                  Description :
                </Typography>
                <Typography variant="subtitle1" component="div" gutterBottom>
                  {product.description}
                </Typography>
              </Grid>
              {product.reviews.length ? (
                <Grid item sx={{ borderTop: 1, borderColor: "#aaa" }} pt={1}>
                  <Typography variant="h6" component="div" gutterBottom>
                    Reviews:
                  </Typography>
                  {product.reviews.map(({ name, rating, comment }) => (
                    <Grid item pb={3}>
                      <Rating value={rating} readOnly />
                      <Typography
                        variant="subtitle1"
                        component="div"
                        gutterBottom
                      >
                        {comment}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              ) : null}
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default Product;

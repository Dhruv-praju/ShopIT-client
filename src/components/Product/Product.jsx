import React from 'react'
import { Card, CardMedia, CardActions, CardContent, Typography, Button,Box, Rating } from '@mui/material'
import sampleImg from '../../images/ssd.jpg'

const Product = ({img, name, price, ratings=4, n_reviews=33}) => {
    return(
        <Card elevation={4} sx={{ maxWidth: 250 }}>
            <Box px={2} pt={2} display='flex' justifyContent='center'>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    sx={{width:160}}
                    height='15%'
                    src={img}
                />
            </Box>
            <Box sx={{ flexDirection: 'column', alignItems:'flex-end' }} >
            <CardContent sx={{pb:1}}>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {name}
                </Typography>
                <Box display='flex' alignItems='center'>
                    <Rating name="read-only" value={ratings} precision={0.5} readOnly />
                    <Typography variant='subtitle2' component='p' pl={1} sx={{paddingTop:0.3, color:'#737373'}}>
                        ({n_reviews} Reviews)
                    </Typography>
                </Box>
                <Typography variant='h6' component='div' pt={1}>
                    $ {price}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent:'center'}}>
                <Button size="large" variant='contained' sx={{width:'100%',background:'#ff9800', '&:hover':{background:'#b26a00'}}}>View Details</Button>
            </CardActions>
            </Box>
        </Card>
    )
}

export default Product
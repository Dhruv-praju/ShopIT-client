import React from 'react'
import { Card, CardMedia, CardActions, CardContent, Typography, Button,Box, Rating } from '@mui/material'
import sampleImg from '../../images/ssd.jpg'

const Product = () => {
    return(
        <Card elevation={4} sx={{ maxWidth: 250 }}>
            <Box px={2} pt={2}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height='auto'
                    image={sampleImg}
                />
            </Box>
            <CardContent sx={{pb:1}}>
                <Typography gutterBottom variant="subtitle1" component="div">
                    SAMSUNG SSD T7 Portable External Solid State Drive
                </Typography>
                <Box display='flex' alignItems='center'>
                    <Rating name="read-only" value={3.3} precision={0.5} readOnly />
                    <Typography variant='subtitle2' component='p' pl={1} sx={{paddingTop:0.3, color:'#737373'}}>
                        (33 Reviews)
                    </Typography>
                </Box>
                <Typography variant='h6' component='div' pt={1}>
                    $ 114
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent:'center'}}>
                <Button size="large" variant='contained' sx={{width:'100%',background:'#ff9800', '&:hover':{background:'#b26a00'}}}>View Details</Button>
            </CardActions>
        </Card>
    )
}

export default Product
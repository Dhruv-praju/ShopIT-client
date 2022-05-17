import React from 'react'
import { Card, CardMedia, CardActions, CardContent, Typography, Button,Box, Rating } from '@mui/material'
import {Link} from 'react-router-dom'
import sampleImg from '../../images/ssd.jpg'

const ProductCard = ({id, img=sampleImg, name='SAMSUNG SSD', price=114, ratings=4, n_reviews=33}) => {
    return(
        <Card elevation={4} sx={{ maxWidth: 250 }}>
            <Link to={`/${id}`}>
                <Box px={2} pt={2} display='flex' justifyContent='center'>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        sx={{width:160}}
                        height='15%'
                        src={img}
                    />
                </Box>
            </Link>
            <Box sx={{ flexDirection: 'column', alignItems:'flex-end' }} >
            <CardContent sx={{pb:1}}>
                <Typography 
                    gutterBottom 
                    variant="subtitle1" 
                    component={Link} 
                    to={`/${id}`}
                    sx={{textDecoration:'none', color:'black'}}>
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
                    <Button 
                        size="large"
                        component={Link}
                        to={`/${id}`}
                        variant='contained'
                        sx={{width:'100%',background:'#ff9800', '&:hover':{background:'#b26a00'}}}>
                            View Details
                    </Button>
            </CardActions>
            </Box>
        </Card>
    )
}

export default ProductCard
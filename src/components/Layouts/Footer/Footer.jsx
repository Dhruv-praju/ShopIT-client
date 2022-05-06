import styled from '@emotion/styled'
import { Box,Typography } from '@mui/material'
import React from 'react'

const footer = styled('div')`
 position: fixed,
 bottom:0
`
const Footer = () => {
  return (
      <Box sx={{position:'fixed',bottom:0, width:'100%'}}>
        <Typography variant='body1' component='p' align='center'>
          Shopping Cart - 2022-2023, All Rights Reserved
        </Typography>
      </Box>
  )
}

export default Footer
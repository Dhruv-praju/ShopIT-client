import React from 'react'
import { styled } from '@mui/material/styles';

const Title = styled('h1')`
    color:red;
    :hover{
        color:blue
    }
`

const PageLayout = () => {
  return (
    <div>
        <Title>
        This is PageLayout
        </Title>
    </div>
  )
}

export default PageLayout
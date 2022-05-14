import React from 'react'
import { Container } from '@mui/material';
import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';


const PageLayout = () => {
  return (
    <>
        <Header />

        <Container maxWidth='lg'>
            <Outlet />
        </Container>

        <Footer />
    </>
  )
}

export default PageLayout
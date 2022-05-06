import React from 'react'
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';


const PageLayout = () => {
  return (
    <>
        <Header />

        <Grid container>
            <Grid item>
                <Outlet />
            </Grid>
        </Grid>

        <Footer />
    </>
  )
}

export default PageLayout
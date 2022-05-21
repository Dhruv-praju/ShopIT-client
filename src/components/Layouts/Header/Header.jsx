import React, {useState} from 'react'
import { AppBar, Toolbar,IconButton, Button, Typography,Box, InputBase, MenuItem, Menu, Avatar } from '@mui/material'
// import {MenuIcon} from '@mui/icons-material'
import logo from '../../../images/logo.png'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { logOutUser } from '../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '50%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const user = useSelector(state => state.user)
  // console.log(user);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background:'#0a1c47'}}>
        <Toolbar>
          <Link to='/'><img alt='logo' src={logo} /></Link>
          <Typography variant="h6" component="div" px={2}>
            News
          </Typography>

          <Box flexGrow={1}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>


          <Button color="inherit">Cart (3)</Button>
          { user.isSignedIn ? (
            <Box sx={{ flexGrow: 0 }} px={1} ml={2}>
                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user.picture} />
                </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                  <MenuItem onClick={handleClose}>
                    <Typography textAlign="center">Orders</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={()=>{
                    handleClose()
                    dispatch(logOutUser())
                    navigate('/')
                    }}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
              </Menu>
            </Box>
          ): (
            <>
              <Button component={Link} to='/auth' color="inherit">Login</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Header
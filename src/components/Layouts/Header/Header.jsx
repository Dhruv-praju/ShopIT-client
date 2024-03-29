import React, {useState} from 'react'
import { AppBar, Toolbar,IconButton, Button, Typography,Box, InputBase, MenuItem, Menu, Avatar, Badge } from '@mui/material'
// import {MenuIcon} from '@mui/icons-material'
import logo from '../../../images/logo.png'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { logOutUser } from '../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../../../features/user/userApiSlice';

// import productApiSlice from '../../../features/product/productApiSlice'

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
  const cart = useSelector(state => state.cart)
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

  const [search, setSearch] = useState('')
  const handleSubmit = (evt) => {
    console.log('SUBBMIT');
  }
  
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
            <Search onSubmit={handleSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={(evt)=>{
                  console.log('CHANGED');
                  setSearch(evt.target.value)
                }}
                onKeyPress={async (ev) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    const searchVal = ev.target.value
                    // console.log(searchVal);
                    navigate(`/search?q=${searchVal}`)
                  }
                }}
              />
            </Search>
          </Box>


          <Button sx={{marginRight:2}} color="inherit" onClick={()=>navigate('/cart')} startIcon={
            <Badge color='secondary' badgeContent={cart.items.length}>
              <ShoppingCartIcon />
            </Badge>}>
            Cart
          </Button>
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
                  <MenuItem onClick={()=>{
                    handleClose()
                    navigate('/me')
                  }}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={()=>{
                    handleClose()
                     dispatch(userApi.endpoints.logOut.initiate())
                      console.log('LOGGED OUT SUCCESSFULLY');
                      dispatch(logOutUser())
                      navigate('/')
                    
                    }}>
                    <Typography textAlign="center">log Out</Typography>
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
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { logout } from '../../store/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
const MainNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const {user} = useSelector(state => state.user);
  const photo = user?.photo;
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className='navbar navbar-default navbar-fixed-top' style={{backgroundColor:"#2a3042",padding:"10px 5px"}}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          style={{float: "right"}}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <img src={photo} style={{ width: 35, height: 35, borderRadius:50 }} />
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
          dispatch(logout());
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
           Logout
        </MenuItem>
      </Menu>
    </nav>
  )
};

export default MainNavbar;
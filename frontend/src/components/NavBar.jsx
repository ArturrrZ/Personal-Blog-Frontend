import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FeedIcon from '@mui/icons-material/Feed';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
    const {authenticated} = props
    console.log(authenticated)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FeedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Blog
          </Typography>
          {!authenticated&&<Link to="login"><Button color="inherit">Login</Button></Link>}
          {!authenticated&&<Link to="register"><Button color="inherit">Register</Button></Link>}
          {authenticated&&<Link to="logout"><Button color="inherit">Logout</Button></Link>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
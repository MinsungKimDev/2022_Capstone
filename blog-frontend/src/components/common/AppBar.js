import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

 const ButtonAppBar = ({user, onLogout}) => {
  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{backgroundColor:"#03fcba"}} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{color:"black", fontFamily:"GrapeNuts-Regular"}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/"  >
                        자취 9단
                    </Link>
          </Typography>
          
          {user ?
          (
            
                <Button style={{backgroundColor:"white", color:"black", fontFamily:"Arial Black"}} color="inherit" onClick={onLogout}>Logout</Button>
              
              )
          :
          (<Link to="/login">
              <Button style={{backgroundColor:"white", color:"black", fontFamily:"Arial Black"}} color="inherit">Login</Button>
              </Link>
            )
        }
        
        </Toolbar>
      </AppBar>
    </Box>
    
  );
}

export default ButtonAppBar;
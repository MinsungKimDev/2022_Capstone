import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './headerLogoWrapper.css';

const ButtonAppBar = ({user, onLogout}) => {
  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{backgroundColor:"#FE502D"}} position="static">
        <Toolbar>
          
          
          <Typography style={{color:"black", fontFamily:"GrapeNuts-Regular"}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div className='headerLogoWrapper'>
            <img className='logo' src="img/headerlogo.png"></img>
          </div>
          
          </Typography>
          
          {user ?
          (<Link to='/' >
              <Button style={{backgroundColor:"white", color:"black", fontFamily:"Gill Sans, sans-serif"}} color="inherit" onClick={onLogout}>로그아웃</Button>
              </Link>
              )
          :
          (<Link to="/login">
              <Button style={{backgroundColor:"white", color:"black", fontFamily:"Gill Sans, sans-serif"}} color="inherit">로그인</Button>
              </Link>
            )
        }
        
        </Toolbar>
      </AppBar>
    </Box>
    
  );
}

export default ButtonAppBar;
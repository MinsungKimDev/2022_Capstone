/* eslint-disable*/
import HeaderContainer from "../containers/common/HeaderContainer";
import React, { useState } from 'react';
import { Link, Route, Router } from "react-router-dom";


import '../components/common/MainPage.css';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const btnStyle = {
  color: "white",
  background: "teal",
  border: "1px solid teal",
  borderRadius: ".25rem",
  fontSize: "1rem",
  lineHeight: 1.5,
  cursor: "pointer",
  width:"80%",
  height:"150px",
};

const btnStyle2 = {
  color: "white",
  background: "teal",
  padding: ".25rem  1rem",
  border: "1px solid teal",
  width: "100%",
  height: "60px",
  borderRadius: "0.25rem",
  fontSize: "1rem",
  lineHeight: 1.5,
  cursor: "pointer",
};

function ClickMe(props){
  window.location.assign('./food/korean');
}

function ClickMe2(props){
  window.location.assign('./food/japanese');
}

function ClickMe3(props){
  window.location.assign('./food/chinese');
}

function ClickMe4(props){
    window.location.assign('./food/fastfood');
  }

function ClickMe5(props){
    window.location.assign('./food/other');
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
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
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

 function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            환영합니다.
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Buttonmain(props){
  return(
    <div className='main-background'>
      <div className='main'>
        <div className='button-main-background'>
          <div className='button-main'>
            <button style={btnStyle} onClick={ClickMe}>한식</button>
          </div>
        </div><br></br>
        <div className='button-setting'>
            <button style={btnStyle} onClick={ClickMe2}>일식</button>
        </div><br></br>
        <div className='button-main'>
            <button style={btnStyle} onClick={ClickMe3}>중식</button>
        </div><br></br>
        <div className='button-setting'>
            <button style={btnStyle} onClick={ClickMe4}>패스트푸드</button>
        </div><br></br>
        <div className='button-broad'>
            <button style={btnStyle2} onClick={ClickMe5}>더보기</button>
        </div>
      </div>
    </div>
  );
}

const PostListPage = () => {
    return (
    <>
        <HeaderContainer />
            <div className="App">
                <SearchAppBar></SearchAppBar>
                <section>
                    <Buttonmain>
                    </Buttonmain>
                </section>
            </div>
    </>
    );
};

export default PostListPage;
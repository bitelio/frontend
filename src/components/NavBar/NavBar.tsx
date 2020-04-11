import React, { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';

import logo from '../../assets/logo.svg';

import './NavBar.css';

export default function NavBar(): ReactElement {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" className="icon" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Container maxWidth="xs">
          <img src={logo} className="logo" alt="logo" />
        </Container>
      </Toolbar>
    </AppBar>
  );
}

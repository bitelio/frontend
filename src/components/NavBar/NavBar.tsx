import React, { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import Logo from '../Logo';

import './NavBar.css';

export default function NavBar(): ReactElement {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container direction="row" justify="center" alignItems="center">
          <Logo />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

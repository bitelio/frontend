import React, { ReactElement } from 'react';

import useStyles from './styles';

import logo from './logo.svg';

export default function Logo(): ReactElement {
  const classes = useStyles();
  return (
    <a href="/">
      <img src={logo} className={classes.logo} alt="logo" />
    </a>
  );
}

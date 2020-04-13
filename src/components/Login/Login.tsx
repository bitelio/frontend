import React, { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Logo from '../Logo';

import useStyles from './styles';

export default function Login(): ReactElement {
  const classes = useStyles();
  return (
    <Grid container className={classes.grid} justify="center" alignItems="center">
      <Grid item sm={4} md={3} lg={2} xl={1}>
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardContent>
              <Logo />
            </CardContent>
            <Divider />
            <CardContent>
              <TextField fullWidth id="username" type="email" label="Username" />
              <TextField fullWidth id="password" type="password" label="Password" />
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                className={classes.button}
                variant="contained"
                size="large"
                color="primary"
                disabled={true}
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
}

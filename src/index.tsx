import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './components/App';
import Themes from './themes';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

ReactDOM.render(
  <ThemeProvider theme={Themes.light}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

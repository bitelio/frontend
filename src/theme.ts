import { red, blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue.A700,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#000',
    },
  },
});

export default theme;

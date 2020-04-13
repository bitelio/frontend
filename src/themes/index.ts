import light from "./light";
import dark from "./dark";

import { createMuiTheme } from "@material-ui/core";

export default {
  light: createMuiTheme(light),
  dark: createMuiTheme(dark),
};

import { createMuiTheme } from "@material-ui/core/styles";
import { indigo, green } from "@material-ui/core/colors";

// This allows us to wrap the entire application in our custom theme
export default createMuiTheme({
  palette: {
    primary: indigo,
    secondary: {
      light: green[300],
      main: green[600],
      dark: green[700],
    },
    background: {
      default: "#f1f1f1",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

import { createMuiTheme } from "@material-ui/core/styles";
import { indigo, green } from "@material-ui/core/colors";

// This allows us to wrap the entire application in our custom theme
export default createMuiTheme({
  palette: {
    primary: indigo,
    secondary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

import { createTheme } from "@mui/material/styles";

// create a custom theme that can be used throughout the application
export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9900",
      contrastText: "#000000",
    },
    secondary: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
  },
});

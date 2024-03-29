import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import shadows from "./shadows";
import typography from "./typography";

const theme = createTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      light: "#454755",
      main: "#171a2b",
      dark: "#10121e",
      contrastText: "#fff",
    },
    secondary: {
      main: colors.indigo[500],
    },
    accent: {
      main: colors.orange[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows,
  typography,
});

export default theme;

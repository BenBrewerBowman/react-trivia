import createMuiTheme, { Theme } from "@material-ui/core/styles/createMuiTheme";
import { PaletteType } from "@material-ui/core";

export const createTheme = (type: PaletteType): Theme =>
  createMuiTheme({
    palette: {
      type,
    },
    typography: {
      fontFamily: ["Montserrat", "Lato", "Roboto"].join(","),
    },
    overrides: {
      MuiCard: {
        root: {
          borderRadius: 8,
        },
      },
      MuiPaper: {
        elevation1: {
          boxShadow: "none",
        },
        elevation2: {
          boxShadow: "none",
        },
        rounded: {
          borderRadius: 8,
        },
      },
      MuiStepper: {
        root: {
          background: "none",
          border: "none",
          padding: 0,
        },
      },
    },
  });

export const PRIMARY_GRADIENT =
  "linear-gradient( 135deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)";

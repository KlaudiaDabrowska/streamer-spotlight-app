import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: "#EFE9F4" },
    },
    typography: {
      fontFamily: "Lato, sans-serif",
      allVariants: {
        color: "#000",
      },
    },
  }),
  { factor: 4 }
);

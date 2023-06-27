import { Box, Grid } from "@mui/material";
import { Header } from "../components/common/Header";
import { ReactNode } from "react";

export const MainTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Header />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        {children}
      </Grid>
    </Box>
  );
};

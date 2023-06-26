import { Alert, Grid } from "@mui/material";
import { ReactNode } from "react";

export const ErrorAlert = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert severity="error">{children}</Alert>
    </Grid>
  );
};

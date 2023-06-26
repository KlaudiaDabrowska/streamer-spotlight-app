import { Grid, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ReactNode } from "react";

export const SuccessInfo = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item sx={{ mb: 2 }}>
        <CheckCircleOutlineIcon color="success" fontSize="large" />
      </Grid>
      <Grid item>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {children}
        </Typography>
      </Grid>
    </Grid>
  );
};

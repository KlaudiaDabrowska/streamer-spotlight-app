import { CircularProgress, Grid } from "@mui/material";

export const LoadingState = () => {
  return (
    <Grid item xs={12} m={5}>
      <CircularProgress color="secondary" />
    </Grid>
  );
};

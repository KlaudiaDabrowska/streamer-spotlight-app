import { Typography } from "@mui/material";
import { MainTemplate } from "../../templates/MainTemplate";

export const ErrorBoundary = () => {
  return (
    <MainTemplate>
      <Typography variant="h5" color="error">
        Ooops! We have some problems. Please try again later.
      </Typography>
    </MainTemplate>
  );
};

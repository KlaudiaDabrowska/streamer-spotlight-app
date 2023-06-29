import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import { StreamerSubmissionForm } from "../components/form/StreamerSubmissionForm";
import { StreamersList } from "../components/streamers/StreamersList";
import { MainTemplate } from "../templates/MainTemplate";

export const MainView = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MainTemplate>
      <Grid item>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            width: isSmallScreen ? 300 : 800,
          }}
        >
          <StreamerSubmissionForm />
        </Paper>
      </Grid>
      <Grid item>
        <Paper
          sx={{
            marginTop: 3,
            marginBottom: 3,
            padding: 2,
            textAlign: "center",
            width: isSmallScreen ? 300 : 800,
          }}
        >
          <StreamersList />
        </Paper>
      </Grid>
    </MainTemplate>
  );
};

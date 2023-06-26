import {
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { StreamerSubmissionForm } from "../components/StreamerSubmissionForm";
import { StreamersList } from "../components/StreamersList";

export const MainView = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          p: 3,
          textAlign: "center",
          fontWeight: { xs: "bold", md: "normal" },
        }}
      >
        Streamer spotlight app
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
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
      </Grid>
    </Box>
  );
};

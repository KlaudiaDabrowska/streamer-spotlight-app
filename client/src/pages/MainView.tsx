import {
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { StreamerSubmissionForm } from "../components/StreamerSubmissionForm";

export const MainView = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      style={{
        flexGrow: 1,
        backgroundColor: "#8EC5FC",
        backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
      }}
    >
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
      </Grid>
    </Box>
  );
};

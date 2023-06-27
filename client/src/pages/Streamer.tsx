import {
  CircularProgress,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getStreamerById } from "../api/getStreamerById";
import { StreamerInfo } from "../components/streamers/StreamerInfo";
import { MainTemplate } from "../templates/MainTemplate";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorInfo } from "../components/common/ErrorInfo";

export const Streamer = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const params = useParams();

  const streamerId = params.streamerId;

  const {
    data: streamerInfo,
    isLoading,
    isError,
  } = useQuery("streamerInfo", () => getStreamerById(parseInt(streamerId!)), {
    enabled: streamerId !== "undefined",
    refetchInterval: 2000,
  });

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
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorInfo error="Ooops. Something went wrong. Please try again later." />
          ) : (
            <StreamerInfo streamer={streamerInfo} />
          )}
        </Paper>
      </Grid>
    </MainTemplate>
  );
};

import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getStreamerById } from "../api/getStreamerById";
import { StreamerInfo } from "../components/streamers/StreamerInfo";
import { MainTemplate } from "../templates/MainTemplate";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorInfo } from "../components/common/ErrorInfo";
import { useEffect } from "react";
import { queryClient } from "../App";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { IStreamerObject } from "../lib/types/Streamers";

export const Streamer = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const params = useParams();

  const streamerId = params.streamerId;

  const {
    data: streamerInfo,
    isLoading,
    isError,
  } = useQuery("streamerInfo", () => getStreamerById(streamerId!), {
    enabled: streamerId !== "undefined",
  });

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_API_URL}/streamers/streamer-events`
    );
    eventSource.onmessage = ({ data }) => {
      queryClient.setQueryData<IStreamerObject | undefined>(
        "streamerInfo",
        (streamer) => {
          if (streamer === undefined) {
            return undefined;
          }
          const updatedStreamer = JSON.parse(data);
          const updatedData =
            streamer.id === updatedStreamer.id ? updatedStreamer : streamer;

          return updatedData;
        }
      );
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <MainTemplate>
      <Grid item>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <IconButton>
            <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="subtitle2">Back to the main page</Typography>
          </IconButton>
        </Link>
      </Grid>
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

import { useQuery } from "react-query";
import { getAllStreamers } from "../../api/getAllStreamers";
import { Container, Grid, Typography } from "@mui/material";
import { StreamersListItem } from "./StreamersListItem";
import { LoadingState } from "../common/LoadingState";

export const StreamersList = () => {
  const { data: streamersList, isLoading } = useQuery(
    "streamersList",
    getAllStreamers,
    {
      refetchInterval: 2000,
    }
  );

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Streamers list</Typography>
        </Grid>
        {isLoading ? (
          <LoadingState />
        ) : streamersList ? (
          streamersList?.map((streamer) => (
            <StreamersListItem streamer={streamer} key={streamer.id} />
          ))
        ) : (
          <Typography variant="h5">No streamers available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

import { useQuery } from "react-query";
import { getAllStreamers } from "../../api/getAllStreamers";
import { Container, Grid, Typography } from "@mui/material";
import { StreamersListItem } from "./StreamersListItem";
import { LoadingState } from "../common/LoadingState";
import { queryClient } from "../../App";
import { useEffect } from "react";

export const StreamersList = () => {
  const { data: streamersList, isLoading } = useQuery(
    "streamersList",
    getAllStreamers
  );

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_API_URL}/streamers/sse`
    );
    eventSource.onmessage = ({ data }) => {
      queryClient.setQueryData("streamersList", (oldData: any) => {
        const dataObj = JSON.parse(data);
        const updatedData = [
          ...oldData.filter((item: any) => item.id < dataObj.id),
          dataObj,
          ...oldData.filter((item: any) => item.id > dataObj.id),
        ];

        return updatedData;
      });
    };
    return () => {
      eventSource.close();
    };
  }, []);

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

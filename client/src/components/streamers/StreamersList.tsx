import { useQuery } from "react-query";
import { Direction, getAllStreamers } from "../../api/getAllStreamers";
import { Container, Grid, Pagination, Typography } from "@mui/material";
import { StreamersListItem } from "./StreamersListItem";
import { LoadingState } from "../common/LoadingState";
import { queryClient } from "../../App";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IStreamerObject, IStreamersResponse } from "../../lib/types/Streamers";
import { SortBySelect } from "./SortBySelect";

export const StreamersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const fieldParam = searchParams.get("field");
  const directionParam = searchParams.get("direction");

  const [page, setPage] = useState(pageParam ? +pageParam : 1);
  const [field, setField] = useState(fieldParam ? fieldParam : "upvotes");
  const [direction, setDirection] = useState(
    directionParam ? (directionParam as Direction) : Direction.DESC
  );

  const { data: streamersList, isLoading } = useQuery(
    ["streamersList", page, field, direction],
    () => getAllStreamers(page, field, direction)
  );

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_API_URL}/streamers/streamer-events`
    );

    eventSource.onmessage = ({ data }) => {
      queryClient.setQueryData<IStreamersResponse | undefined>(
        ["streamersList", page, field, direction],
        (streamersResponse) => {
          const streamerUpdatedEvent: IStreamerObject = JSON.parse(data);

          if (!streamersResponse) {
            return streamersResponse;
          }

          const isNewStreamer = !streamersResponse.data.some(
            (streamer) => streamer.id === streamerUpdatedEvent.id
          );

          const updatedData = streamersResponse.data.map((item) =>
            item.id === streamerUpdatedEvent.id ? streamerUpdatedEvent : item
          );

          if (isNewStreamer) {
            updatedData.unshift(streamerUpdatedEvent);
          }

          const updatedResponse = {
            data: updatedData,
            meta: streamersResponse.meta,
          };

          return updatedResponse;
        }
      );
    };

    return () => {
      eventSource.close();
    };
  }, [direction, field, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    setSearchParams({ page: page.toString(), field, direction });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Streamers list</Typography>
        </Grid>
        {isLoading ? (
          <LoadingState />
        ) : streamersList && streamersList.data.length > 0 ? (
          <Grid item xs={12}>
            <SortBySelect
              page={page}
              setDirection={setDirection}
              setField={setField}
            />
            {streamersList.data?.map((streamer) => (
              <StreamersListItem streamer={streamer} key={streamer.id} />
            ))}
            <Pagination
              count={Math.ceil(streamersList.meta.total / 10)}
              page={+page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              sx={{ display: "flex", justifyContent: "center", mt: 2 }}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5">No streamers available.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

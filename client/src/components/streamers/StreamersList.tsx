import { useQuery } from "react-query";
import { getAllStreamers } from "../../api/getAllStreamers";
import { Container, Grid, Pagination, Typography } from "@mui/material";
import { StreamersListItem } from "./StreamersListItem";
import { LoadingState } from "../common/LoadingState";
import { queryClient } from "../../App";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const StreamersList = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: streamersList, isLoading } = useQuery(
    ["streamersList", page],
    () => getAllStreamers(page)
    // { keepPreviousData: true }
  );

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_API_URL}/streamers/sse`
    );
    eventSource.onmessage = ({ data }) => {
      queryClient.setQueryData(["streamersList", page], (oldData: any) => {
        const dataObj = JSON.parse(data);

        const updatedData = {
          data: [
            ...oldData.data.filter((item: any) => item.id < dataObj.id),
            dataObj,
            ...oldData.data.filter((item: any) => item.id > dataObj.id),
          ],
          meta: oldData.meta,
        };

        console.log(" data");
        console.log(dataObj);
        console.log("old data");
        console.log(oldData);
        console.log("updated data");
        console.log(updatedData);

        return updatedData;
      });
    };
    return () => {
      eventSource.close();
    };
  }, [page]);

  const handlePageChange = (event: any, page: any) => {
    setPage(page);
    setSearchParams({ page: page });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Streamers list</Typography>
        </Grid>
        {isLoading ? (
          <LoadingState />
        ) : streamersList ? (
          <Grid item xs={12}>
            {streamersList.data?.map((streamer) => (
              <StreamersListItem streamer={streamer} key={streamer.id} />
            ))}
            <Pagination
              count={Math.ceil(streamersList.meta.total / 10)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              sx={{ display: "flex", justifyContent: "center", mt: 2 }}
            />
          </Grid>
        ) : (
          <Typography variant="h5">No streamers available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

import { useQuery } from "react-query";
import { Direction, getAllStreamers } from "../../api/getAllStreamers";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { StreamersListItem } from "./StreamersListItem";
import { LoadingState } from "../common/LoadingState";
import { queryClient } from "../../App";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IStreamerObject, IStreamersResponse } from "../../lib/types/Streamers";

export const StreamersList = () => {
  const [page, setPage] = useState(1);
  const [field, setField] = useState("downvotes");
  const [direction, setDirection] = useState(Direction.DESC);

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: streamersList, isLoading } = useQuery(
    ["streamersList", page, field, direction],
    () => getAllStreamers(page, field, direction)
    // { keepPreviousData: true }
  );

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_API_URL}/streamers/sse`
    );
    eventSource.onmessage = ({ data }) => {
      queryClient.setQueryData<IStreamersResponse | undefined>(
        ["streamersList", page, field, direction],
        (oldData) => {
          const dataObj: IStreamerObject = JSON.parse(data);
          if (!oldData) {
            return oldData;
          }
          const updatedData = oldData.data.map((item) =>
            item.id === dataObj.id ? dataObj : item
          );
          const updatedStreamer = {
            data: updatedData,
            meta: oldData.meta,
          };

          console.log(" data");
          console.log(dataObj);
          console.log("old data");
          console.log(oldData);
          console.log("updated data");
          console.log(updatedStreamer);

          return updatedStreamer;
        }
      );
    };
    return () => {
      eventSource.close();
    };
  }, [direction, field, page]);

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
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Sort by: </Typography>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="sortBY"
                  id="sortBY"
                  // value={age}
                  // onChange={handleChange}
                  label="sortBY"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Upvotes</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
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

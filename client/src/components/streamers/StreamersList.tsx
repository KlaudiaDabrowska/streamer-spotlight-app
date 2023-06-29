import { useQuery } from "react-query";
import { Direction, getAllStreamers } from "../../api/getAllStreamers";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { StreamersListItem } from "./StreamersListItem";
import { LoadingState } from "../common/LoadingState";
import { queryClient } from "../../App";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IStreamerObject, IStreamersResponse } from "../../lib/types/Streamers";

type SortingObject = {
  [key: string]: string;
};

export const StreamersList = () => {
  const [page, setPage] = useState(1);
  const [field, setField] = useState("upvotes");
  const [direction, setDirection] = useState(Direction.DESC);
  const [selectedOption, setSelectedOption] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: streamersList, isLoading } = useQuery(
    ["streamersList", page, field, direction],
    () => getAllStreamers(page, field, direction)
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

          return updatedStreamer;
        }
      );
    };
    return () => {
      eventSource.close();
    };
  }, [direction, field, page]);

  const sortingArray: SortingObject[] = [
    { "Upvotes ascending": "upvotes ASC" },
    { "Upvotes descending": "upvotes DESC" },
    { "Downvotes ascending": "downvotes ASC" },
    { "Downvotes descending": "downvotes DESC" },
    { "Streamer name ascending": "streamerName ASC" },
    { "Streamer name descending": "streamerName DESC" },
  ];

  const handlePageChange = (event: any, page: number) => {
    setPage(page);
    setSearchParams({ page, field, direction });
  };

  //todo: add multiple sorting
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);

    const selectedObject = sortingArray.find(
      (item) => Object.keys(item)[0] === selectedOption
    );

    if (selectedObject) {
      const selectedValue = selectedObject[selectedOption];
      const [field, direction] = selectedValue.split(" ");
      setField(field);
      setDirection(direction as Direction);
      setSearchParams({ page, field, direction });
    }
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
                  value={selectedOption}
                  onChange={handleSelectChange}
                  label="sortBY"
                >
                  {sortingArray.map((item) => {
                    const key = Object.keys(item)[0];
                    return (
                      <MenuItem value={key} key={key}>
                        {key}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
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

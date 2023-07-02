import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Direction } from "../../api/getAllStreamers";

type SortingObject = {
  [key: string]: string;
};

interface ISortBySelectParams {
  page: number;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
  setField: React.Dispatch<React.SetStateAction<string>>;
}

export const SortBySelect = ({
  page,
  setDirection,
  setField,
}: ISortBySelectParams) => {
  const [selectedOption, setSelectedOption] = useState("");
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const sortingArray: SortingObject[] = [
    { "Upvotes ascending": "upvotes ASC" },
    { "Upvotes descending": "upvotes DESC" },
    { "Downvotes ascending": "downvotes ASC" },
    { "Downvotes descending": "downvotes DESC" },
    { "Streamer name ascending": "streamer_name ASC" },
    { "Streamer name descending": "streamer_name DESC" },
  ];

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
      setSearchParams({ page: page.toString(), field, direction });
    }
  };

  return (
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
  );
};

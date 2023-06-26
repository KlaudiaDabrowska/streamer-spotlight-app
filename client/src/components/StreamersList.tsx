import { useQuery } from "react-query";
import { getAllStreamers } from "../api/getAllStreamers";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const StreamersList = () => {
  const { data: streamersList } = useQuery("streamersList", getAllStreamers);

  console.log("StreamersList");
  console.log(streamersList);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Streamers list</Typography>
        </Grid>
        {streamersList?.map((streamer) => (
          <Grid item xs={12}>
            <Card>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151, pl: 2 }}
                  image="/static/images/cards/live-from-space.jpg"
                  alt="streamer-image"
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {streamer.streamerName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {streamer.description}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {streamer.platform}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Stack flexDirection="row">
                    <Stack direction="row" alignItems="center">
                      <ArrowUpwardIcon sx={{ color: "green" }} />
                      <Typography component="div" variant="h5">
                        {streamer.upvotes}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                      <ArrowDownwardIcon sx={{ color: "red" }} />
                      <Typography component="div" variant="h5">
                        {streamer.downvotes}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

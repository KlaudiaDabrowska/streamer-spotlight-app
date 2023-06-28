import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { IStreamerObject } from "../../lib/types/Streamers";
import { Link } from "react-router-dom";
import { Votes } from "./Votes";

export const StreamersListItem = ({
  streamer,
}: {
  streamer: IStreamerObject;
}) => {
  return (
    <Card sx={{ my: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{ flex: "1" }}>
          <Link to={`/streamer/${streamer.id}`}>
            <Typography variant="h5" textAlign="left">
              {streamer.streamerName}
            </Typography>
          </Link>
        </CardContent>
        <CardContent>
          <Votes streamer={streamer} />
        </CardContent>
      </Box>
    </Card>
  );
};

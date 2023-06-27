import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { IStreamerObject } from "../../lib/types/Streamers";
import { Link } from "react-router-dom";
import { Votes } from "./Votes";

export const StreamersListItem = ({
  streamer,
  refetch,
}: {
  streamer: IStreamerObject;
  refetch: () => void;
}) => {
  return (
    <Grid item xs={12}>
      <Card>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardContent sx={{ flex: "1" }}>
            <Link to={`/${streamer.id}`}>
              <Typography variant="h5" textAlign="left">
                {streamer.streamerName}
              </Typography>
            </Link>
          </CardContent>
          <CardContent>
            <Votes streamer={streamer} refetch={refetch} />
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

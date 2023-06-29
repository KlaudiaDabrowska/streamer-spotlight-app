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
    <Grid item xs={12}>
      <Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
          }}
        >
          <CardContent sx={{ flex: "1" }}>
            <Link to={`/${streamer.id}`} style={{ textDecoration: "none" }}>
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
    </Grid>
  );
};

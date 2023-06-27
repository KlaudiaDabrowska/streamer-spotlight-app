import { Container, Grid, Typography } from "@mui/material";
import { IStreamerObject } from "../../lib/types/Streamers";
import { Votes } from "./Votes";

export const StreamerInfo = ({ streamer }: { streamer?: IStreamerObject }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{streamer?.streamerName}</Typography>
          <Typography variant="subtitle2">{streamer?.platform}</Typography>
        </Grid>
        <Grid item xs={12}>
          <div>image</div>
        </Grid>
        <Grid item xs={12}>
          <Votes streamer={streamer} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{streamer?.description}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

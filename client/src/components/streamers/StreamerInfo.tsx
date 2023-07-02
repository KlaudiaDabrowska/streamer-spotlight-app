import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IStreamerObject } from "../../lib/types/Streamers";
import { Votes } from "./Votes";

export const StreamerInfo = ({ streamer }: { streamer?: IStreamerObject }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="streamerName">
            {streamer?.streamerName}
          </Typography>
          <Typography variant="subtitle2" data-testid="platform">
            {streamer?.platform}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img
            src={streamer?.image}
            alt="streamer"
            style={{ width: isSmallScreen ? 250 : "auto" }}
            data-testid="image"
          />
        </Grid>
        <Grid item xs={12}>
          <Votes streamer={streamer} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="description">
            {streamer?.description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

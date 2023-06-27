import { Typography } from "@mui/material";

export const Header = () => {
  return (
    <Typography
      variant="h3"
      sx={{
        p: 3,
        textAlign: "center",
        fontWeight: { xs: "bold", md: "normal" },
      }}
    >
      Streamer spotlight app
    </Typography>
  );
};

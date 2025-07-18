import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress></CircularProgress>
    </Box>
  );
}

export default Loading;

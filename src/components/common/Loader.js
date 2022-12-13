import { CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress thickness={5} size={100} disableShrink />
    </div>
  );
};

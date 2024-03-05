import { SxProps, Tooltip, Typography } from "@mui/material";
import { EngineState } from "../../graph";

type props = {
  status: EngineState | undefined;
  positiveTitle: string;
  negativeTitle: string;
  sx?: SxProps;
};

const StatusIndicator = ({ status, sx }: props) => {
  console.log("StatusIndicator", status);
  const lookup = {
    [EngineState.Paused]: { title: "Engine is Paused", color: "red" },
    [EngineState.Running]: {
      title: "Engine is Scoring Current Round",
      color: "green",
    },
    [EngineState.Waiting]: {
      title: "Engine is Waiting Next to Start",
      color: "yellow",
    },
    default: { title: "Engine is Unknown", color: "grey" },
  };

  return (
    <Tooltip title={lookup[status || "default"].title}>
      <Typography
        variant='body2'
        sx={{
          display: "inline-block",
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: lookup[status || "default"].color,
          ...sx,
        }}
      />
    </Tooltip>
  );
};

export default StatusIndicator;

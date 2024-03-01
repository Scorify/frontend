import { SxProps, Tooltip, Typography } from "@mui/material";

type props = {
  status: boolean;
  positiveTitle: string;
  negativeTitle: string;
  sx?: SxProps;
};

const StatusIndicator = ({
  status,
  positiveTitle,
  negativeTitle,
  sx,
}: props) => {
  return (
    <Tooltip title={status ? positiveTitle : negativeTitle}>
      <Typography
        variant='body2'
        sx={{
          display: "inline-block",
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: status ? "green" : "red",
          ...sx,
        }}
      />
    </Tooltip>
  );
};

export default StatusIndicator;

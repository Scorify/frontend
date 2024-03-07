import { useState } from "react";

import {
  Box,
  Container,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  StatusEnum,
  StatusStreamSubscription,
  useStatusStreamSubscription,
} from "../../../graph";

export default function StatusStream() {
  const [statuses, setStatuses] = useState<
    StatusStreamSubscription["statusStream"]
  >([]);

  useStatusStreamSubscription({
    onData: (data) => {
      if (data.data.data?.statusStream) {
        setStatuses((prev) =>
          [...(data.data.data?.statusStream ?? []), ...prev].splice(0, 500)
        );
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' align='center'>
        Status Stream
      </Typography>
      <Box sx={{ m: 2 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography>Status</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Check</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>User</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Round</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Time</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Error</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statuses.map((status, i) => (
              <Fade in={true} key={status?.id || i}>
                <TableRow key={status?.id || i}>
                  <TableCell align='center'>
                    <Tooltip
                      title={status?.status == StatusEnum.Up ? "Up" : "Down"}
                    >
                      <Typography
                        variant='body2'
                        sx={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor:
                            status?.status == StatusEnum.Up ? "green" : "red",
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      {status?.check.name}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      {status?.user.username}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>{status?.round.number}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      {new Date(status?.update_time).toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>{status?.error}</Typography>
                  </TableCell>
                </TableRow>
              </Fade>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

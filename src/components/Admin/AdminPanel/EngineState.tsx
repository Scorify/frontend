import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import {
  EngineState,
  useEngineStateSubscription,
  useStartEngineMutation,
  useStopEngineMutation,
} from "../../../graph";

export default function EngineStateComponent() {
  const { data } = useEngineStateSubscription({
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  const [StartEngine] = useStartEngineMutation({
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  const [StopEngine] = useStopEngineMutation({
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  const statusColor = (state: EngineState) => {
    if (state === EngineState.Running) {
      return "success";
    } else {
      return "error";
    }
  };

  return (
    <Container maxWidth='xs'>
      <Typography variant='h4' align='center'>
        Engine State
      </Typography>
      <Box
        sx={{ m: 2, mt: 4 }}
        display='flex'
        alignItems='center'
        flexDirection='column'
      >
        <Button
          variant='contained'
          color={statusColor(data?.engineState || EngineState.Stopped)}
        >
          <Typography variant='h5'>{data?.engineState}</Typography>
        </Button>

        <Box sx={{ m: 2 }} />
        <ButtonGroup variant='contained' fullWidth>
          <Button
            onClick={() => {
              StartEngine();
            }}
            disabled={data?.engineState === EngineState.Running}
          >
            <Typography variant='h6'>Start</Typography>
          </Button>
          <Button
            onClick={() => {
              StopEngine();
            }}
            disabled={data?.engineState === EngineState.Stopped}
          >
            <Typography variant='h6'>Pause</Typography>
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

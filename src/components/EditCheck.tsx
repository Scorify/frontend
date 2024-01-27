import { useRef, useState } from "react";
import { Transition } from "react-transition-group";

import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { ChecksQuery } from "../graph";

type props = {
  check: ChecksQuery["checks"][0];
};

export default function EditCheck({ check }: props) {
  const [expanded, setExpanded] = useState(false);
  const transitionContainerRef = useRef<HTMLDivElement | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const transitionStyles = {
    entering: { height: 0, overflow: "hidden" },
    entered: { height: "auto", overflow: "visible" },
    exiting: { height: "auto", overflow: "visible" },
    exited: { height: 0, overflow: "hidden" },
    unmounted: {},
  };

  return (
    <Card sx={{ width: "100%", marginBottom: "24px" }} variant='elevation'>
      <CardHeader
        title={
          <Box display='flex' flexDirection='row' alignItems='baseline'>
            <Typography variant='h6' component='div' marginRight='24px'>
              {check.name}
            </Typography>
            <Typography
              variant='subtitle1'
              color='textSecondary'
              component='div'
            >
              {check.source.name}
            </Typography>
          </Box>
        }
        action={
          <IconButton aria-label='expand' onClick={handleExpandClick}>
            <ExpandMore />
          </IconButton>
        }
        onClick={handleExpandClick}
      />
      <Transition
        in={expanded}
        timeout={{ enter: 300, exit: 300 }}
        nodeRef={transitionContainerRef}
      >
        {(state) => (
          <Collapse
            in={expanded}
            timeout={300}
            ref={transitionContainerRef}
            style={{
              ...transitionStyles[state],
              transition: "height 0.3s ease-in-out",
            }}
          >
            <Divider sx={{ margin: "0px 12px" }} />
            <CardContent>{check.source.schema}</CardContent>
          </Collapse>
        )}
      </Transition>
    </Card>
  );
}

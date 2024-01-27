import { ReactNode, useState, useRef } from "react";
import { Transition } from "react-transition-group";

import { ExpandMore } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from "@mui/material";

type props = {
  title: string;
  expandedContent: ReactNode;
};

export default function EditCheck({ title, expandedContent }: props) {
  const [expanded, setExpanded] = useState(false);
  const transitionContainerRef = useRef<HTMLDivElement | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const transitionStyles = {
    entering: {
      height: 0,
      overflow: "hidden",
      transition: "height 0.3s ease-out",
    },
    entered: { height: "auto", transition: "height 0.3s ease-out" },
    exiting: {
      height: 0,
      overflow: "hidden",
      transition: "height 0.3s ease-out",
    },
    exited: {
      height: 0,
      overflow: "hidden",
      transition: "height 0.3s ease-out",
    },
    unmounted: { height: 0, overflow: "hidden" },
  };

  return (
    <Card sx={{ width: "100%", marginBottom: "24px" }}>
      <CardHeader
        title={title}
        action={
          <IconButton aria-label='expand' onClick={handleExpandClick}>
            <ExpandMore />
          </IconButton>
        }
        onClick={handleExpandClick}
      />
      <Transition
        in={expanded}
        timeout={1000}
        unmountOnExit
        nodeRef={transitionContainerRef}
      >
        {(state) => (
          <Collapse
            in={expanded}
            timeout={300}
            ref={transitionContainerRef}
            style={{
              ...transitionStyles[state],
            }}
          >
            <CardContent>{expandedContent}</CardContent>
          </Collapse>
        )}
      </Transition>
    </Card>
  );
}

import { useState } from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grow,
  IconButton,
  Slide,
  Typography,
  Divider,
  Collapse,
  CardContent,
} from "@mui/material";

import { InjectsQuery } from "../../graph";

type props = {
  inject: InjectsQuery["injects"][0];
  handleRefetch: () => void;
  visible: boolean;
};

export default function Inject({ inject, handleRefetch, visible }: props) {
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = () => {};

  const handleExpandClick = () => setExpanded((prev) => !prev);

  return (
    <Grow in={true}>
      <Card
        sx={{
          width: "100%",
          marginBottom: "24px",
          display: visible ? "block" : "none",
        }}
        variant='elevation'
      >
        <CardHeader
          title={
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Typography variant='h6' component='div' marginRight='24px'>
                {inject.title}
              </Typography>
            </Box>
          }
          action={
            <Box display='flex' flexDirection='row' gap='12px'>
              <IconButton>
                <ExpandMore />
              </IconButton>
              <Slide
                in={expanded}
                timeout={300}
                style={{
                  transformOrigin: "right",
                }}
                direction='left'
                unmountOnExit
                mountOnEnter
              >
                <Button
                  variant='contained'
                  color='success'
                  onClick={(e) => {
                    if (!expanded) {
                      e.stopPropagation();
                    }

                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </Slide>
            </Box>
          }
          onClick={handleExpandClick}
        />
        {expanded && <Divider sx={{ margin: "0px 20%" }} />}

        <Collapse in={expanded} timeout={300}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              Add Details here
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Grow>
  );
}

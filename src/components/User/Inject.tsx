import { useEffect, useState } from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  Grow,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";

import { InjectsQuery } from "../../graph";
import Submission from "./Submission";
import SubmitInjectModal from "./SubmitInjectModal";

type countdownChipProps = {
  target: number;
};

function CountdownChip({ target }: countdownChipProps) {
  const [difference, setDifference] = useState(target - Date.now() - 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setDifference(target - Date.now() - 5);
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const handleLabel = (durationMs: number) => {
    let duration = Math.floor(durationMs / 1000);
    if (duration < 60) {
      return `${Math.floor(duration)} seconds`;
    } else if (duration < 90 * 60) {
      return `${Math.floor(duration / 60)} minutes`;
    } else {
      return `${(duration / 3600).toFixed(1)} hours`;
    }
  };

  return (
    <Chip
      color={difference < 0 ? "error" : "success"}
      label={handleLabel(Math.abs(difference))}
      size='small'
    />
  );
}

type props = {
  inject: InjectsQuery["injects"][0];
  handleRefetch: () => void;
  visible: boolean;
};

export default function Inject({ handleRefetch, inject, visible }: props) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => setExpanded((prev) => !prev);

  return (
    <>
      <SubmitInjectModal
        inject={inject}
        handleRefetch={handleRefetch}
        open={open}
        setOpen={setOpen}
      />
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
                <CountdownChip target={new Date(inject.end_time).getTime()} />
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

                      setOpen(true);
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
              <Typography variant='h4' align='center'>
                Files
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  mt: "8px",
                  gap: "8px",
                  mb: "24px",
                }}
              >
                {inject.files.length ? (
                  inject.files.map((file) => (
                    <Chip
                      key={file.id}
                      label={
                        file.name.length > 25
                          ? `${file.name.slice(0, 10)}[...]${file.name.slice(
                              file.name.length - 10
                            )}`
                          : file.name
                      }
                      onClick={() =>
                        window.open(
                          "http://localhost:8080" + file.url,
                          "_blank"
                        )
                      }
                    />
                  ))
                ) : (
                  <Typography variant='body1' align='center'>
                    No Files
                  </Typography>
                )}
              </Box>
              <Typography variant='h4' align='center'>
                Submissions
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  mt: "8px",
                  gap: "8px",
                }}
              >
                {inject.submissions.length ? (
                  <>
                    {[...inject.submissions]
                      .sort(
                        (a, b) =>
                          new Date(b.create_time).getTime() -
                          new Date(a.create_time).getTime()
                      )
                      .map((submission) => (
                        <Submission inject={inject} submission={submission} />
                      ))}
                  </>
                ) : (
                  <Typography variant='body1' align='center'>
                    No Submissions
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      </Grow>
    </>
  );
}

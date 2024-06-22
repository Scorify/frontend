import { useEffect, useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
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
  Paper,
  TextField,
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
    if (difference < 0) {
      if (duration < 60) {
        return `Closed ${Math.floor(duration)} seconds ago`;
      } else if (duration < 90 * 60) {
        return `Closed ${Math.floor(duration / 60)} minutes ago`;
      } else {
        return `Closed ${(duration / 3600).toFixed(1)} hours ago`;
      }
    } else {
      if (duration < 60) {
        return `Closes in ${Math.floor(duration)} seconds`;
      } else if (duration < 90 * 60) {
        return `Closes in ${Math.floor(duration / 60)} minutes`;
      } else {
        return `Closes in ${(duration / 3600).toFixed(1)} hours`;
      }
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

  const sortedSubmissions = inject.submissions
    .filter((submission) => submission.graded)
    .sort(
      (submissionA, submissionB) =>
        (submissionB.rubric?.fields.reduce(
          (acc, field) => acc + field.score,
          0
        ) ?? 0) -
        (submissionA.rubric?.fields.reduce(
          (acc, field) => acc + field.score,
          0
        ) ?? 0)
    );

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
                {sortedSubmissions.length > 0 && (
                  <Chip
                    label={`Score: ${
                      sortedSubmissions[0].rubric?.fields.reduce(
                        (acc, field) => acc + field.score,
                        0
                      ) ?? 0
                    }/${inject.rubric.max_score}`}
                    color='success'
                    size='small'
                    sx={{ marginLeft: "12px" }}
                  />
                )}
              </Box>
            }
            action={
              <Box display='flex' flexDirection='row' gap='12px'>
                <IconButton>
                  {expanded ? <ExpandLess /> : <ExpandMore />}
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
                Rubric
              </Typography>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "16px",
                  marginTop: "8px",
                  marginBottom: "24px",
                }}
              >
                {inject.rubric.fields.length && (
                  <Box
                    display='flex'
                    flexDirection='column'
                    gap='8px'
                    width='100%'
                  >
                    {inject.rubric.fields.map((field) => (
                      <Paper
                        elevation={4}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px",
                          width: "100%",
                          marginBottom: "8px",
                          gap: "16px",
                        }}
                      >
                        <TextField
                          size='small'
                          label='Criteria Name'
                          value={field.name}
                          fullWidth
                        />
                        <TextField
                          size='small'
                          label='Criteria Max Points'
                          value={field.max_score}
                        />
                      </Paper>
                    ))}
                    <TextField
                      size='small'
                      label='Inject Max Points'
                      value={inject.rubric.max_score}
                    />
                  </Box>
                )}
              </Paper>
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

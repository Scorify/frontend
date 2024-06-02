import { useState } from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  Grow,
  IconButton,
  Typography,
} from "@mui/material";

import { InjectsQuery } from "../../graph";

type props = {
  submission: InjectsQuery["injects"][0]["submissions"][0];
  inject: InjectsQuery["injects"][0];
};

export default function Inject({ submission, inject }: props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded((prev) => !prev);
  const submissionTime = new Date(submission.create_time);
  const dueTime = new Date(inject.end_time);

  const handleTime = () => {
    let duration = Math.floor(
      Math.abs(dueTime.getTime() - submissionTime.getTime()) / 1000
    );
    if (duration < 60) {
      return `${Math.floor(duration)} seconds`;
    } else if (duration < 90 * 60) {
      return `${Math.floor(duration / 60)} minutes`;
    } else {
      return `${(duration / 3600).toFixed(1)} hours`;
    }
  };

  const timeLabel = handleTime();

  return (
    <Grow in={true}>
      <Card
        sx={{
          width: "100%",
          marginBottom: "12px",
        }}
        variant='elevation'
        elevation={3}
      >
        <CardHeader
          title={
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Typography variant='h6' component='div' marginRight='24px'>
                {submissionTime.toLocaleDateString()}{" "}
                {submissionTime.toLocaleTimeString()}
              </Typography>
              <Chip
                color={
                  submissionTime.getTime() > dueTime.getTime()
                    ? "error"
                    : "success"
                }
                label={
                  submissionTime.getTime() > dueTime.getTime()
                    ? `Late by ${timeLabel}`
                    : `On Time by ${timeLabel}`
                }
                size='small'
              />
              {submission.graded && (
                <Chip
                  color='default'
                  label='graded'
                  size='small'
                  sx={{ marginLeft: "8px" }}
                />
              )}
            </Box>
          }
          action={
            <Box display='flex' flexDirection='row' gap='12px'>
              <IconButton>
                <ExpandMore />
              </IconButton>
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
              {submission.files.length ? (
                submission.files.map((file) => (
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
                      window.open("http://localhost:8080" + file.url, "_blank")
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
              Submission Notes
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
              <Typography variant='body1' align='center'>
                {submission.notes}
              </Typography>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Grow>
  );
}

import { useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
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
  Paper,
  Typography,
  TextField,
} from "@mui/material";

import { InjectsQuery } from "../../graph";
import FileChip from "../Common/FileChip";

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
              {submission.graded && submission.rubric && (
                <Chip
                  color='success'
                  label={`Graded: ${submission.rubric.fields.reduce(
                    (acc, field) => acc + field.score,
                    0
                  )}/${inject.rubric.fields.reduce(
                    (acc, field) => acc + field.max_score,
                    0
                  )}`}
                  size='small'
                  sx={{ marginLeft: "8px" }}
                />
              )}
            </Box>
          }
          action={
            <Box display='flex' flexDirection='row' gap='12px'>
              <IconButton>
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
          }
          onClick={handleExpandClick}
        />
        {expanded && <Divider sx={{ margin: "0px 1rem" }} />}

        <Collapse in={expanded} timeout={300}>
          <CardContent>
            {submission.graded && submission.rubric && (
              <>
                <Typography variant='h4' align='center'>
                  Rubric
                </Typography>
                <Paper
                  elevation={4}
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
                  {submission.graded &&
                    submission.rubric &&
                    inject.rubric.fields.length && (
                      <Box
                        display='flex'
                        flexDirection='column'
                        gap='8px'
                        width='100%'
                      >
                        {inject.rubric.fields.map((field) => (
                          <Paper
                            elevation={5}
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
                              label='Name'
                              value={field.name}
                            />
                            <TextField
                              size='small'
                              label='Notes'
                              value={
                                submission.rubric?.fields.find(
                                  (submissionFieldName) =>
                                    submissionFieldName.name === field.name
                                )?.notes
                              }
                              fullWidth
                            />
                            <TextField
                              size='small'
                              label='Scored Points'
                              value={
                                submission.rubric?.fields.find(
                                  (submissionFieldName) =>
                                    submissionFieldName.name === field.name
                                )?.score
                              }
                            />
                            <TextField
                              size='small'
                              label='Max Points'
                              value={field.max_score}
                            />
                          </Paper>
                        ))}
                        <TextField
                          size='small'
                          label='Submission Notes'
                          value={submission.notes}
                          fullWidth
                        />
                        <Box
                          display='flex'
                          flexDirection='row'
                          justifyContent='space-between'
                          alignItems='center'
                          width='100%'
                          marginBottom='8px'
                          marginTop='8px'
                          gap='16px'
                        >
                          <TextField
                            size='small'
                            label='Total Score'
                            value={submission.rubric.fields.reduce(
                              (acc, field) =>
                                acc +
                                (submission.rubric?.fields.find(
                                  (submissionFieldName) =>
                                    submissionFieldName.name === field.name
                                )?.score || 0),
                              0
                            )}
                            fullWidth
                          />
                          <TextField
                            size='small'
                            label='Inject Max Points'
                            value={inject.rubric.max_score}
                            fullWidth
                          />
                        </Box>
                      </Box>
                    )}
                </Paper>
              </>
            )}
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
                  <FileChip key={file.id} file={file} />
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

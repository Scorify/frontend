import React, { useMemo, useState, Suspense } from "react";
import { useDropzone } from "react-dropzone";

import { Close, CloudUpload, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  Grow,
  IconButton,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";
import { enqueueSnackbar } from "notistack";
import { DeleteInjectModal } from "../..";
import {
  InjectsQuery,
  RubricTemplateInput,
  useDeleteInjectMutation,
  useSubmissionsQuery,
  useUpdateInjectMutation,
} from "../../../graph";

type props = {
  inject: InjectsQuery["injects"][0];
  handleRefetch: () => void;
  visible: boolean;
};

export default function EditInject({ inject, handleRefetch, visible }: props) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs(inject.start_time)
  );
  const startTimeChanged = useMemo(
    () => startTime?.toISOString() != dayjs(inject.start_time).toISOString(),
    [startTime, inject.start_time]
  );

  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(inject.end_time));
  const endTimeChanged = useMemo(
    () => endTime?.toISOString() != dayjs(inject.end_time).toISOString(),
    [endTime, inject.end_time]
  );

  const [title, setTitle] = useState<string>(inject.title);
  const titleChanged = useMemo(
    () => title != inject.title,
    [title, inject.title]
  );

  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const filesChanged = useMemo(
    () => deleteFiles.length > 0 || newFiles.length > 0,
    [deleteFiles, newFiles]
  );

  const [rubric, setRubric] = useState<RubricTemplateInput>({
    max_score: inject.rubric.max_score,
    fields: inject.rubric.fields.map((field) => ({
      name: field.name,
      max_score: field.max_score,
    })),
  });
  const rubricChanged = useMemo(
    () =>
      JSON.stringify(rubric) !=
      JSON.stringify({
        max_score: inject.rubric.max_score,
        fields: inject.rubric.fields.map((field) => ({
          name: field.name,
          max_score: field.max_score,
        })),
      }),
    [rubric, inject]
  );

  const [updateInjectMutation] = useUpdateInjectMutation({
    onCompleted: () => {
      enqueueSnackbar("Inject updated successfully", { variant: "success" });
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const [deleteInjectMutation] = useDeleteInjectMutation({
    onCompleted: () => {
      enqueueSnackbar("Inject deleted successfully", { variant: "success" });
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const [grading, setGrading] = useState(false);
  const [renderPanel, setRenderPanel] = useState(false);

  const handleSave = () => {
    if (
      !titleChanged &&
      !startTimeChanged &&
      !endTimeChanged &&
      !filesChanged &&
      !rubricChanged
    ) {
      return;
    }
    updateInjectMutation({
      variables: {
        id: inject.id,
        title: titleChanged ? title : undefined,
        start_time: startTimeChanged ? startTime?.toISOString() : undefined,
        end_time: endTimeChanged ? endTime?.toISOString() : undefined,
        add_files: newFiles.length > 0 ? newFiles : undefined,
        delete_files: deleteFiles.length > 0 ? deleteFiles : undefined,
        rubric: rubricChanged ? rubric : undefined,
      },
    });
    setDeleteFiles([]);
    setNewFiles([]);
  };

  const handleDelete = () => {
    deleteInjectMutation({
      variables: {
        id: inject.id,
      },
    });
  };

  return (
    <>
      <DeleteInjectModal
        inject={inject.title}
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
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
                {expanded && !grading ? (
                  <TextField
                    label='Name'
                    value={title}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    sx={{ marginRight: "24px" }}
                    size='small'
                  />
                ) : (
                  <Typography variant='h6' component='div' marginRight='24px'>
                    {inject.title}
                  </Typography>
                )}
              </Box>
            }
            action={
              <Box display='flex' flexDirection='row' gap='12px'>
                <Box
                  display='flex'
                  flexDirection='row'
                  gap='12px'
                  padding='0px 4px'
                  overflow='hidden'
                >
                  <Slide
                    in={expanded}
                    timeout={300}
                    direction='left'
                    unmountOnExit
                    mountOnEnter
                  >
                    <Button
                      variant='contained'
                      onClick={(e) => {
                        setGrading((prev) => !prev);
                        e.stopPropagation();
                      }}
                      color='info'
                    >
                      {grading ? "Switch to Editting" : "Switch to Grading"}
                    </Button>
                  </Slide>
                  <Slide
                    in={expanded}
                    timeout={300}
                    direction='left'
                    unmountOnExit
                    mountOnEnter
                  >
                    <Button
                      variant='contained'
                      onClick={() => {
                        setOpen(true);
                      }}
                      color='error'
                    >
                      Delete
                    </Button>
                  </Slide>
                  <Slide
                    in={
                      titleChanged ||
                      startTimeChanged ||
                      endTimeChanged ||
                      filesChanged ||
                      rubricChanged
                    }
                    timeout={300}
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

                        handleSave();
                      }}
                    >
                      Save
                    </Button>
                  </Slide>
                </Box>
                <IconButton>
                  <ExpandMore />
                </IconButton>
              </Box>
            }
            onClick={() => {
              setExpanded((prev) => !prev);
            }}
          />
          {expanded && <Divider sx={{ margin: "0px 1rem" }} />}

          <Collapse
            in={expanded}
            timeout={300}
            onEnter={() => {
              setRenderPanel(true);
            }}
            onExited={() => {
              setRenderPanel(false);
            }}
          >
            {grading ? (
              <Suspense
                fallback={
                  <CardContent>
                    <CircularProgress />
                  </CardContent>
                }
              >
                {renderPanel && <GradeInjectPanel inject={inject} />}
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <CardContent>
                    <CircularProgress />
                  </CardContent>
                }
              >
                {renderPanel && (
                  <EditInjectPanel
                    rubric={rubric}
                    setRubric={setRubric}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    newFiles={newFiles}
                    setNewFiles={setNewFiles}
                    deleteFiles={deleteFiles}
                    setDeleteFiles={setDeleteFiles}
                    inject={inject}
                  />
                )}
              </Suspense>
            )}
          </Collapse>
        </Card>
      </Grow>
    </>
  );
}

type GradeInjectPanelProps = {
  inject: InjectsQuery["injects"][0];
};

function GradeInjectPanel({ inject }: GradeInjectPanelProps) {
  const { data, loading, error } = useSubmissionsQuery({
    variables: {
      inject_id: inject.id,
    },
  });

  if (loading) {
    return (
      <CardContent>
        <CircularProgress />
      </CardContent>
    );
  }

  if (error) {
    return (
      <CardContent>
        <Typography variant='h6' color='error'>
          {error.message}
        </Typography>
      </CardContent>
    );
  }

  return (
    <CardContent>
      {data?.injectSubmissionsByUser.map(({ user, submissions }) => (
        <Paper
          key={user.number}
          sx={{ padding: "12px", marginBottom: "12px" }}
          elevation={2}
        >
          <Typography variant='h5'>{user.username}</Typography>
          {submissions.map((submission, i) => (
            <Paper
              key={submission.id}
              elevation={3}
              sx={{ padding: "12px", marginTop: "12px" }}
            >
              <Typography variant='h6'>
                Submission {submissions.length - i}
              </Typography>
              {submission.files.map((file) => (
                <Chip
                  key={file.id}
                  label={file.name}
                  onClick={() =>
                    window.open("http://localhost:8080" + file.url, "_blank")
                  }
                />
              ))}
            </Paper>
          ))}
        </Paper>
      ))}
    </CardContent>
  );
}

type EditInjectPanelProps = {
  rubric: RubricTemplateInput;
  setRubric: React.Dispatch<React.SetStateAction<RubricTemplateInput>>;
  startTime: Dayjs | null;
  setStartTime: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  endTime: Dayjs | null;
  setEndTime: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  newFiles: File[];
  setNewFiles: React.Dispatch<React.SetStateAction<File[]>>;
  deleteFiles: string[];
  setDeleteFiles: React.Dispatch<React.SetStateAction<string[]>>;
  inject: InjectsQuery["injects"][0];
};

function EditInjectPanel({
  rubric,
  setRubric,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  newFiles,
  setNewFiles,
  deleteFiles,
  setDeleteFiles,
  inject,
}: EditInjectPanelProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setNewFiles((prev) => {
        if (prev) {
          return prev.concat(acceptedFiles);
        } else {
          return acceptedFiles;
        }
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  console.log("test");

  return (
    <CardContent>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <DateTimePicker
            sx={{ marginTop: "24px" }}
            label='Start Time'
            value={startTime}
            onChange={(date) => {
              setStartTime(date);
            }}
          />
          <DateTimePicker
            sx={{ marginTop: "24px" }}
            label='End Time'
            value={endTime}
            onChange={(date) => {
              setEndTime(date);
            }}
          />
        </Box>
      </LocalizationProvider>
      <Paper
        sx={{
          marginTop: "24px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        elevation={2}
      >
        {rubric.fields.map((field, i) => (
          <Paper key={i} elevation={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px",
                gap: "16px",
              }}
            >
              <TextField
                label='Field Name'
                variant='outlined'
                size='small'
                value={field.name}
                onChange={(e) => {
                  setRubric((prev) => ({
                    ...prev,
                    fields: prev.fields.map((f, index) =>
                      index === i ? { ...f, name: e.target.value } : f
                    ),
                  }));
                }}
                fullWidth
              />
              <TextField
                label='Max Score'
                variant='outlined'
                size='small'
                type='number'
                value={field.max_score === 0 ? "" : field.max_score}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/^0+/, "");
                  const newScore = parseInt(newValue, 10) || 0;
                  setRubric((prev) => ({
                    max_score: prev.max_score + newScore - field.max_score,
                    fields: prev.fields.map((f, index) =>
                      index === i ? { ...f, max_score: newScore } : f
                    ),
                  }));
                }}
                inputProps={{ inputMode: "numeric" }}
              />
              <IconButton
                onClick={() => {
                  setRubric((prev) => ({
                    max_score: prev.max_score - field.max_score,
                    fields: prev.fields.filter((_, index) => index !== i),
                  }));
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Paper>
        ))}
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Button
            variant='contained'
            onClick={() => {
              setRubric((prev) => ({
                ...prev,
                fields: [...prev.fields, { name: "", max_score: 0 }],
              }));
            }}
            color='inherit'
            fullWidth
          >
            Add New Field
          </Button>
          <TextField
            label='Max Score'
            variant='outlined'
            size='small'
            type='number'
            value={rubric.max_score}
            onChange={(e) => {
              const newScore = parseInt(e.target.value, 10);
              setRubric((prev) => ({
                max_score: newScore,
                fields: prev.fields,
              }));
            }}
          />
        </Box>
      </Paper>
      <Paper
        {...getRootProps()}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "75px",
          borderRadius: "8px",
          border: "4px dashed #ccc",
          cursor: "pointer",
          margin: "24px 12px 16px 12px",
        }}
        elevation={4}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant='h5'>Drop files here...</Typography>
        ) : (
          <>
            <CloudUpload
              sx={{
                fontSize: "36px",
                color: "#ccc",
                marginRight: "8px",
              }}
            />
            <Typography variant='h6'>Add Files</Typography>
          </>
        )}
      </Paper>
      {(newFiles.length > 0 || (inject.files && inject.files.length > 0)) && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mt: "8px",
            gap: "8px",
          }}
        >
          {inject.files.map((file) => (
            <Chip
              key={file.id}
              label={
                file.name.length > 25
                  ? `${file.name.slice(0, 10)}[...]${file.name.slice(
                      file.name.length - 10
                    )}`
                  : file.name
              }
              color={deleteFiles.includes(file.id) ? "error" : "default"}
              onClick={() =>
                window.open("http://localhost:8080" + file.url, "_blank")
              }
              onDelete={() => {
                if (deleteFiles.includes(file.id)) {
                  setDeleteFiles((prev) => prev.filter((id) => id != file.id));
                  return;
                }
                setDeleteFiles((prev) => [...prev, file.id]);
              }}
            />
          ))}
          {newFiles.map((file, i) => (
            <Chip
              key={`${file.name}-${i}`}
              label={
                file.name.length > 25
                  ? `${file.name.slice(0, 10)}[...]${file.name.slice(
                      file.name.length - 10
                    )}`
                  : file.name
              }
              onClick={() => window.open(URL.createObjectURL(file), "_blank")}
              color='success'
              onDelete={() => {
                setNewFiles((prev) => prev.filter((_, index) => i != index));
              }}
            />
          ))}
        </Box>
      )}
    </CardContent>
  );
}

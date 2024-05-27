import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { Close, CloudUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { enqueueSnackbar } from "notistack";

import { useCreateInjectMutation, RubricTemplateInput } from "../../../graph";

type props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  handleRefetch: () => void;
};

export default function CreateCheckModal({
  open,
  setOpen,
  handleRefetch,
}: props) {
  const [createInjectMutation] = useCreateInjectMutation({
    onCompleted: () => {
      enqueueSnackbar("Inject created successfully", { variant: "success" });
      setOpen(false);
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const [name, setName] = useState<string>("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  const [rubric, setRubric] = useState<RubricTemplateInput>({
    max_score: 0,
    fields: [],
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prev) => {
        if (prev) {
          return prev.concat(acceptedFiles);
        } else {
          return acceptedFiles;
        }
      });
    },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      if (prev) {
        return prev.filter((_, i) => i !== index);
      } else {
        return null;
      }
    });
  };

  const handleCreateInject = () => {
    if (name === "" || !startTime || !endTime || !files) {
      enqueueSnackbar("Please fill out all fields", { variant: "error" });
      return;
    }

    createInjectMutation({
      variables: {
        title: name,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        files,
        rubric,
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -25%)",
          width: "auto",
          maxWidth: "90vw",
          bgcolor: "background.paper",
          border: `1px solid #000`,
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component='h1' variant='h3'>
            Create New Inject
          </Typography>
          <FormControl></FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                marginTop: "24px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                label='Name'
                variant='outlined'
                value={name}
                onChange={(event) => {
                  setName(event.target.value as string);
                }}
              />
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
                            max_score:
                              prev.max_score + newScore - field.max_score,
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
                            fields: prev.fields.filter(
                              (_, index) => index !== i
                            ),
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
                  padding: "12px",
                  borderRadius: "8px",
                  border: "4px dashed #ccc",
                  cursor: "pointer",
                  marginTop: "24px",
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Typography variant='h5' sx={{ color: "#999" }}>
                    Drop files here...
                  </Typography>
                ) : (
                  <>
                    <CloudUpload
                      sx={{
                        fontSize: "36px",
                        color: "#ccc",
                        marginRight: "8px",
                      }}
                    />
                    <Typography variant='h6' sx={{ color: "#999" }}>
                      Add Files
                    </Typography>
                  </>
                )}
              </Paper>
              {files && files.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", mt: "8px" }}>
                  {files.map((file, i) => (
                    <Paper
                      key={file.name}
                      sx={{
                        padding: "0px 12px",
                        borderRadius: "16px",
                        margin: "2px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open(URL.createObjectURL(file), "_blank")
                      }
                    >
                      <Typography variant='body2'>
                        {file.name.length > 25
                          ? `${file.name.slice(0, 10)}[...]${file.name.slice(
                              file.name.length - 10
                            )}`
                          : file.name}
                      </Typography>
                      <IconButton
                        sx={{ ml: "auto" }}
                        onClick={(e) => {
                          removeFile(i);
                          e.stopPropagation();
                        }}
                      >
                        <Close />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
              )}
            </Box>
          </LocalizationProvider>
          <Button
            variant='contained'
            sx={{ marginTop: "24px" }}
            disabled={name === "" || !startTime || !endTime}
            onClick={handleCreateInject}
          >
            Create Inject
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

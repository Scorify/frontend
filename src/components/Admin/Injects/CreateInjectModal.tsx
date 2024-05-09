import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { CloudUpload, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

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
  const [name, setName] = useState<string>("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);

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
                      }}
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
                        onClick={() => removeFile(i)}
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
            disabled={name === ""}
            onClick={() => {
              console.log({ name, startTime, endTime, files });
              handleRefetch();
            }}
          >
            Create Inject
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

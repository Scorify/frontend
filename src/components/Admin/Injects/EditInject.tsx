import { useMemo, useState } from "react";

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
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";
import { DeleteInjectModal } from "../..";
import { InjectsQuery } from "../../../graph";

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

  const handleSave = () => {
    handleRefetch();
  };
  const handleDelete = () => {};
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
                {expanded ? (
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
                    filesChanged
                  }
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

                      handleSave();
                    }}
                  >
                    Save
                  </Button>
                </Slide>
              </Box>
            }
            onClick={() => {
              setExpanded((prev) => !prev);
            }}
          />
          {expanded && <Divider sx={{ margin: "0px 20%" }} />}

          <Collapse in={expanded} timeout={300}>
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
              {(newFiles.length > 0 ||
                (inject.files && inject.files.length > 0)) && (
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
                      color={
                        deleteFiles.includes(file.id) ? "error" : "default"
                      }
                      onDelete={() => {
                        if (deleteFiles.includes(file.id)) {
                          setDeleteFiles((prev) =>
                            prev.filter((id) => id != file.id)
                          );
                          return;
                        }
                        setDeleteFiles((prev) => [...prev, file.id]);
                      }}
                    />
                  ))}
                </Box>
              )}
            </CardContent>
          </Collapse>
        </Card>
      </Grow>
    </>
  );
}

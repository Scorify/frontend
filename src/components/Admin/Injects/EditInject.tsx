import { useMemo, useState } from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grow,
  IconButton,
  Slide,
  TextField,
  Typography,
} from "@mui/material";

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

  const [title, setTitle] = useState<string>(inject.title);
  const titleChanged = useMemo(
    () => title != inject.title,
    [title, inject.title]
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
                    value={name}
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
                  in={titleChanged}
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
              <Typography variant='body1' component='div'>
                Start Time: {inject.start_time}
              </Typography>
              <Typography variant='body1' component='div'>
                End Time: {inject.end_time}
              </Typography>
              <Typography variant='body1' component='div'>
                Files: {JSON.stringify(inject.files)}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grow>
    </>
  );
}

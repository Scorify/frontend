import { useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { ChecksQuery, useCreateCheckMutation } from "../graph";
import { ConfigField } from "./";

type props = {
  data: ChecksQuery | undefined;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export default function CreateCheckModal({ data, open, setOpen }: props) {
  const [createCheckMutation] = useCreateCheckMutation({
    onCompleted: () => {
      enqueueSnackbar("Check created successfully", { variant: "success" });
      setOpen(false);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const [source, setSource] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [schema, setSchema] = useState<{
    [key: string]: "string" | "int" | "bool";
  }>({});
  const [config, setConfig] = useState<{
    [key: string]: string | number | boolean;
  }>({});

  useEffect(() => {
    if (data && data.sources.find((s) => s.name === source)) {
      setSchema(
        JSON.parse(
          (data.sources.find((s) => s.name === source) as { schema: string })
            .schema
        ) || {}
      );
    } else if (source === "") {
      setSchema({});
    }
  }, [data, source]);

  useEffect(() => {
    let newConfig = {} as {
      [key: string]: string | number | boolean;
    };

    for (const [key, type] of Object.entries(schema)) {
      if (type === "bool") {
        newConfig[key] = false;
      } else if (type === "int") {
        newConfig[key] = 0;
      } else if (type === "string") {
        newConfig[key] = "";
      }
    }

    setConfig(newConfig);
  }, [schema]);

  const handleInputChange = (key: string, value: string | number | boolean) => {
    setConfig({
      ...config,
      [key]: value,
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
            Create New Check
          </Typography>
          <FormControl sx={{ marginTop: "24px" }}>
            <InputLabel id='source'>Source</InputLabel>
            <Select
              labelId='source'
              value={source}
              label='Source'
              onChange={(event: SelectChangeEvent) => {
                setSource(event.target.value as string);
              }}
            >
              <MenuItem value=''>None</MenuItem>
              {data?.sources.map((source) => (
                <MenuItem key={source.name} value={source.name}>
                  {source.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              label='Name'
              variant='outlined'
              sx={{
                marginTop: "24px",
              }}
              value={name}
              onChange={(event) => {
                setName(event.target.value as string);
              }}
            />
            <Box sx={{ justifyContent: "center" }}>
              <Typography
                component='h1'
                variant='h4'
                marginTop='24px'
                align='center'
              >
                Check Configuration
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {source !== "" && data && schema ? (
                <>
                  {Object.entries(schema).map(([index, type]) => (
                    <ConfigField
                      key={index}
                      handleInputChange={handleInputChange}
                      index={index}
                      value={type}
                      config={config}
                    />
                  ))}
                </>
              ) : (
                <Typography component='h1' variant='body1' marginTop='12px'>
                  Select a source to see the configuration options
                </Typography>
              )}
            </Box>
          </FormControl>

          <Typography component='h1' variant='body1' marginTop='12px'>
            <b>Config:</b> {JSON.stringify(config)}
          </Typography>

          <Button
            variant='contained'
            sx={{ marginTop: "24px" }}
            onClick={() => {
              if (source === "") {
                enqueueSnackbar("Source must be set", {
                  variant: "error",
                });
                return;
              }

              if (name === "") {
                enqueueSnackbar("Name must be set", {
                  variant: "error",
                });
                return;
              }

              createCheckMutation({
                variables: {
                  source: source,
                  name: name,
                  config: JSON.stringify(config),
                },
              });
            }}
          >
            Create Check
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

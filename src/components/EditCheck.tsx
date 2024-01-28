import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Slide,
  TextField,
  Typography,
} from "@mui/material";

import { enqueueSnackbar } from "notistack";
import {
  ChecksQuery,
  useDeleteCheckMutation,
  useUpdateCheckMutation,
} from "../graph";
import { ConfigField } from "./";

type props = {
  check: ChecksQuery["checks"][0];
  handleRefetch: () => void;
};

export default function EditCheck({ check, handleRefetch }: props) {
  const [expanded, setExpanded] = useState(false);

  const [config, setConfig] = useState<{
    [key: string]: string | number | boolean;
  }>(JSON.parse(check.config));
  const [configChanged, setConfigChanged] = useState(false);
  useEffect(() => {
    setConfigChanged(JSON.stringify(config) != check.config);
  }, [config, check.config]);

  const [name, setName] = useState<string>(check.name);
  const [nameChanged, setNameChanged] = useState(name != check.name);
  useEffect(() => {
    setNameChanged(name != check.name);
  }, [name, check.name]);

  const [updateCheckMutation] = useUpdateCheckMutation({
    onCompleted: () => {
      enqueueSnackbar("Check updated successfully", { variant: "success" });
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.log(error);
    },
  });

  const [DeleteCheckMutation] = useDeleteCheckMutation({
    onCompleted: () => {
      enqueueSnackbar("Check deleted successfully", { variant: "success" });
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.log(error);
    },
  });

  const handleInputChange = (key: string, value: string | number | boolean) => {
    setConfig({
      ...config,
      [key]: value,
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSave = () => {
    if (nameChanged && configChanged) {
      updateCheckMutation({
        variables: {
          id: check.id,
          config: JSON.stringify(config),
          name: name,
        },
      });
    } else if (nameChanged) {
      updateCheckMutation({
        variables: {
          id: check.id,
          name: name,
        },
      });
    } else if (configChanged) {
      updateCheckMutation({
        variables: {
          id: check.id,
          config: JSON.stringify(config),
        },
      });
    }
  };

  const handleDelete = () => {
    DeleteCheckMutation({
      variables: {
        id: check.id,
      },
    });
  };

  return (
    <Card sx={{ width: "100%", marginBottom: "24px" }} variant='elevation'>
      <CardHeader
        title={
          <Box display='flex' flexDirection='row' alignItems='baseline'>
            {expanded ? (
              <TextField
                label='Name'
                value={name}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                sx={{ marginRight: "24px" }}
              />
            ) : (
              <Typography variant='h6' component='div' marginRight='24px'>
                {check.name}
              </Typography>
            )}
            <Typography
              variant='subtitle1'
              color='textSecondary'
              component='div'
            >
              {check.source.name}
            </Typography>
          </Box>
        }
        action={
          <Box display='flex' flexDirection='row' gap='12px'>
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
              <Button variant='contained' onClick={handleDelete} color='error'>
                Delete
              </Button>
            </Slide>
            <Slide
              in={configChanged || nameChanged}
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
        onClick={handleExpandClick}
      />
      {expanded && <Divider sx={{ margin: "0px 20%" }} />}

      <Collapse in={expanded} timeout={300}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Object.entries(JSON.parse(check.source.schema)).map(
              ([index, type]) => (
                <ConfigField
                  key={index}
                  index={index}
                  handleInputChange={handleInputChange}
                  value={type as "string" | "int" | "bool"}
                  config={config}
                />
              )
            )}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

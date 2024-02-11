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

import { enqueueSnackbar } from "notistack";
import { ConfigField, DeleteCheckModal, Multiselect } from "../..";
import {
  ChecksQuery,
  useDeleteCheckMutation,
  useUpdateCheckMutation,
} from "../../../graph";

type props = {
  check: ChecksQuery["checks"][0];
  handleRefetch: () => void;
  visible: boolean;
};

export default function EditCheck({ check, visible, handleRefetch }: props) {
  const [expanded, setExpanded] = useState(false);

  const [config, setConfig] = useState<{
    [key: string]: number | boolean | string;
  }>(JSON.parse(check.config.config));
  const configChanged = useMemo(
    () => JSON.stringify(config) != check.config.config,
    [config, check.config.config]
  );

  const [edittableFields, setEdittableFields] = useState<string[]>(
    check.config.editable_fields
  );
  const editableFieldsChanged = useMemo(() => {
    return (
      [...edittableFields].sort().join(",") !=
      [...check.config.editable_fields].sort().join(",")
    );
  }, [edittableFields, check.config.editable_fields]);

  const [name, setName] = useState<string>(check.name);
  const nameChanged = useMemo(() => name != check.name, [name, check.name]);

  const [open, setOpen] = useState(false);

  const [updateCheckMutation] = useUpdateCheckMutation({
    onCompleted: () => {
      enqueueSnackbar("Check updated successfully", { variant: "success" });
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  const [DeleteCheckMutation] = useDeleteCheckMutation({
    onCompleted: () => {
      enqueueSnackbar("Check deleted successfully", { variant: "success" });
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  const handleConfigChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setConfig({ ...config, [key]: value });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSave = () => {
    updateCheckMutation({
      variables: {
        id: check.id,
        name: nameChanged ? name : undefined,
        config: configChanged ? JSON.stringify(config) : undefined,
        editable_fields: editableFieldsChanged ? edittableFields : undefined,
      },
    });
  };

  const handleDelete = () => {
    DeleteCheckMutation({
      variables: {
        id: check.id,
      },
    });
  };

  return (
    <>
      <DeleteCheckModal
        check={check.name}
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
                    size='small'
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
                  in={configChanged || nameChanged || editableFieldsChanged}
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
                      handleInputChange={handleConfigChange}
                      value={type as "string" | "int" | "bool"}
                      config={config}
                    />
                  )
                )}
              </Box>
              <Divider sx={{ margin: "16px 20% 20px 20%" }} />
              <Multiselect
                label='Set User Edittable Fields'
                placeholder='Select fields'
                options={Object.keys(config)}
                selected={edittableFields}
                setSelected={setEdittableFields}
              />
            </CardContent>
          </Collapse>
        </Card>
      </Grow>
    </>
  );
}

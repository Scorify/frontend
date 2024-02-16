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
  Typography,
} from "@mui/material";

import { enqueueSnackbar } from "notistack";
import { ConfigField } from "..";
import { ConfigsQuery, useEditConfigMutation } from "../../graph";

type props = {
  config: ConfigsQuery["configs"][0];
  handleRefetch: () => void;
  visible: boolean;
};

export default function ConfigureCheck({
  config,
  visible,
  handleRefetch,
}: props) {
  const [expanded, setExpanded] = useState(false);

  const [checkConfig, setCheckConfig] = useState<{
    [key: string]: number | boolean | string;
  }>(JSON.parse(config.config));
  const configChanged = useMemo(
    () => JSON.stringify(checkConfig) != config.config,
    [checkConfig, config.config]
  );

  const [useEditConfig] = useEditConfigMutation({
    onCompleted: () => {
      enqueueSnackbar("Config saved", { variant: "success" });
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar("Error saving config", { variant: "error" });
      console.error(error);
    },
  });

  const handleConfigChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setCheckConfig({ ...checkConfig, [key]: value });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSave = () => {
    useEditConfig({
      variables: {
        id: config.id,
        config: JSON.stringify(checkConfig),
      },
    });
  };

  return (
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
              <Typography variant='h6' component='div' marginRight='24px'>
                {config.check.name}
              </Typography>
              <Typography
                variant='subtitle1'
                color='textSecondary'
                component='div'
              >
                {config.check.source.name}
              </Typography>
            </Box>
          }
          action={
            <Box display='flex' flexDirection='row' gap='12px'>
              <IconButton>
                <ExpandMore />
              </IconButton>
              <Slide
                in={configChanged}
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
              {Object.entries(checkConfig).map(([key, _]) => (
                <ConfigField
                  key={key}
                  index={key}
                  handleInputChange={handleConfigChange}
                  value={
                    JSON.parse(config.check.source.schema)[key] as
                      | "string"
                      | "int"
                      | "bool"
                  }
                  config={checkConfig}
                />
              ))}
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Grow>
  );
}

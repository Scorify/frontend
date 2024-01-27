import { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import { ChecksQuery, useUpdateCheckMutation } from "../graph";
import { ConfigField } from "./";
import { enqueueSnackbar } from "notistack";

type props = {
  check: ChecksQuery["checks"][0];
  handleRefetch: () => void;
};

export default function EditCheck({ check, handleRefetch }: props) {
  const [expanded, setExpanded] = useState(false);
  const transitionContainerRef = useRef<HTMLDivElement | null>(null);
  const [config, setConfig] = useState<{
    [key: string]: string | number | boolean;
  }>(JSON.parse(check.config));
  const [configChanged, setConfigChanged] = useState(false);
  const [updateCheckMutation] = useUpdateCheckMutation({
    onCompleted: () => {
      enqueueSnackbar("Check updated successfully", { variant: "success" });
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  useEffect(() => {
    setConfigChanged(JSON.stringify(config) != check.config);
  }, [config, check.config]);

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
    updateCheckMutation({
      variables: {
        id: check.id,
        config: JSON.stringify(config),
      },
    });
  };

  const transitionStyles = {
    entering: { height: 0, overflow: "hidden" },
    entered: { height: "auto", overflow: "visible" },
    exiting: { height: "auto", overflow: "visible" },
    exited: { height: 0, overflow: "hidden" },
    unmounted: {},
  };

  return (
    <Card sx={{ width: "100%", marginBottom: "24px" }} variant='elevation'>
      <CardHeader
        title={
          <Box display='flex' flexDirection='row' alignItems='baseline'>
            <Typography variant='h6' component='div' marginRight='24px'>
              {check.name}
            </Typography>
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
          <>
            <IconButton aria-label='expand' onClick={handleExpandClick}>
              <ExpandMore />
            </IconButton>
            {configChanged && (
              <Button variant='contained' onClick={handleSave}>
                Save
              </Button>
            )}
          </>
        }
        onClick={handleExpandClick}
      />
      <Transition
        in={expanded}
        timeout={{ enter: 300, exit: 300 }}
        nodeRef={transitionContainerRef}
      >
        {(state) => (
          <Collapse
            in={expanded}
            timeout={300}
            ref={transitionContainerRef}
            style={{
              ...transitionStyles[state],
              transition: "height 0.3s ease-in-out",
            }}
          >
            <Divider sx={{ margin: "0px 12px" }} />
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
              <Typography component='h1' variant='body1' marginTop='12px'>
                <b>Config: </b>
                {JSON.stringify(config)}
              </Typography>
            </CardContent>
          </Collapse>
        )}
      </Transition>
    </Card>
  );
}

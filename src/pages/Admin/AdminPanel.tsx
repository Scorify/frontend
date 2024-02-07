import { useState } from "react";

import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";

import { Notification } from "../../components";

export default function AdminPanel() {
  const urlSearchParams = new URLSearchParams(location.search);

  let param = urlSearchParams.get("selected") || "notification";
  if (!(param in ["notification"])) {
    param = "notification";
  }

  const [selected, setSelected] = useState<"notification" | "engine">(
    param as "notification"
  );

  const components = {
    notification: <Notification />,
    engine: <div>Engine</div>,
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h3'>
          Admin Panel
        </Typography>
        <Box sx={{ m: 2 }} />
        <ButtonGroup variant='contained' fullWidth sx={{ display: "flex" }}>
          <Button
            disabled={selected === "notification"}
            sx={{ flexGrow: 1 }}
            onClick={() => {
              setSelected("notification");
            }}
          >
            Send Notification
          </Button>
          <Button
            disabled={selected === "engine"}
            sx={{ flexGrow: 1 }}
            onClick={() => {
              setSelected("engine");
            }}
          >
            Engine State
          </Button>
        </ButtonGroup>
        <Box sx={{ m: 2 }} />
        {components[selected]}
      </Box>
    </Container>
  );
}

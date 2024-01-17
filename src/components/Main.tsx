import { Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import { Drawer, Navbar } from ".";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export default function Main({ theme, setTheme }: props) {
  const [drawerState, setDrawerState] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "default" }}>
      <Drawer drawerState={drawerState} setDrawerState={setDrawerState} />
      <Navbar
        theme={theme}
        setTheme={setTheme}
        setDrawerState={setDrawerState}
      />
      <Container component='main'>
        <Outlet />
      </Container>
    </Box>
  );
}

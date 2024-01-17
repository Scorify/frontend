import { Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import { Container, Box } from "@mui/material";

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

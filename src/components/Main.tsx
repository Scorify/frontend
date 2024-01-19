import { Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";

import { Box, Container } from "@mui/material";

import { Drawer, Navbar } from ".";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  cookies: any;
  removeCookie: (name: "auth", options?: CookieSetOptions | undefined) => void;
};

export default function Main({
  theme,
  setTheme,
  cookies,
  removeCookie,
}: props) {
  const [drawerState, setDrawerState] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "default" }}>
      <Drawer
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        cookies={cookies}
      />
      <Navbar
        theme={theme}
        setTheme={setTheme}
        setDrawerState={setDrawerState}
        cookies={cookies}
        removeCookie={removeCookie}
      />
      <Container component='main'>
        <Outlet />
      </Container>
    </Box>
  );
}

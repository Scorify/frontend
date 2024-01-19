import { Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";

import { Box, Container } from "@mui/material";

import { Drawer, Navbar } from ".";
import { JWT } from "../models";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  cookies: any;
  removeCookie: (name: "auth", options?: CookieSetOptions | undefined) => void;
  jwt: JWT;
};

export default function Main({
  theme,
  setTheme,
  cookies,
  removeCookie,
  jwt,
}: props) {
  const [drawerState, setDrawerState] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "default" }}>
      <Drawer
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        cookies={cookies}
        jwt={jwt}
      />
      <Navbar
        theme={theme}
        setTheme={setTheme}
        setDrawerState={setDrawerState}
        cookies={cookies}
        removeCookie={removeCookie}
        jwt={jwt}
      />
      <Container component='main'>
        <Outlet />
      </Container>
    </Box>
  );
}

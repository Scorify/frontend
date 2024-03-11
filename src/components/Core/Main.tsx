import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import { Drawer, Navbar } from "..";
import { EngineState } from "../../graph";
import { AuthContext } from "../Context";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  engineState: EngineState | undefined;
};

export default function Main({ theme, setTheme, engineState }: props) {
  const [drawerState, setDrawerState] = useState(false);
  const { cookies, setCookie, removeCookie, jwt, me } = useContext(AuthContext);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "default" }}>
      <Drawer
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        me={me}
        jwt={jwt}
        setCookie={setCookie}
        removeCookie={removeCookie}
      />
      <Navbar
        theme={theme}
        setTheme={setTheme}
        setDrawerState={setDrawerState}
        cookies={cookies}
        removeCookie={removeCookie}
        engineState={engineState}
        me={me}
      />
      <Container component='main'>
        <Outlet />
      </Container>
    </Box>
  );
}

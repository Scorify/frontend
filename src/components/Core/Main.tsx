import { Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";

import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Box, Container } from "@mui/material";

import { Drawer, Navbar } from "..";
import { EngineState, MeQuery } from "../../graph";
import { Cookies, JWT, RemoveCookie, SetCookie } from "../../models";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  jwt: JWT;
  me: MeQuery | undefined;
  cookies: Cookies;
  setCookie: SetCookie;
  removeCookie: RemoveCookie;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  engineState: EngineState | undefined;
};

export default function Main({
  theme,
  setTheme,
  jwt,
  cookies,
  setCookie,
  removeCookie,
  apolloClient,
  engineState,
  me,
}: props) {
  const [drawerState, setDrawerState] = useState(false);
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
        apolloClient={apolloClient}
        engineState={engineState}
        me={me}
      />
      <Container component='main'>
        <Outlet />
      </Container>
    </Box>
  );
}

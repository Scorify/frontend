import { Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";

import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Box, Container } from "@mui/material";

import { Drawer, Navbar } from "..";
import { JWT } from "../../models";
import { EngineState } from "../../graph";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  jwt: JWT;
  cookies: {
    auth?: any;
    admin?: any;
  };
  setCookie: (
    name: "auth" | "admin",
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
  removeCookie: (
    name: "auth" | "admin",
    options?: CookieSetOptions | undefined
  ) => void;
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
}: props) {
  const [drawerState, setDrawerState] = useState(false);
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "default" }}>
      <Drawer
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        jwt={jwt}
        cookies={cookies}
        setCookie={setCookie}
        removeCookie={removeCookie}
      />
      <Navbar
        theme={theme}
        setTheme={setTheme}
        setDrawerState={setDrawerState}
        cookies={cookies}
        removeCookie={removeCookie}
        jwt={jwt}
        apolloClient={apolloClient}
        engineState={engineState}
      />
      <Container component='main'>
        <Outlet />
      </Container>
    </Box>
  );
}

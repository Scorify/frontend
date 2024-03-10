import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Box, Container } from "@mui/material";

import { Drawer, Navbar } from "..";
import { EngineState } from "../../graph";
import { AuthContext } from "../Context";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  engineState: EngineState | undefined;
};

export default function Main({
  theme,
  setTheme,
  apolloClient,
  engineState,
}: props) {
  const [drawerState, setDrawerState] = useState(false);
  const { cookies, setCookie, removeCookie, jwt, me, refetchMe } =
    useContext(AuthContext);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "default" }}>
      <Drawer
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        me={me}
        jwt={jwt}
        setCookie={setCookie}
        removeCookie={removeCookie}
        refetchMe={refetchMe}
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
        refetchMe={refetchMe}
      />
      <Container component='main'>
        <Outlet />
      </Container>
    </Box>
  );
}

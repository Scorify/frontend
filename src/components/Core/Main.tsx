import { Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";

import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Box, Container } from "@mui/material";

import { enqueueSnackbar } from "notistack";
import { Drawer, Navbar } from "..";
import { useGlobalNotificationSubscription } from "../../graph";
import { JWT } from "../../models";

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
};

export default function Main({
  theme,
  setTheme,
  jwt,
  cookies,
  setCookie,
  removeCookie,
  apolloClient,
}: props) {
  const [drawerState, setDrawerState] = useState(false);

  useGlobalNotificationSubscription({
    onData: (data) => {
      if (data.data.data?.globalNotification) {
        enqueueSnackbar(data.data.data.globalNotification.message, {
          variant: data.data.data.globalNotification.type,
        });
      }
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

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
      />
      <Container component='main'>
        <Outlet />
      </Container>
    </Box>
  );
}

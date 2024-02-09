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
  cookies: {
    auth?: any;
    admin?: any;
  };
  removeCookie: (
    name: "auth" | "admin",
    options?: CookieSetOptions | undefined
  ) => void;
  jwt: JWT;
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export default function Main({
  theme,
  setTheme,
  cookies,
  removeCookie,
  jwt,
  apolloClient,
}: props) {
  const [drawerState, setDrawerState] = useState(false);

  useGlobalNotificationSubscription({
    onData: (data) => {
      console.log(data.data.data?.globalNotification);
      if (data.data.data?.globalNotification) {
        enqueueSnackbar(data.data.data.globalNotification.message, {
          variant: data.data.data.globalNotification.type,
        });
      }
    },
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "default" }}>
      <Drawer
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        cookies={cookies}
        jwt={jwt}
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

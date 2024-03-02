import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router";

import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { DarkMode, LightMode, Login, Logout, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { CookieSetOptions } from "universal-cookie";

import { StatusIndicator } from "..";
import { EngineState, useEngineStateSubscription } from "../../graph";
import { JWT } from "../../models";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
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

export default function Navbar({
  theme,
  setTheme,
  setDrawerState,
  removeCookie,
  jwt,
  apolloClient,
}: props) {
  const navigate = useNavigate();

  const [engineState, setEngineState] = useState<boolean>();

  useEngineStateSubscription({
    onData: (data) => {
      if (data && data.data) {
        setEngineState(data.data.data?.engineState === EngineState.Running);
      }
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ width: "33%" }}>
            <Tooltip title='Open Drawer'>
              <Button
                onClick={() => {
                  setDrawerState(true);
                }}
              >
                <Menu sx={{ color: "white" }} />
              </Button>
            </Tooltip>
          </Box>
          <Box sx={{ width: "34%", display: "flex", justifyContent: "center" }}>
            {jwt && (
              <Button
                onClick={() => {
                  navigate("/");
                }}
                sx={{
                  color: "inherit",
                  textTransform: "none",
                }}
              >
                <Typography variant='h6'>{jwt.username}</Typography>
              </Button>
            )}
          </Box>
          <Box
            sx={{
              width: "33%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <StatusIndicator
              status={engineState || false}
              positiveTitle='Engine is Scoring'
              negativeTitle='Engine is Paused'
              sx={{ margin: "10px" }}
            />
            {jwt ? (
              <Tooltip title='logout'>
                <Button
                  onClick={() => {
                    removeCookie("auth");
                    apolloClient.clearStore();
                    navigate("/login");
                  }}
                  sx={{
                    color: "inherit",
                    minWidth: "0px",
                  }}
                >
                  <Logout />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title='Login'>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  sx={{
                    color: "inherit",
                    minWidth: "0px",
                  }}
                >
                  <Login />
                </Button>
              </Tooltip>
            )}
            <Tooltip
              title={theme === "dark" ? "Set Light Mode" : "Set Dark Mode"}
            >
              <Button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                sx={{
                  color: "inherit",
                  minWidth: "0px",
                }}
              >
                {theme === "dark" ? (
                  <LightMode sx={{ color: "white" }} />
                ) : (
                  <DarkMode sx={{ color: "white" }} />
                )}
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import { Dispatch, SetStateAction } from "react";
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

import { StatusIndicator } from "..";
import { EngineState, MeQuery } from "../../graph";
import { Cookies, RemoveCookie } from "../../models";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  cookies: Cookies;
  removeCookie: RemoveCookie;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  engineState: EngineState | undefined;
  me: MeQuery | undefined;
  refetchMe: () => void;
};

export default function Navbar({
  theme,
  setTheme,
  setDrawerState,
  removeCookie,
  apolloClient,
  engineState,
  me,
  refetchMe,
}: props) {
  const navigate = useNavigate();

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
            {me && (
              <Button
                onClick={() => {
                  navigate("/");
                }}
                sx={{
                  color: "inherit",
                  textTransform: "none",
                }}
              >
                <Typography variant='h6'>{me?.me.username}</Typography>
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
              status={engineState}
              positiveTitle='Engine is Scoring'
              negativeTitle='Engine is Paused'
              sx={{ margin: "10px" }}
            />
            {me ? (
              <Tooltip title='logout'>
                <Button
                  onClick={() => {
                    removeCookie("auth");
                    apolloClient.clearStore();
                    navigate("/login");
                    refetchMe();
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

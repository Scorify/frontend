import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";

import { DarkMode, LightMode, Login, Logout, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { CookieSetOptions } from "universal-cookie";

import { JWT } from "../models";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  cookies: any;
  removeCookie: (name: "auth", options?: CookieSetOptions | undefined) => void;
  jwt: JWT;
};

export default function Navbar({
  theme,
  setTheme,
  setDrawerState,
  removeCookie,
  jwt,
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
            {jwt && (
              <Button
                onClick={() => {
                  document.location.href = "/";
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
            sx={{ width: "33%", display: "flex", justifyContent: "flex-end" }}
          >
            {jwt ? (
              <Tooltip title='logout'>
                <Button
                  onClick={() => {
                    removeCookie("auth");
                    document.location.href = "/";
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

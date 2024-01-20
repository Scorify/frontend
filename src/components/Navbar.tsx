import { Dispatch, SetStateAction } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Tooltip,
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
                <MenuIcon sx={{ color: "white" }} />
              </Button>
            </Tooltip>
          </Box>
          <Box sx={{ width: "34%", display: "flex", justifyContent: "center" }}>
            {jwt && <Typography variant='h6'>{jwt.username}</Typography>}
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
                  <LogoutIcon />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title='Login'>
                <Button
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  sx={{
                    color: "inherit",
                    minWidth: "0px",
                  }}
                >
                  <LoginIcon />
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
                  <LightModeIcon sx={{ color: "white" }} />
                ) : (
                  <DarkModeIcon sx={{ color: "white" }} />
                )}
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

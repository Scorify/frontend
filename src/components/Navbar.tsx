import { Dispatch, SetStateAction } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
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
            <Button
              onClick={() => {
                setDrawerState(true);
              }}
            >
              <MenuIcon sx={{ color: "white" }} />
            </Button>
          </Box>
          <Box sx={{ width: "34%", display: "flex", justifyContent: "center" }}>
            {jwt && <Typography variant='h6'>{jwt.username}</Typography>}
          </Box>
          <Box
            sx={{ width: "33%", display: "flex", justifyContent: "flex-end" }}
          >
            {jwt ? (
              <Button
                onClick={() => {
                  removeCookie("auth");
                  document.location.href = "/";
                }}
                sx={{
                  color: "inherit",
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  window.location.href = "/login";
                }}
                sx={{
                  color: "inherit",
                }}
              >
                Login
              </Button>
            )}
            <Button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              {theme === "dark" ? (
                <LightModeIcon sx={{ color: "white" }} />
              ) : (
                <DarkModeIcon sx={{ color: "white" }} />
              )}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

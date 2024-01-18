import { Dispatch, SetStateAction } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { CookieSetOptions } from "universal-cookie";
import { jwtDecode } from "jwt-decode";

import { JWT } from "../models";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  cookies: any;
  removeCookie: (name: "auth", options?: CookieSetOptions | undefined) => void;
};

export default function Navbar({
  theme,
  setTheme,
  setDrawerState,
  cookies,
  removeCookie,
}: props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Button
            onClick={() => {
              setDrawerState(true);
            }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          {cookies.auth && (
            <Typography variant='h6'>
              {(jwtDecode(cookies.auth) as JWT).Username}
            </Typography>
          )}
          <Box sx={{ flexGrow: 1 }}></Box>
          {cookies.auth ? (
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

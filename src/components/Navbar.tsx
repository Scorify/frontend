import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import MenuIcon from "@mui/icons-material/Menu";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ theme, setTheme, setDrawerState }: props) {
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

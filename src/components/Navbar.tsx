import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export default function Navbar({ theme, setTheme }: props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            {theme === "dark" ? (
              <DarkModeIcon sx={{ color: "white" }} />
            ) : (
              <LightModeIcon sx={{ color: "white" }} />
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

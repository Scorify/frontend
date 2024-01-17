import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react";

import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type props = {
  drawerState: boolean;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
};

export default function DrawerComponent({
  drawerState,
  setDrawerState,
}: props) {
  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerState(open);
    };

  return (
    <Drawer anchor={"left"} open={drawerState} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <ListItemButton>
              <ListItemIcon>{<HomeIcon />}</ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

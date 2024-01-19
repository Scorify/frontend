import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Divider,
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
  cookies: any;
};

export default function DrawerComponent({
  drawerState,
  setDrawerState,
  cookies,
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
        {cookies.auth && (
          <>
            <Divider />
            <List>
              <ListItem
                disablePadding
                onClick={() => {
                  window.location.href = "/admin";
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{<AdminPanelSettingsIcon />}</ListItemIcon>
                  <ListItemText primary='Admin' />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                onClick={() => {
                  window.location.href = "/checks";
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{<EditNoteIcon />}</ListItemIcon>
                  <ListItemText primary='Checks' />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                onClick={() => {
                  window.location.href = "/users";
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{<GroupIcon />}</ListItemIcon>
                  <ListItemText primary='Users' />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
}

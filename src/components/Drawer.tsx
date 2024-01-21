import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react";

import {
  AdminPanelSettings,
  EditNote,
  Group,
  Home,
  Password,
} from "@mui/icons-material";
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
import { JWT } from "../models";

type props = {
  drawerState: boolean;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  cookies: any;
  jwt: JWT;
};

export default function DrawerComponent({
  drawerState,
  setDrawerState,
  jwt,
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
              <ListItemIcon>{<Home />}</ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
        </List>
        {jwt && (
          <>
            <Divider />
            <List>
              <ListItem
                disablePadding
                onClick={() => {
                  window.location.href = "/password";
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{<Password />}</ListItemIcon>
                  <ListItemText primary='Change Password' />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            {jwt.role === "user" && (
              <List>
                <ListItem
                  disablePadding
                  onClick={() => {
                    window.location.href = "/checks";
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{<EditNote />}</ListItemIcon>
                    <ListItemText primary='Checks' />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
            {jwt.role === "admin" && (
              <List>
                <ListItem
                  disablePadding
                  onClick={() => {
                    window.location.href = "/admin";
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{<AdminPanelSettings />}</ListItemIcon>
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
                    <ListItemIcon>{<EditNote />}</ListItemIcon>
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
                    <ListItemIcon>{<Group />}</ListItemIcon>
                    <ListItemText primary='Users' />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </>
        )}
      </Box>
    </Drawer>
  );
}

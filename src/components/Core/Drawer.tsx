import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react";
import { useNavigate } from "react-router";

import {
  AdminPanelSettings,
  EditNote,
  Scoreboard,
  Group,
  Home,
  KeyboardReturn,
  Login,
  Logout,
  Password,
  Vaccines,
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

import { MeQuery } from "../../graph";
import { JWT } from "../../models";
import { RemoveCookie } from "../../models/cookies";

type props = {
  drawerState: boolean;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  me: MeQuery | undefined;
  jwt: JWT;
  removeCookie: RemoveCookie;
  returnToAdmin: () => void;
};

export default function DrawerComponent({
  drawerState,
  setDrawerState,
  jwt,
  me,
  removeCookie,
  returnToAdmin,
}: props) {
  const navigate = useNavigate();
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
              navigate("/");
            }}
          >
            <ListItemButton>
              <ListItemIcon>{<Home />}</ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              navigate("/scoreboard");
            }}
          >
            <ListItemButton>
              <ListItemIcon>{<Scoreboard />}</ListItemIcon>
              <ListItemText primary='Scoreboard' />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {me?.me ? (
          <>
            <List>
              {jwt?.become ? (
                <ListItem disablePadding onClick={returnToAdmin}>
                  <ListItemButton>
                    <ListItemIcon>{<KeyboardReturn />}</ListItemIcon>
                    <ListItemText primary='Return to Admin User' />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem
                  disablePadding
                  onClick={() => {
                    removeCookie("auth");
                    navigate("/");
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{<Logout />}</ListItemIcon>
                    <ListItemText primary='Logout' />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/password");
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{<Password />}</ListItemIcon>
                  <ListItemText primary='Change Password' />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            {me.me.role === "user" && (
              <List>
                <ListItem
                  disablePadding
                  onClick={() => {
                    navigate("/checks");
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{<EditNote />}</ListItemIcon>
                    <ListItemText primary='Checks' />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
            {me.me.role === "admin" && (
              <List>
                <ListItem
                  disablePadding
                  onClick={() => {
                    navigate("/admin");
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
                    navigate("/admin/injects");
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{<Vaccines />}</ListItemIcon>
                    <ListItemText primary='Injects' />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  onClick={() => {
                    navigate("/admin/checks");
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
                    navigate("/admin/users");
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
        ) : (
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/login");
              }}
            >
              <ListItemButton>
                <ListItemIcon>{<Login />}</ListItemIcon>
                <ListItemText primary='Login' />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Box>
    </Drawer>
  );
}

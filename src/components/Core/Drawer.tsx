import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react";
import { useNavigate } from "react-router";

import {
  AdminPanelSettings,
  EditNote,
  Group,
  Home,
  Login,
  Logout,
  Password,
  KeyboardReturn,
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
import { CookieSetOptions } from "universal-cookie";

import { JWT } from "../../models";

type props = {
  drawerState: boolean;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  jwt: JWT;
  cookies: {
    auth?: any;
    admin?: any;
  };
  setCookie: (
    name: "auth" | "admin",
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
  removeCookie: (
    name: "auth" | "admin",
    options?: CookieSetOptions | undefined
  ) => void;
};

export default function DrawerComponent({
  drawerState,
  setDrawerState,
  jwt,
  cookies,
  setCookie,
  removeCookie,
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
        </List>
        <Divider />
        {jwt ? (
          <>
            <List>
              {cookies.admin && (
                <ListItem
                  disablePadding
                  onClick={() => {
                    setCookie("auth", cookies.admin);
                    removeCookie("admin");
                    navigate("/");
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{<KeyboardReturn />}</ListItemIcon>
                    <ListItemText primary='Return to Admin User' />
                  </ListItemButton>
                </ListItem>
              )}
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
            {jwt.role === "user" && (
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
            {jwt.role === "admin" && (
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

import { useMemo, useState } from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grow,
  IconButton,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";

import { DeleteUserModal, PasswordInput } from "../..";
import {
  UsersQuery,
  useAdminLoginMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../../graph";
import { JWT } from "../../../models";

type props = {
  user: UsersQuery["users"][0];
  handleRefetch: () => void;
  visible: boolean;
  jwt: JWT;
  setCookie: (
    name: "auth" | "admin",
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
  cookies: {
    auth?: any;
    admin?: any;
  };
};

export default function EditCheck({
  jwt,
  user,
  visible,
  handleRefetch,
  setCookie,
  cookies,
}: props) {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const [name, setName] = useState<string>(user.username);
  const nameChanged = useMemo(
    () => name !== user.username,
    [name, user.username]
  );

  const [password, setPassword] = useState<string>("");
  const passwordChanged = useMemo(() => password !== "", [password]);

  const [number, setNumber] = useState<number | null | undefined>(user.number);
  const numberChanged = useMemo(() => number !== user.number, [number]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [updateUserMutation] = useUpdateUserMutation({
    onCompleted: () => {
      enqueueSnackbar("User updated successfully", { variant: "success" });
      handleRefetch();
      setPassword("");
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  const [deleteUserMutation] = useDeleteUserMutation({
    onCompleted: () => {
      enqueueSnackbar("User deleted successfully", { variant: "success" });
      handleRefetch();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  const [adminLoginMutation] = useAdminLoginMutation({
    onCompleted: (data) => {
      setCookie("auth", data.adminLogin.token, {
        path: data.adminLogin.path,
        expires: new Date(data.adminLogin.expires * 1000),
        httpOnly: data.adminLogin.httpOnly,
        secure: data.adminLogin.secure,
      });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  const [adminViewAsMutation] = useAdminLoginMutation({
    onCompleted: (data) => {
      setCookie("admin", cookies.auth, {
        path: data.adminLogin.path,
        expires: new Date(data.adminLogin.expires * 1000),
        httpOnly: data.adminLogin.httpOnly,
        secure: data.adminLogin.secure,
      });
      setCookie("auth", data.adminLogin.token, {
        path: data.adminLogin.path,
        expires: new Date(data.adminLogin.expires * 1000),
        httpOnly: data.adminLogin.httpOnly,
        secure: data.adminLogin.secure,
      });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    },
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSave = () => {
    updateUserMutation({
      variables: {
        id: user.id,
        username: nameChanged ? name : undefined,
        password: passwordChanged ? password : undefined,
        number: numberChanged ? number : undefined,
      },
    });
  };

  const handleDelete = () => {
    deleteUserMutation({
      variables: {
        id: user.id,
      },
    });
  };

  return (
    <>
      <DeleteUserModal
        user={user.username}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDelete}
      />
      <Grow in={true}>
        <Card
          sx={{
            width: "100%",
            marginBottom: "24px",
            display: visible ? "block" : "none",
          }}
          variant='elevation'
        >
          <CardHeader
            title={
              <Box display='flex' flexDirection='row' alignItems='baseline'>
                {expanded ? (
                  <TextField
                    label='Name'
                    value={name}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    sx={{ marginRight: "24px" }}
                    size='small'
                  />
                ) : (
                  <Typography variant='h6' component='div' marginRight='24px'>
                    {user.username}
                  </Typography>
                )}
                <Typography
                  variant='subtitle1'
                  color='textSecondary'
                  component='div'
                >
                  {user.role}
                </Typography>
              </Box>
            }
            action={
              <Box display='flex' flexDirection='row' gap='12px'>
                <IconButton>
                  <ExpandMore />
                </IconButton>
                {jwt?.username !== user.username && (
                  <>
                    <Slide
                      in={expanded}
                      timeout={300}
                      style={{
                        transformOrigin: "right",
                      }}
                      direction='left'
                      unmountOnExit
                      mountOnEnter
                    >
                      <Button
                        variant='contained'
                        onClick={() => {
                          adminLoginMutation({
                            variables: {
                              id: user.id,
                            },
                          });
                        }}
                        color='primary'
                      >
                        Become
                      </Button>
                    </Slide>
                    <Slide
                      in={expanded}
                      timeout={300}
                      style={{
                        transformOrigin: "right",
                      }}
                      direction='left'
                      unmountOnExit
                      mountOnEnter
                    >
                      <Button
                        variant='contained'
                        onClick={() => {
                          adminViewAsMutation({
                            variables: {
                              id: user.id,
                            },
                          });
                        }}
                        color='secondary'
                      >
                        View As
                      </Button>
                    </Slide>
                    <Slide
                      in={expanded}
                      timeout={300}
                      style={{
                        transformOrigin: "right",
                      }}
                      direction='left'
                      unmountOnExit
                      mountOnEnter
                    >
                      <Button
                        variant='contained'
                        onClick={() => {
                          setOpenDeleteModal(true);
                        }}
                        color='error'
                      >
                        Delete
                      </Button>
                    </Slide>
                  </>
                )}
                <Slide
                  in={nameChanged || passwordChanged || numberChanged}
                  timeout={300}
                  style={{
                    transformOrigin: "right",
                  }}
                  direction='left'
                  unmountOnExit
                  mountOnEnter
                >
                  <Button
                    variant='contained'
                    onClick={(e) => {
                      if (!expanded) {
                        e.stopPropagation();
                      }

                      handleSave();
                    }}
                  >
                    Save
                  </Button>
                </Slide>
              </Box>
            }
            onClick={handleExpandClick}
          />
          {expanded && <Divider sx={{ margin: "0px 20%" }} />}

          <Collapse in={expanded} timeout={300}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <PasswordInput
                  label='Password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {user.role === "user" && (
                  <TextField
                    label='Number'
                    value={number}
                    onChange={(e) => {
                      setNumber(parseInt(e.target.value));
                    }}
                    sx={{ marginRight: "24px" }}
                    type='number'
                  />
                )}
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      </Grow>
    </>
  );
}

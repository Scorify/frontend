import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { CookieSetOptions } from "universal-cookie";
import { useNavigate } from "react-router-dom";

import { PasswordInput } from "../components";
import { useLoginMutation } from "../graph";

type props = {
  setCookie: (
    name: "auth",
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
};

export default function Login({ setCookie }: props) {
  const [loginMutation, { data, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form_data = new FormData(event.currentTarget);

    let username = form_data.get("username")?.toString();
    let password = form_data.get("password")?.toString();

    if (username && password) {
      loginMutation({
        variables: {
          username: username,
          password: password,
        },
      })
        .then(() => {
          if (data && data.login) {
            console.log(data.login);
            setCookie("auth", data.login.token, {
              path: data.login.path,
              expires: new Date(data.login.expires * 1000),
              httpOnly: data.login.httpOnly,
              secure: data.login.secure,
            });

            navigate("/");

            enqueueSnackbar("Logged in successfully", { variant: "success" });
          } else {
            if (error && error.message) {
              enqueueSnackbar(error.message, { variant: "error" });
              console.log(error);
            }
          }
        })
        .catch((error) => {
          enqueueSnackbar("An error occurred while preforming request", {
            variant: "error",
          });

          console.log(error);
        });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h3'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoFocus
          />
          <PasswordInput
            margin='normal'
            required
            name='password'
            label='Password'
            id='password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

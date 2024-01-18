import { useMutation } from "@apollo/client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { CookieSetOptions } from "universal-cookie";

import { PasswordInput } from "../components";
import { LOGIN } from "../queries";

type props = {
  setCookie: (
    name: "auth",
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
};

export default function Login({ setCookie }: props) {
  const [loginMutation, {}] = useMutation(LOGIN);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginMutation({
      variables: {
        username: data.get("username"),
        password: data.get("password"),
      },
    })
      .then((response) => {
        if (response.data.login) {
          enqueueSnackbar("Logged in successfully", { variant: "success" });

          setCookie("auth", response.data.login.token, {
            path: response.data.login.path,
            domain: response.data.login.domain,
            expires: new Date(response.data.login.expires * 1000),
            secure: response.data.login.secure,
            httpOnly: response.data.login.httpOnly,
          });

          document.location.href = "/";
        }
      })
      .catch((error) => {
        enqueueSnackbar("Invalid username or password", { variant: "error" });
        console.log(error);
      });
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

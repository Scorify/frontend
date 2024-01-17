import { Box, Button, Container, TextField, Typography } from "@mui/material";

import { PasswordInput } from "../components";

export default function Login() {
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
        <Box
          component='form'
          onSubmit={() => {
            alert("TODO: Implement login");
          }}
        >
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

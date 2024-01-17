import {
  Container,
  Box,
  Typography,
  TextField,
  Tooltip,
  Link,
  Button,
} from "@mui/material";
import PasswordInput from "../components/PasswordInput";

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
            alert("bruh");
          }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Team'
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
          <Tooltip title='Reach out to Black Team' arrow>
            <Link
              sx={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Typography variant='body2' color='text.secondary'>
                Forgot password?
              </Typography> */}
            </Link>
          </Tooltip>
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

import { Typography, Container, Box } from "@mui/material";

export default function NotFound() {
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h3'>
          Page Not Found
        </Typography>
        <Typography component='h1' variant='h1'>
          404
        </Typography>
      </Box>
    </Container>
  );
}

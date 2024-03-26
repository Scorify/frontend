import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  TableHead,
  TableRow,
} from "@mui/material";
import { red, green } from "@mui/material/colors";

const scoreboard = {
  teams: [
    {
      number: 1,
      name: "Team 1",
    },
    {
      number: 2,
      name: "Team 2",
    },
    {
      number: 3,
      name: "Team 3",
    },
    {
      number: 4,
      name: "Team 4",
    },
    {
      number: 5,
      name: "Team 5",
    },
    {
      number: 6,
      name: "Team 6",
    },
    {
      number: 7,
      name: "Team 7",
    },
    {
      number: 8,
      name: "Team 8",
    },
    {
      number: 9,
      name: "Team 9",
    },
    {
      number: 10,
      name: "Team 10",
    },
  ],
  checks: [
    {
      number: 1,
      name: "Check 1",
    },
    {
      number: 2,
      name: "Check 2",
    },
    {
      number: 3,
      name: "Check 3",
    },
    {
      number: 4,
      name: "Check 4",
    },
    {
      number: 5,
      name: "Check 5",
    },
    {
      number: 6,
      name: "Check 6",
    },
    {
      number: 7,
      name: "Check 7",
    },
    {
      number: 8,
      name: "Check 8",
    },
    {
      number: 9,
      name: "Check 9",
    },
    {
      number: 10,
      name: "Check 10",
    },
  ],
  statuses: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
};

export default function Scoreboard() {
  return (
    <Container component='main' maxWidth='xl'>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component='h1'
          variant='h3'
          fontWeight={700}
          sx={{
            marginTop: 5,
          }}
        >
          Scoreboard
        </Typography>
        <Box m={2} />
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell size='small' />
                {scoreboard.checks.map((check) => (
                  <TableCell key={check.number} size='small'>
                    <Typography>{check.name}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreboard.teams.map((team, rowIndex) => (
                <TableRow key={team.number}>
                  <TableCell size='small'>
                    <Typography>{team.name}</Typography>
                  </TableCell>
                  {scoreboard.checks.map((check, colIndex) => (
                    <TableCell
                      key={`${team}-${check}`}
                      sx={{
                        aspectRatio: 1,
                        backgroundColor: scoreboard.statuses[rowIndex][colIndex]
                          ? green[500]
                          : red[500],
                      }}
                      size='small'
                    />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

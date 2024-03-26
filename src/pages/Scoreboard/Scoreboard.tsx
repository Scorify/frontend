import { useState } from "react";

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
import { red, green, grey } from "@mui/material/colors";

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

type props = {
  theme: string;
};

export default function Scoreboard({ theme }: props) {
  const [highlightedTeam, setHighlightedTeam] = useState<number | null>(null);
  const [highlightedCheck, setHighlightedCheck] = useState<number | null>(null);

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
        <TableContainer
          component={Paper}
          onMouseLeave={() => {
            setHighlightedTeam(null);
            setHighlightedCheck(null);
          }}
        >
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  onMouseEnter={() => {
                    setHighlightedTeam(0);
                    setHighlightedCheck(0);
                  }}
                  sx={{
                    backgroundColor:
                      highlightedTeam == 0 || highlightedCheck == 0
                        ? theme === "dark"
                          ? grey[800]
                          : grey[400]
                        : "transparent",
                  }}
                />
                {scoreboard.checks.map((check) => (
                  <TableCell
                    key={check.number}
                    onMouseEnter={() => {
                      setHighlightedCheck(check.number);
                      setHighlightedTeam(null);
                    }}
                    sx={{
                      backgroundColor:
                        highlightedTeam == 0 || highlightedCheck == check.number
                          ? theme === "dark"
                            ? grey[800]
                            : grey[400]
                          : "transparent",
                    }}
                  >
                    <Typography>{check.name}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreboard.teams.map((team, rowIndex) => (
                <TableRow key={team.number}>
                  <TableCell
                    onMouseEnter={() => {
                      setHighlightedTeam(team.number);
                      setHighlightedCheck(null);
                    }}
                    sx={{
                      backgroundColor:
                        highlightedTeam == team.number || highlightedCheck == 0
                          ? theme === "dark"
                            ? grey[800]
                            : grey[400]
                          : "transparent",
                    }}
                  >
                    <Typography>{team.name}</Typography>
                  </TableCell>
                  {scoreboard.checks.map((check, colIndex) => (
                    <TableCell
                      key={`${team}-${check}`}
                      sx={{
                        aspectRatio: 1,
                        backgroundColor: scoreboard.statuses[rowIndex][colIndex]
                          ? highlightedTeam == rowIndex + 1 ||
                            highlightedCheck == colIndex + 1
                            ? green[300]
                            : green[500]
                          : highlightedTeam == rowIndex + 1 ||
                            highlightedCheck == colIndex + 1
                          ? red[300]
                          : red[500],
                      }}
                      onMouseEnter={() => {
                        setHighlightedTeam(team.number);
                        setHighlightedCheck(check.number);
                      }}
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

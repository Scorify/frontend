import { Box, Container, Typography } from "@mui/material";

import { Scoreboard } from "../../components";
import { NormalScoreboardTheme } from "../../constants";

const scoreboardData = {
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
  theme: "dark" | "light";
};

export default function ScoreboardPage({ theme }: props) {
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
        <Scoreboard
          theme={theme}
          scoreboardData={scoreboardData}
          scoreboardTheme={NormalScoreboardTheme}
        />
      </Box>
    </Container>
  );
}

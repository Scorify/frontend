import { Box, CircularProgress, Container, Typography } from "@mui/material";

import { useEffect, useMemo } from "react";
import { useScoreboardQuery } from "../../graph";

import { Scoreboard } from "../../components";
import { NormalScoreboardTheme } from "../../constants";

type props = {
  theme: "dark" | "light";
};

export default function ScoreboardPage({ theme }: props) {
  const { data, error, loading, refetch } = useScoreboardQuery();

  useEffect(() => {
    refetch();
    refetch();
  }, []);

  const scoreboardData = useMemo(() => {
    return {
      top: data?.scoreboard.teams.map((team) => team.number) ?? [],
      left: data?.scoreboard.checks.map((check) => check.name) ?? [],
      values: data?.scoreboard.statuses ?? [[]],
    };
  }, [data]);

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography component='h1' variant='h5'>
            Round {data?.scoreboard.round.number}
          </Typography>
        </Box>
        <Box m={2} />
        {error && <Typography variant='h6'>Error: {error.message}</Typography>}
        {loading && !data && <CircularProgress />}
        {data && (
          <Scoreboard
            theme={theme}
            scoreboardData={scoreboardData}
            scoreboardTheme={NormalScoreboardTheme}
            cornerLabel='Team'
          />
        )}
      </Box>
    </Container>
  );
}

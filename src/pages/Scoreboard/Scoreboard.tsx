import { useEffect, useMemo, useState } from "react";

import { Box, CircularProgress, Container, Typography } from "@mui/material";

import { Scoreboard } from "../../components";
import { NormalScoreboardTheme } from "../../constants";
import {
  useScoreboardQuery,
  useScoreboardUpdateSubscription,
} from "../../graph";

type props = {
  theme: "dark" | "light";
};

export default function ScoreboardPage({ theme }: props) {
  const { data: rawData, error, loading, refetch } = useScoreboardQuery();
  const [data, setData] = useState(rawData);

  useEffect(() => {
    refetch();
    refetch();
  }, []);

  useEffect(() => {
    setData(rawData);
    console.log({ rawData });
  }, [rawData]);

  // const checkLookup = useMemo(() => {
  //   const lookup = new Map<number, string>();

  //   data?.scoreboard.checks.forEach((check) => {
  //     lookup.set(
  //       rawData?.scoreboard.checks.indexOf((c: any) => c.name === check.name) ||
  //         0,
  //       check.name
  //     );
  //   });

  //   return lookup;
  // }, [data]);

  useScoreboardUpdateSubscription({
    onData: (data) => {
      if (data.data.data?.scoreboardUpdate) {
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

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

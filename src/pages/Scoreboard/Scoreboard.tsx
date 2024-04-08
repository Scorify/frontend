import { useEffect, useState } from "react";

import { Box, CircularProgress, Container, Typography } from "@mui/material";

import { NormalScoreboardTheme } from "../../constants";
import {
  ScoreboardQuery,
  useScoreboardQuery,
  useScoreboardUpdateSubscription,
} from "../../graph";
import { ScoreboardWrapper } from "../../components";

type props = {
  theme: "dark" | "light";
};

export default function ScoreboardPage({ theme }: props) {
  const { data: rawData, error, loading, refetch } = useScoreboardQuery();
  const [data, setData] = useState<ScoreboardQuery["scoreboard"] | undefined>(
    rawData?.scoreboard
  );

  useEffect(() => {
    refetch();
    refetch();
  }, []);

  useEffect(() => {
    setData(rawData?.scoreboard);
  }, [rawData]);

  useScoreboardUpdateSubscription({
    onData: (data) => {
      if (data.data.data?.scoreboardUpdate) {
        setData(data.data.data.scoreboardUpdate);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

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
            Round {data?.round.number}
          </Typography>
        </Box>
        <Box m={2} />
        {error && <Typography variant='h6'>Error: {error.message}</Typography>}
        {loading && !data && <CircularProgress />}
        {data && (
          <ScoreboardWrapper
            theme={theme}
            data={data}
            scoreboardTheme={NormalScoreboardTheme}
            cornerLabel='Team'
          />
        )}
      </Box>
    </Container>
  );
}

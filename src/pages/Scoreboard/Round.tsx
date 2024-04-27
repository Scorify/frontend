import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

import { ScoreboardWrapper } from "../../components";
import { NormalScoreboardTheme } from "../../constants";
import { useLatestRoundQuery, useScoreboardQuery } from "../../graph";

type params = {
  round: string;
};

type props = {
  theme: "dark" | "light";
};

export default function ScoreboardRoundPage({ theme }: props) {
  const { round } = useParams<params>();
  const navigate = useNavigate();

  const { data, error, loading, refetch } = useScoreboardQuery({
    variables: { round: round ? parseInt(round) : undefined },
  });

  useEffect(() => {
    refetch();
    refetch();
  }, []);

  const {
    data: latestRoundData,
    error: latestRoundError,
    loading: latestRoundLoading,
    refetch: latestRoundRefetch,
  } = useLatestRoundQuery({
    onError: (error) => {
      console.error(error);
    },
    onCompleted: (data) => {
      if (
        data?.latestRound.number &&
        round !== undefined &&
        parseInt(round) === data.latestRound.number
      ) {
        console.log({
          latestRoundData: latestRoundData?.latestRound.number,
          round,
        });
        navigate("/scoreboard");
      }
    },
  });

  useEffect(() => {
    if (
      latestRoundData?.latestRound.number &&
      round !== undefined &&
      parseInt(round) === latestRoundData.latestRound.number
    ) {
      latestRoundRefetch();
    }
  }, [latestRoundData, round]);

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
          {data?.scoreboard.round.number &&
          data.scoreboard.round.number > 10 ? (
            <KeyboardDoubleArrowLeft
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/scoreboard/${data?.scoreboard.round.number - 10}`);
              }}
            />
          ) : (
            <KeyboardDoubleArrowLeft sx={{ visibility: "hidden" }} />
          )}
          {data?.scoreboard.round.number && data.scoreboard.round.number > 1 ? (
            <KeyboardArrowLeft
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/scoreboard/${data.scoreboard.round.number - 1}`);
              }}
            />
          ) : (
            <KeyboardArrowLeft sx={{ visibility: "hidden" }} />
          )}
          <Box marginLeft={0.5} marginRight={0.5}>
            <Typography
              component='h1'
              variant='h5'
              onClick={() => {
                navigate("/scoreboard");
              }}
              sx={{ cursor: "pointer" }}
            >
              Round {data?.scoreboard.round.number}
            </Typography>
          </Box>
          {latestRoundData?.latestRound.number &&
          data?.scoreboard.round.number &&
          latestRoundData.latestRound.number >=
            data?.scoreboard.round.number + 1 ? (
            <KeyboardArrowRight
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/scoreboard/${data?.scoreboard.round.number + 1}`);
              }}
            />
          ) : (
            <KeyboardArrowRight sx={{ visibility: "hidden" }} />
          )}
          {latestRoundData?.latestRound.number &&
          data?.scoreboard.round.number &&
          latestRoundData.latestRound.number >=
            data?.scoreboard.round.number + 10 ? (
            <KeyboardDoubleArrowRight
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/scoreboard/${data?.scoreboard.round.number + 10}`);
              }}
            />
          ) : (
            <KeyboardDoubleArrowRight sx={{ visibility: "hidden" }} />
          )}
        </Box>
        <Box m={2} />
        {error && <Typography variant='h6'>Error: {error.message}</Typography>}
        {latestRoundError && (
          <Typography variant='h6'>
            Error: {latestRoundError.message}
          </Typography>
        )}
        {loading && latestRoundLoading && !data && !latestRoundData && (
          <CircularProgress />
        )}
        {data && (
          <ScoreboardWrapper
            theme={theme}
            data={data.scoreboard}
            scoreboardTheme={NormalScoreboardTheme}
            cornerLabel='Team'
          />
        )}
      </Box>
    </Container>
  );
}

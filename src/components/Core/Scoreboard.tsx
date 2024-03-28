import { useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ScoreboardData, ScoreboardTheme } from "../../models";

type props = {
  theme: "dark" | "light";
  scoreboardData: ScoreboardData;
  scoreboardTheme: ScoreboardTheme;
};

export default function Scoreboard({
  theme,
  scoreboardData,
  scoreboardTheme,
}: props) {
  const [highlightedTeam, setHighlightedTeam] = useState<number | null>(null);
  const [highlightedCheck, setHighlightedCheck] = useState<number | null>(null);

  return (
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
                  scoreboardTheme.heading[theme][
                    highlightedTeam == 0 || highlightedCheck == 0
                      ? "highlighted"
                      : "plain"
                  ],
              }}
            />
            {scoreboardData.checks.map((check) => (
              <TableCell
                key={check.number}
                onMouseEnter={() => {
                  setHighlightedCheck(check.number);
                  setHighlightedTeam(null);
                }}
                sx={{
                  backgroundColor:
                    scoreboardTheme.heading[theme][
                      highlightedCheck == check.number || highlightedTeam == 0
                        ? "highlighted"
                        : "plain"
                    ],
                }}
              >
                <Typography>{check.name}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreboardData.teams.map((team, rowIndex) => (
            <TableRow key={team.number}>
              <TableCell
                onMouseEnter={() => {
                  setHighlightedTeam(team.number);
                  setHighlightedCheck(null);
                }}
                sx={{
                  backgroundColor:
                    scoreboardTheme.heading[theme][
                      highlightedTeam == team.number || highlightedCheck == 0
                        ? "highlighted"
                        : "plain"
                    ],
                }}
              >
                <Typography>{team.name}</Typography>
              </TableCell>
              {scoreboardData.checks.map((check, colIndex) => (
                <TableCell
                  key={`${team}-${check}`}
                  sx={{
                    aspectRatio: 1,
                    backgroundColor:
                      scoreboardTheme.cell[theme][
                        highlightedTeam == team.number ||
                        highlightedCheck == check.number
                          ? "highlighted"
                          : "plain"
                      ][scoreboardData.statuses[rowIndex][colIndex] ? 1 : 0],
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
  );
}

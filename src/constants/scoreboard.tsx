import { green, grey, red } from "@mui/material/colors";

export const NormalScoreboardTheme = {
  heading: {
    dark: {
      highlighted: grey[800],
      plain: grey[900],
    },
    light: {
      highlighted: grey[300],
      plain: grey[50],
    },
  },
  cell: {
    dark: {
      highlighted: {
        1: green[400],
        0: red[400],
      },
      plain: {
        1: green[600],
        0: red[600],
      },
    },
    light: {
      highlighted: {
        1: green[600],
        0: red[600],
      },
      plain: {
        1: green[400],
        0: red[400],
      },
    },
  },
};

import { Property } from "csstype";

export type ScoreboardData = {
  teams: {
    number: number;
    name: string;
  }[];
  checks: {
    number: number;
    name: string;
  }[];
  statuses: number[][];
};

export type ScoreboardTheme = {
  heading: {
    dark: {
      highlighted: Property.BackgroundColor;
      plain: Property.BackgroundColor;
    };
    light: {
      highlighted: Property.BackgroundColor;
      plain: Property.BackgroundColor;
    };
  };
  cell: {
    dark: {
      highlighted: {
        1: Property.BackgroundColor;
        0: Property.BackgroundColor;
      };
      plain: {
        1: Property.BackgroundColor;
        0: Property.BackgroundColor;
      };
    };
    light: {
      highlighted: {
        1: Property.BackgroundColor;
        0: Property.BackgroundColor;
      };
      plain: {
        1: Property.BackgroundColor;
        0: Property.BackgroundColor;
      };
    };
  };
};

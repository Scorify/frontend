import { Role } from "../graph";

export type JWT =
  | {
      username: string;
      role: Role.Admin | Role.User;
      id: string;
      exp: number;
    }
  | undefined;

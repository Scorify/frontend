export type JWT =
  | {
      username: string;
      role: "admin" | "user";
      exp: number;
    }
  | undefined;

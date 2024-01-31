import { useMemo } from "react";

import { jwtDecode } from "jwt-decode";
import { JWT } from "../models";

export function useJWT(cookie: string): JWT | undefined {
  return useMemo(() => {
    return cookie ? (jwtDecode(cookie) as JWT) : undefined;
  }, [cookie]);
}

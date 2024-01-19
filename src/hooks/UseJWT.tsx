import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { JWT } from "../models";

export function useJWT(cookie: string): JWT {
  const [parsedCookie, setParsedCookie] = useState(
    (cookie ? jwtDecode(cookie) : undefined) as JWT
  );

  useEffect(() => {
    if (cookie) {
      setParsedCookie(jwtDecode(cookie) as JWT);
    } else {
      setParsedCookie(undefined);
    }
  }, [cookie]);

  return parsedCookie;
}

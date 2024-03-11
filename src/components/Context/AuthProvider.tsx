import { createContext } from "react";

import { MeQuery } from "../../graph";
import {
  Cookies,
  JWT,
  RemoveCookie,
  SetCookie,
  UpdateCookie,
} from "../../models";

interface AuthContextType {
  jwt: JWT;
  cookies: Cookies;
  setCookie: SetCookie;
  removeCookie: RemoveCookie;
  updateCookie: UpdateCookie;
  me: MeQuery | undefined;
}

export const AuthContext = createContext<AuthContextType>({
  jwt: undefined,
  cookies: {},
  setCookie: () => {},
  removeCookie: () => {},
  updateCookie: () => {},
  me: undefined,
});

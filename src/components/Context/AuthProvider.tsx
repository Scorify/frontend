import { MeQuery } from "../../graph";
import { Cookies, JWT, RemoveCookie, SetCookie } from "../../models";

export interface AuthContextType {
  jwt: JWT;
  cookies: Cookies;
  setCookie: SetCookie;
  removeCookie: RemoveCookie;
  me: MeQuery | undefined;
}

import { useEffect, useMemo } from "react";

import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import { MeQuery, useMeQuery } from "../graph";
import { Cookies, JWT, RemoveCookie, SetCookie, UpdateCookie } from "../models";

export function useAuth(apolloClient: ApolloClient<NormalizedCacheObject>): {
  jwt: JWT | undefined;
  me: MeQuery | undefined;
  refetchMe: () => void;
  cookies: Cookies;
  setCookie: SetCookie;
  removeCookie: RemoveCookie;
  updateCookie: UpdateCookie;
} {
  const [cookies, setCookie, removeCookie, updateCookie] = useCookies(["auth"]);

  const { data: me, refetch: refetchMe } = useMeQuery({
    onError: (error) => console.error(error),
  });

  useEffect(() => {
    apolloClient.clearStore().then(() => {
      refetchMe();
    });
  }, [cookies.auth]);

  const jwt = useMemo(
    () => (cookies?.auth ? (jwtDecode(cookies?.auth) as JWT) : undefined),
    [cookies?.auth]
  );

  return {
    jwt,
    me,
    refetchMe,
    cookies,
    setCookie,
    removeCookie,
    updateCookie,
  };
}

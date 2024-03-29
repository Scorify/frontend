import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { Error } from "..";
import { Role } from "../../graph";
import { AuthContext } from "../Context";

export default function User() {
  const { me } = useContext(AuthContext);

  if (!me) {
    return <Error code={401} message='Unauthorized' />;
  }

  if (me.me.role !== Role.User) {
    return <Error code={400} message='Competitor Page' />;
  }

  return <Outlet />;
}

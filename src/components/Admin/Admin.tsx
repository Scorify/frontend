import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { Error } from "..";
import { Role } from "../../graph";
import { AuthContext } from "../Context";

export default function Admin() {
  const { me } = useContext(AuthContext);

  if (!me) {
    return <Error code={401} message='Unauthorized' />;
  }

  if (me.me?.role !== Role.Admin) {
    return <Error code={403} message='Forbidden' />;
  }

  return <Outlet />;
}

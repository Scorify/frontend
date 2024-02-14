import { Outlet } from "react-router-dom";

import { Error } from "..";
import { Role } from "../../graph";
import { JWT } from "../../models";

type props = {
  jwt: JWT;
};

export default function Admin({ jwt }: props) {
  if (!jwt) {
    return <Error code={401} message='Unauthorized' />;
  }

  if (jwt.role !== Role.Admin) {
    return <Error code={403} message='Forbidden' />;
  }

  return <Outlet />;
}

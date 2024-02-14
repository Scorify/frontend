import { Outlet } from "react-router-dom";

import { Error } from "..";
import { Role } from "../../graph";
import { JWT } from "../../models";

type props = {
  jwt: JWT;
};

export default function User({ jwt }: props) {
  if (!jwt) {
    return <Error code={401} message='Unauthorized' />;
  }

  if (jwt.role !== Role.User) {
    return <Error code={400} message='Competitor Page' />;
  }

  return <Outlet />;
}

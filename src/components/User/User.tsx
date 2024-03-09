import { Outlet } from "react-router-dom";

import { Error } from "..";
import { Role, MeQuery } from "../../graph";

type props = {
  me: MeQuery | undefined;
};

export default function User({ me }: props) {
  if (!me) {
    return <Error code={401} message='Unauthorized' />;
  }

  if (me.me.role !== Role.User) {
    return <Error code={400} message='Competitor Page' />;
  }

  return <Outlet />;
}

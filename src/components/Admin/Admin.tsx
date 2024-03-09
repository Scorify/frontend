import { Outlet } from "react-router-dom";

import { Error } from "..";
import { Role, MeQuery } from "../../graph";

type props = {
  me: MeQuery | undefined;
};

export default function Admin({ me }: props) {
  if (!me) {
    return <Error code={401} message='Unauthorized' />;
  }

  if (me.me.role !== Role.Admin) {
    return <Error code={403} message='Forbidden' />;
  }

  return <Outlet />;
}

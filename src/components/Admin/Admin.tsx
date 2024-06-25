import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Error, Loading } from "..";
import { Role } from "../../graph";
import { AuthContext } from "../Context";

export default function Admin() {
  const { me, meLoading, meError } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (meError) {
      navigate("/login");
    }
  }, [meError, navigate]);

  if (meLoading) {
    return <Loading />;
  }

  if (me && me.me?.role !== Role.Admin) {
    return <Error code={403} message='Forbidden' />;
  }

  return <Outlet />;
}

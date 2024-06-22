import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Error, Loading } from "..";
import { Role } from "../../graph";
import { AuthContext } from "../Context";

export default function User() {
  const { me, meLoading, meError } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (meError) {
      navigate("/login");
    }
  }, [meError, navigate]);

  if (!me || meLoading) {
    return <Loading />;
  }

  if (me.me?.role !== Role.User) {
    return <Error code={400} message='Competitor Page' />;
  }

  return <Outlet />;
}

import { Dispatch, SetStateAction } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export default function Main({ theme, setTheme }: props) {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <Outlet />
    </>
  );
}

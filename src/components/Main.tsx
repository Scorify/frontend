import { Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Drawer from "./Drawer";

type props = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export default function Main({ theme, setTheme }: props) {
  const [drawerState, setDrawerState] = useState(false);

  return (
    <>
      <Drawer drawerState={drawerState} setDrawerState={setDrawerState} />
      <Navbar
        theme={theme}
        setTheme={setTheme}
        setDrawerState={setDrawerState}
      />
      <Outlet />
    </>
  );
}

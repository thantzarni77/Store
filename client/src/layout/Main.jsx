import React from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import Login from "./Login";

const Main = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Main;

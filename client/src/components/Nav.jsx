import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div
      id="nav"
      className="bg-red-100 h-10 w-full flex items-center justify-between px-6 "
    >
      <Link to={"/items"} className="text-2xl">
        Store
      </Link>
      <div className="flex items-center gap-5">
        <Link
          to={"/items"}
          className="text-gray-600 font-semibold cursor-pointer"
        >
          Items
        </Link>
        <Link
          to={"/customers"}
          className="text-gray-600 font-semibold cursor-pointer"
        >
          Customers
        </Link>
      </div>
    </div>
  );
};

export default Nav;

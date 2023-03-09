import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMarker(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className="bg-white border-b shadow-sm static top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div
          className=" cursor-pointer text-2xl font-bold  text-violet-500"
          onClick={() => navigate("/")}
        >
          Real<span className="text-red-400">State</span>
        </div>
        <div>
          <ul className="flex space-x-10 text-gray-400">
            <li
              className={` cursor-pointer py-3 text-sm font-semibold  ${
                pathMarker("/") && "border-b-[3px] text-black border-b-red-500"
              } `}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                pathMarker("/offers") &&
                "border-b-[3px] text-black border-b-red-500"
              } `}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                pathMarker("/sign-in") &&
                "border-b-[3px] text-black border-b-red-500"
              } `}
              onClick={() => navigate("/sign-in")}
            >
              SignIn
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

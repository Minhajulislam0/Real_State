import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <button className="flex justify-center items-center w-full bg-red-600 hover:bg-red-800 text-white py-3 rounded font-semibold uppercase transition duration-150 ease-in-out shadow-md active:bg-red-800 ">
      <FcGoogle className="text-2xl bg-white rounded-full mr-1" />
      Continue With Google
    </button>
  );
}

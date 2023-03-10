import React, { useState } from "react";
import Home from "../Assets/Images/home.jpg";
import { Link } from "react-router-dom";
import OAuth from "../Components/OAuth";

export default function ForgotPassword() {
  // form data hook
  const [resetEmail, setResetEmail] = useState("");

  // change effect

  const onChange = (e) => {
    setResetEmail(e.target.value);
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-5 font-bold ">Forgot Password</h1>
      <div className=" flex justify-around items-center flex-wrap max-w-6xl mx-auto py-9 px-6">
        <div className=" md:w-[70%] lg:w-[50%] mb-12 md:mb-6">
          {" "}
          <img src={Home} alt="home" className="w-full rounded-2xl" />{" "}
        </div>
        <div className=" w-full md:w-[70%] lg:w-[40%]">
          <form>
            <input
              className="w-full rounded bg-white border-gray-400 text-lg transition ease-in-out mb-6"
              placeholder="Enter Your Email Address"
              type="email"
              id="email"
              value={resetEmail}
              onChange={onChange}
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg xs:text-lg ">
              <p className="mb-6">
                Don't have an account?{" "}
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out font-semibold"
                  to="/sign-up"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out font-semibold"
                  to="/sign-in"
                >
                  Sign in Instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded font-semibold uppercase transition duration-150 ease-in-out shadow-md active:bg-blue-800 "
              type="submit"
            >
              Send Reset Email
            </button>
            <div className="my-4 flex items-center before:border-t before:flex-1 before:border-gray-400 after:border-t after:flex-1 after:border-gray-400">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}

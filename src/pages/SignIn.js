import React, { useState } from "react";
import Home from "../Assets/Images/home.jpg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { async } from "@firebase/util";

export default function SignIn() {
  const navigate = useNavigate();

  // show password Hook

  const [showPassword, setShowPassword] = useState(false);

  // form data hook
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // destructure email and pass from form data
  const { email, password } = formData;

  // change effect

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential.user) {
      toast.success("SuccessFully Logged In");
      navigate("/");
    }
    try {
    } catch (error) {
      toast.error("Invalid Information!");
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-5 font-bold ">Sign In</h1>
      <div className=" flex justify-around items-center flex-wrap max-w-6xl mx-auto py-9 px-6">
        <div className=" md:w-[70%] lg:w-[50%] mb-12 md:mb-6">
          {" "}
          <img src={Home} alt="home" className="w-full rounded-2xl" />{" "}
        </div>
        <div className=" w-full md:w-[70%] lg:w-[40%]">
          <form onSubmit={onSubmit}>
            <input
              className="w-full rounded bg-white border-gray-400 text-lg transition ease-in-out mb-6"
              placeholder="Enter Your Email Address"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className=" relative mb-6">
              <input
                className="w-full rounded bg-white border-gray-400 text-lg transition ease-in-out"
                placeholder="Enter Your Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className=" absolute right-3 top-3 text-2xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className=" absolute right-3 top-3 text-2xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
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
                  to="/forgot-password"
                >
                  Forgot Password
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded font-semibold uppercase transition duration-150 ease-in-out shadow-md active:bg-blue-800 "
              type="submit"
            >
              Sign in
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

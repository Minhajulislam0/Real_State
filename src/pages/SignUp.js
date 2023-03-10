import React, { useState } from "react";
import Home from "../Assets/Images/home.jpg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../Components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../FireBase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  // show password Hook

  const [showPassword, setShowPassword] = useState(false);

  // Navigate
  const navigate = useNavigate();

  // form data hook
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // destructure email and pass from form data
  const { name, email, password } = formData;

  // change effect

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // signUp Auth
  async function onSubmit(e) {
    e.preventDefault();

    // try catch for firebase data
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      // form data copy and time
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      // save copy data in database
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      // success message
      toast.success("SuccessFully Signed Up");
      // Adding data to db navigate to home
      navigate("/");
    } catch (error) {
      // adding to tostify to show message
      toast.error("Something Went Wrong");
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-5 font-bold ">Sign Up</h1>
      <div className=" flex justify-around items-center flex-wrap max-w-6xl mx-auto py-9 px-6">
        <div className=" md:w-[70%] lg:w-[50%] mb-12 md:mb-6">
          {" "}
          <img src={Home} alt="home" className="w-full rounded-2xl" />{" "}
        </div>
        <div className=" w-full md:w-[70%] lg:w-[40%]">
          <form onSubmit={onSubmit}>
            <input
              className="w-full rounded bg-white border-gray-400 text-lg transition ease-in-out mb-6"
              placeholder="Enter Your Full Name"
              type="text"
              id="name"
              value={name}
              onChange={onChange}
            />
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
                Have an account?{" "}
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out font-semibold"
                  to="/sign-in"
                >
                  Sign In
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
              Sign Up
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

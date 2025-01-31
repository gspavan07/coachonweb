import React, { useState, useEffect } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../logo.svg";
import { RotatingLines } from "react-loader-spinner";
import { useUser } from "../contexts/UserContext";
import CreateUserWindow from "../components/CreateUserWindow";
const Signup = () => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState();
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [createUser, setCreateUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    user && navigate("/");
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorText("");
    setLoading(true);
    // Perform form validation
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.mobile
    ) {
      setErrorText("All fields are required.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      console.log(result);
      if (res.status === 200) {
        // Redirect to the home page
        setUserDetails(result.user);
        setCreateUser(true);
        setLoading(false);
      } else {
        setErrorText(result.error);
        setLoading(false);
      }
    } catch (error) {
      setErrorText("An error occurred while signing up");
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      {createUser && (
        <>
          <div className="w-full h-screen flex absolute bg-gray-800 bg-opacity-40"></div>
          <CreateUserWindow user={userDetails} />
        </>
      )}

      <div className="flex min-h-full flex-1 flex-col my-20 justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="CoachOn" src={logo} className="mx-auto h-10 w-auto" />
        </div>
        {/* Error Message */}
        {errorText && (
          <p className="text-red-500 text-center font-bold text-sm italic mt-10">
            {errorText}
          </p>
        )}
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Fullname input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                />
              </div>
            </div>
            {/* phone input  */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                />
              </div>
            </div>
            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                />
              </div>
            </div>
            {/* password input  */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>

              <div className="mt-2 justify-end items-center flex">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                />
                {showPassword ? (
                  <LuEye
                    className="absolute m-3 cursor-pointer"
                    onClick={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <LuEyeOff
                    className="absolute m-3 cursor-pointer"
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {loading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer className="absolute bottom-0" />
    </div>
  );
};

export default Signup;

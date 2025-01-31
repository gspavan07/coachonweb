import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RotatingLines } from "react-loader-spinner";
import { MdModeEditOutline } from "react-icons/md";
import UpdateProfile from "../components/UpdateProfile";
const UserProfile = () => {
  const { user } = useUser();
  const [editProfile, setEditProfile] = useState(false);

  // Prevents rendering before user data is loaded
  if (user === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <RotatingLines
          strokeColor="black"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div>
      {editProfile && (
        <>
          <div
            onClick={() => {
              setEditProfile(false);
            }}
            className="w-full h-screen z-10 flex absolute bg-gray-800 bg-opacity-40"
          ></div>
          <UpdateProfile onClose={() => setEditProfile(false)} user={user} />
        </>
      )}
      <Navbar />
      <div className="flex flex-col items-center mt-44 mx-[10%] my-[3%]">
        <div className="relative bg-white shadow-lg rounded-xl p-8 w-full text-center">
          {/* Profile Image */}
          <div className="absolute -top-28 left-1/2 transform -translate-x-1/2">
            <img
              src={user.avatar.url || "/images"}
              alt="Profile"
              className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
          <p className="text-center mt-32 text-2xl font-bold capitalize">
            Hi, {user.name}
          </p>
          <div className="grid grid-cols-2 justify-start w-full items-start">
            <div className="flex flex-col pr-5 mt-5 w-full items-start">
              <label className="text-gray-700 font-medium">Email Address</label>
              <input
                type="text"
                value={user.email.address}
                disabled
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col pl-5 mt-5 w-full items-start">
              <label className="text-gray-700 font-medium">Mobile Number</label>
              <input
                type="text"
                value={user.mobile.number}
                disabled
                className="mt-1 w-full p-2 disabled:  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col pr-5 mt-5 w-full items-start">
              <label className="text-gray-700 font-medium">Gender</label>
              <input
                type="text"
                value={user.gender}
                disabled
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col pl-5 mt-5 w-full items-start">
              <label className="text-gray-700 font-medium">Education</label>
              <input
                type="text"
                value={user.education}
                disabled
                className="mt-1 w-full p-2  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          {/* Edit Profile Button */}
          <div className="w-full mt-5 flex justify-end">
            <button
              onClick={() => {
                setEditProfile(true);
              }}
              className="rounded-full bg-primary w-10 h-10 items-center justify-center flex"
            >
              <MdModeEditOutline color="white" size={22} />
            </button>
          </div>
        </div>
      </div>
      <Footer className="absolute bottom-0" />
    </div>
  );
};

export default UserProfile;

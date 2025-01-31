import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useUser } from "../contexts/UserContext";
import { RotatingLines } from "react-loader-spinner";

const UpdateProfile = ({ user, onClose }) => {
  const { _id, name, gender, education, avatar } = user;
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(avatar.url);
  const [formData, setFormData] = useState({
    name,
    gender,
    education,
    profilePic: "",
  });
  const [errorText, setErrorText] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText("");
    setLoading(true);
    if (!gender && !education && !name) {
      onClose();
      return;
    }
    const formDataToSend = new FormData();
    if (formData.name) formDataToSend.append("name", formData.name);
    if (formData.gender) formDataToSend.append("gender", formData.gender);
    if (formData.education)
      formDataToSend.append("education", formData.education);
    if (formData.profilePic) {
      formDataToSend.append("profilePic", formData.profilePic);
      formDataToSend.append("oldProfilePicURL", avatar.url);
    }
    try {
      const response = await fetch(`/api/updateprofile/${_id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        login(result.user); // Update local user context
        onClose();
      } else {
        setErrorText(result.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      setErrorText("Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <div className="scale-in-center ml-[35%] mt-[13%] fixed z-10 flex items-center w-1/3 justify-center bg-transparent">
      <div className="flex flex-col bg-white rounded-lg items-center shadow-lg p-6 w-full h-fit max-w-md">
        <h2 className="text-lg font-bold mb-6">Complete Your Profile</h2>
        {/* Profile Picture Upload */}
        <label className="relative cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaCamera className="text-2xl text-gray-600" />
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </label>
        <p className="mt-2 text-sm font-semibold text-gray-700">
          Profile Picture
        </p>
        {/* Error Message */}
        {errorText && (
          <p className="text-red-500 mt-2 text-center font-bold text-sm italic">
            {errorText}
          </p>
        )}
        {/* Name Dropdown */}
        <div className="mt-2 w-full max-w-sm">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <div className="mt-2 ">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="block w-full rounded-md bg-gray-200 p-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        {/* Gender Dropdown */}
        <div className="mt-2 w-full max-w-sm">
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <select
            className="w-full bg-gray-200 p-3 rounded-md appearance-none cursor-pointer"
            value={formData.gender}
            id="gender"
            name="gender"
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Education Dropdown */}
        <div className="mt-2 w-full max-w-sm">
          <label className="block text-gray-700 font-medium mb-1">
            Education
          </label>
          <select
            className="w-full bg-gray-200 p-3 rounded-md appearance-none cursor-pointer"
            value={formData.education}
            id="education"
            name="education"
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Education
            </option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="1st Year">1st Year</option>
            <option value="2st Year">2st Year</option>
            <option value="3st Year">3st Year</option>
            <option value="4st Year">4st Year</option>
          </select>
        </div>

        {/* Next Button */}
        <button
          onClick={handleSubmit}
          className="mt-2 bg-transparent text-black font-bold text-lg px-6 py-3 rounded-md flex items-center"
        >
          {loading ? (
            <RotatingLines
              strokeColor="black"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>
              NEXT <span className="ml-2">➡</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;

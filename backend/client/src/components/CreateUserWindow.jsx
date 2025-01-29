import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useUser } from "../contexts/UserContext";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const CreateUserWindow = (props) => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText("");
    setLoading(true);
    if (!gender || !education || !profilePic) {
      setErrorText("All fields are required!");
      return;
    }

    // Create FormData to send file + other data
    const formData = new FormData();
    formData.append("userId", props.user._id);
    formData.append("gender", gender);
    formData.append("education", education);
    formData.append("profilePic", profilePic); // Append the actual file

    try {
      const response = await fetch("http://localhost:3000/api/createuser", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        login(data.user);
        setLoading(false);
        navigate("/");
        console.log("Profile picture updated successfully!");
      } else {
        setLoading(false);
        setErrorText("Failed to upload profile picture");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading profile picture:", error);
      setErrorText("An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
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
        {/* Gender Dropdown */}
        <div className="mt-2 w-full max-w-sm">
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <select
            className="w-full bg-gray-200 p-3 rounded-md appearance-none cursor-pointer"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
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
        <div className="mt-4 w-full max-w-sm">
          <label className="block text-gray-700 font-medium mb-1">
            Education
          </label>
          <select
            className="w-full bg-gray-200 p-3 rounded-md appearance-none cursor-pointer"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
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

export default CreateUserWindow;

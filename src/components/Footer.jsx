import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Footer = (props) => {
  return (
    <footer
      className={`bg-gray-100 py-6 border-t w-full border-gray-200 ${props.className}`}
    >
      <div className="container mx-auto px-4">
        {/* Links Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex md:items-start items-center flex-col">
            <h5 className="text-lg font-semibold text-gray-700 mb-2 md:mb-4">
              Other Links
            </h5>
            <ul className="flex flex-wrap gap-8 md:gap-4 text-sm text-gray-600">
              <li>
                <Link to="#contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#about" className="hover:underline">
                  About CoachOn
                </Link>
              </li>
              <li>
                <Link to="#advertising" className="hover:underline">
                  Advertising
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <div className="flex-col md:flex-row flex items-center md:items-end space-x-4">
            <img
              src={logo} // Replace with actual logo path
              alt="CoachOn Logo"
              className="h-6 mb-2 md:mb-0"
            />
            <span className="text-sm text-gray-500">
              © 2025 CoachOn Web Pvt. Ltd. All Rights Reserved
            </span>
          </div>

          {/* App Store Links
          <div className="mt-6 md:mt-0 flex space-x-4">
            <a href="#google-play">
              <img
                src="google-play-badge.png" // Replace with actual badge path
                alt="Download on Google Play"
                className="h-10"
              />
            </a>
            <a href="#app-store">
              <img
                src="app-store-badge.png" // Replace with actual badge path
                alt="Download on the App Store"
                className="h-10"
              />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

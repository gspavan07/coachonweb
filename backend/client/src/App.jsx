import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import SubscriptionForm from "./components/SubscriptionForm";
import Footer from "./components/Footer";

function App() {
  const slides = [
    { src: "/imgs/1.jpg", alt: "Slide 1" },
    { src: "/imgs/2.jpg", alt: "Slide 2" },
    { src: "/imgs/3.jpg", alt: "Slide 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);
  return (
    <div>
      <Navbar />
      <main className="flex md:flex-row flex-col items-center h-[57vh] mx:mx-36 justify-center">
        {/* Search Option */}
        <div className="md:w-1/2 w-[80%] justify-center items-center">
          <h1 className="text-3xl font-semibold mb-4">
            Discover and Find the
            <br />
            <span className="line-through text-gray-400 font-normal">
              Best
            </span>{" "}
            Right Coach
          </h1>
          <div className="flex flex-col md:w-[90%]">
            <div className="flex justify-between">
              <select className="mb-4 px-4 py-3 w-[45%] rounded border border-gray-300">
                <option>Location</option>
                {/* Add more options here */}
              </select>
              <select className="mb-4 px-4 py-3 w-[45%] rounded border border-gray-300">
                <option>Course</option>
                {/* Add more options here */}
              </select>
            </div>
            <Link
              to="/search"
              className="text-white text-sm bg-primary px-6 py-3 hover:bg-primary rounded-lg flex-col items-center w-full flex h-full"
            >
              <span className="font-medium">Search</span>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mx:flex-col mx:flex items-center justify-center hidden">
          {/* Carousel Container */}
          <div className="relative overflow-hidden w-[90%] h-[250px] rounded-lg">
            {/* Slides Wrapper */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0"
                  style={{ width: "100%", height: "250px" }}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Controls (Optional) */}
          <div className="flex justify-center space-x-4 mt-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index ? "bg-primary" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </main>
      <SubscriptionForm />
      <Footer />
    </div>
  );
}

export default App;

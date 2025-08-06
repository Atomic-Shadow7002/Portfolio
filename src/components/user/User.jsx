import React, { useEffect, useState } from "react";
import "./User.css";
import devImage from "../../assets/dev.jpg";
import FacebookIcon from "../svgs/FacebookIcon";
import GithubIcon from "../svgs/GithubIcon";
import LinkedInIcon from "../svgs/LinkedInIcon";
import TwitterIcon from "../svgs/TwitterIcon";


export default function User() {
  const [name, setName] = useState("");
  const [ageCount, setAgeCount] = useState(0);
  const [moeCount, setMoeCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullName = "Hello, I'm Abhishek Kumar Ray";
  const age = 22;
  const moe = 6;
  const projects = 10;

  useEffect(() => {
    // Typing animation for name (faster speed)
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullName.length) {
        setName(fullName.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true); // Hide cursor when typing is complete
      }
    }, 50); // Faster typing speed (was 100ms, now 60ms)

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    // Start counting animations when typing is 80% complete
    const typingDuration = fullName.length * 60; // Updated duration based on new speed
    const startCountingAt = typingDuration * 0.15; // Start counting at 15% of typing

    const countingTimeout = setTimeout(() => {
      // Age counting animation
      const ageInterval = setInterval(() => {
        setAgeCount((prev) => {
          if (prev >= age) {
            clearInterval(ageInterval);
            return age;
          }
          return prev + 1;
        });
      }, 100); // Adjust counting speed here

      // MOE counting animation
      const moeInterval = setInterval(() => {
        setMoeCount((prev) => {
          if (prev >= moe) {
            clearInterval(moeInterval);
            return moe;
          }
          return prev + 1;
        });
      }, 150); // Slightly slower for variation

      // Projects counting animation
      const projectsInterval = setInterval(() => {
        setProjectsCount((prev) => {
          if (prev >= projects) {
            clearInterval(projectsInterval);
            return projects;
          }
          return prev + 1;
        });
      }, 80); // Faster for larger number
    }, startCountingAt);

    return () => {
      clearTimeout(countingTimeout);
    };
  }, []);

  return (
    <>
      <div className="relative z-10 mx-auto lg:max-w-6xl w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 md:gap-12 lg:gap-16">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Software Developer
              </span>
            </div>
            <div className="w-full max-w-2xl mx-auto lg:mx-0">
              <span className="user-name text-3xl md:text-5xl lg:text-8xl font-bold text-gray-900 dark:text-white opacity-100">
                {name}
                {!isTypingComplete && <span className="typing-cursor">|</span>}
              </span>
            </div>
            <p className="mt-5 md:mt-6 mb-4 md:mb-6 pb-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              IN From India | IT Specialist & Full-Stack Developer | Pragmatic,
              delivery-oriented | Always growing, one step at a time
            </p>

            <div className="flex items-center space-x-4 md:space-x-12 mt-6 md:mt-12">
              <a href="" className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <div className="px-2 md:px-8 py-4  bg-black rounded-full relative group transition duration-200 text-white hover:bg-transparent">
                  Download CV{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-download inline-block ml-2 mb-1 w-4 h-4 hover:animate-bounce"
                    aria-hidden="true"
                  >
                    <path d="M12 15V3"></path>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <path d="m7 10 5 5 5-5"></path>
                  </svg>
                </div>
              </a>
              <div className="flex space-x-4 md:space-x-8">
                <a
                  href=""
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <FacebookIcon />
                </a>

                <a
                  href=""
                  className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <GithubIcon />
                </a>

                <a
                  href=""
                  className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <LinkedInIcon />
                </a>

                <a
                  href=""
                  className="text-gray-500 hover:text-blue-400 transition-colors"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>
            <div className="mt-6 pt-7 md:mt-14 flex flex-wrap justify-center gap-4 lg:gap-16">
              <div className="flex items-center space-x-4">
                <span className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-white opacity-100 transform-none">
                  <span></span>
                  <p>{ageCount}</p>
                  <span></span>
                </span>
                <span className="text-sm md:text-lg text-gray-600 dark:text-gray-400">
                  Age
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-white opacity-100 transform-none">
                  <span></span>
                  <p>{moeCount}</p>
                  <span></span>
                </span>
                <span className="text-sm md:text-lg text-gray-600 dark:text-gray-400">
                  MOE
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-white opacity-100 transform-none">
                  <span></span>
                  <p>{projectsCount}</p>
                  <span></span>
                </span>
                <span className="text-sm md:text-lg text-gray-600 dark:text-gray-400">
                  Projects Completed
                </span>
              </div>
            </div>
          </div>
          <div className="opacity: 1; transform: none;">
            <div className="flex-shrink-0 relative">
              <div className="relative w-[350px] h-[350px] md:w-[480px] md:h-[480px] rounded-full overflow-visible">
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  style={{ transform: "scale(1.02097) rotate(0.69895deg)" }}
                >
                  <div className="profile-wrapper">
                  <div
                    className="w-80 h-80 md:w-[450px] md:h-[450px] rounded-full overflow-hidden relative profile-photo-container"
                    style={{
                      background:
                        "linear-gradient(45deg, rgb(6, 182, 212), rgb(236, 72, 153), rgb(16, 185, 129), rgb(245, 158, 11))",
                      padding: "5px",
                      boxShadow:
                        "rgba(233, 76, 153, 0.5) 0px 0px 50px, rgba(40, 184, 128, 0.3) 0px 0px 100px, rgba(242, 159, 34, 0.2) 0px 0px 150px",
                    }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img
                        src={devImage}
                        alt="Circular Design"
                        className="w-full h-full object-cover transition-all duration-700 hover:scale-110 hover:rotate-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/theme-context";
import "./Navbar.css";

export default function Navbar() {
  const { isDark, setIsDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    // Trigger animation on initial load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={navRef} className="sticky inset-x-0 top-20 z-40 w-full">
      <div className={`nav-container relative z-[60] mx-auto flex w-full flex-row items-center justify-between self-start rounded-full bg-transparent px-4 sm:px-6 py-2 dark:bg-transparent transition-all duration-700 ease-out ${
        isVisible ? 'nav-expanded' : 'nav-collapsed'
      }`}>
        <h1 className={`name text-lg sm:text-xl md:text-2xl font-medium font-mono text-black dark:text-white transition-all duration-700 ease-out delay-200 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
        }`}>
          Abhishek
        </h1>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`btn-theme px-3 sm:px-4 py-2 rounded-md button text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition-all duration-700 ease-out delay-200 inline-flex items-center justify-center text-center bg-transparent shadow-none dark:text-white focus:outline-none ${
            isVisible ? 'translate-x-0 translate-y-0 opacity-100' : 'translate-x-8 -translate-y-3 opacity-0'
          }`}
          aria-label="Toggle Theme"
        >
          {/* Sun Icon (shows in dark mode to switch to light) */}
          {isDark ? (
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
              className="h-5 w-5 sm:h-6 sm:w-6 transition-all"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          ) : (
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
              className="h-5 w-5 sm:h-6 sm:w-6 transition-all"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
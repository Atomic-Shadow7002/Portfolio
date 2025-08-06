import React from "react";
import { useTheme } from "../../context/theme-context";
import "./Navbar.css";

export default function Navbar() {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="sticky inset-x-0 top-20 z-40 w-full">
      <div className="nav-container relative z-[60] mx-auto flex w-full max-w-6xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 dark:bg-transparent">
        <h1 className="name text-2xl font-medium font-mono text-black dark:text-white">Abhishek</h1>
        <button
          onClick={() => setIsDark(!isDark)}
          className="btn-theme px-4 py-2 rounded-md button text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center text-center bg-transparent shadow-none dark:text-white focus:outline-none"
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
              className="h-[1.5rem] w-[1.5rem] transition-all"
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
              className="h-[1.5rem] w-[1.5rem] transition-all"
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
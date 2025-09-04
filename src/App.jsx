import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/theme-context";
import "./index.css";
import Navbar from "./components/nav/Navbar"
import User from "./components/user/User"
import Education from "./components/education/Education"
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import Connect from "./components/connect/Connect";
import Journey from "./components/journey/Journey";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-screen bg-white dark:bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        <div className="relative w-full z-10">
          <Navbar />
        </div>
        <div className="" style={{opacity:1, transform: "none"}}>
          <section className="relative flex md:min-h-screen w-full justify-center bg-transparent overflow-hidden px-6 py-6">

            <div className="absolute inset-0 z-0 opacity-80 [background-size:80px_80px] [background-image:linear-gradient(to_right,#e4e4e7_0.5px,transparent_0.5px),linear-gradient(to_bottom,#e4e4e7_0.5px,transparent_0.5px)] dark:[background-image:linear-gradient(to_right,#262626_0.5px,transparent_0.5px),linear-gradient(to_bottom,#262626_0.5px,transparent_0.5px)]"></div>
            <div className="pointer-events-none absolute inset-0 bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <User />
          </section>
        </div>
        <div className="py-6">
          <Education />
        </div>
        <div className="py-3 md:py-6">
          <Skills />
        </div>
        <div className="py-6">
          <Projects />
        </div>
        <div className="relative w-full max-w-6xl mx-auto overflow-clip">
          <Journey />
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden font-mono">
          <Connect />
        </div>
      </div>
    </ThemeProvider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
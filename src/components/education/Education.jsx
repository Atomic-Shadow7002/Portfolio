import React from "react";
import "./Education.css"
import EducationIcon from "../svgs/EducationIcon";
import TerminalIcon from "../svgs/TerminalIcon";
import RightArrowIcon from "../svgs/RightArrowIcon";
import HighSchoolIcon from "../svgs/HighSchoolIcon";
import UniversityIcon from "../svgs/UniversityIcon";

export default function Education() {
    return (
        <>
            <div className="max-w-6xl mx-auto" style={{ opacity: 1 }}>
                <div className="text-center" style={{ opacity: 1, transform: "none" }}>
                    <div className="inline-flex items-center gap-3 mb-4" style={{ transform: "none" }}>
                        <EducationIcon className="text-black dark:text-white" />

                        <h1 className="text-2xl md:text-5xl font-bold text-black dark:text-white">Education</h1>
                    </div>
                </div>
                <div className="p-3 md:p-6 font-mono transition-colors">
                    <div className="max-w-6xl mx-auto" style={{ opacity: 1, transform: "none" }}>
                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 dark:from-zinc-900 dark:to-zinc-800 rounded-xl shadow-2xl overflow-hidden" style={{ transform: "none" }}>
                            <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-gray-600 dark:border-zinc-700 p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-200">
                                        <TerminalIcon />
                                        <span className="text-sm font-medium">abhi.education.terminal</span>
                                    </div>
                                </div>
                                <div className="hidden sm:inline-block text-xs text-gray-400 dark:text-gray-500 bg-gray-700 dark:bg-zinc-800 px-3 py-1 rounded-full">
                                    ~/.portfolio/education
                                </div>
                            </div>
                            <div className="bg-black dark:bg-zinc-950 p-4 md:p-6 min-h-[700px] opacity-100">
                                <div className="mb-6" style={{ opacity: 1, transform: "none" }}>
                                    <div className="text-green-400 mb-2 text-sm sm:text-base">
                                        <span className="text-gray-500 dark:text-gray-400">user@portfolio:~$</span>
                                        <span className="ml-1">ls education/</span>
                                    </div>
                                    <div className="text-cyan-300 text-sm mb-4">📁 Available education records found</div>
                                </div>
                                <div className="mb-8" style={{ opacity: 1 }}>
                                    <div className="text-yellow-400 mb-4 text-sm sm:text-base">Select an education record to view:</div>
                                    <div className="grid gap-3">
                                        <div className="grid gap-3">
                                            <button className="flex flex-wrap sm:flex-nowrap items-center justify-between p-3 sm:p-4 rounded-lg border transition-all duration-300 group bg-gray-900/50 border-gray-700 dark:border-zinc-800 hover:border-gray-500 hover:bg-gray-800/50 cursor-pointer" tabIndex={0} style={{ opacity: 1, transform: "none" }}>
                                                <div className="flex items-center space-x-3">
                                                    <RightArrowIcon />
                                                    <HighSchoolIcon />
                                                    <span className="font-medium text-gray-300 group-hover:text-white">High School Education</span>
                                                </div>
                                                <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm whitespace-nowrap">Arya Vidyapeeth College</span>
                                            </button>
                                            <button className="flex flex-wrap sm:flex-nowrap items-center justify-between p-3 sm:p-4 rounded-lg border transition-all duration-300 group bg-gray-900/50 border-gray-700 dark:border-zinc-800 hover:border-gray-500 hover:bg-gray-800/50 cursor-pointer" tabIndex={0} style={{ opacity: 1, transform: "none" }}>
                                                <div className="flex items-center space-x-3">
                                                    <RightArrowIcon />
                                                    <UniversityIcon />
                                                    <span className="font-medium text-gray-300 group-hover:text-white">Degree in CSE</span>
                                                </div>
                                                <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm whitespace-nowrap">Assam Down Town University</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-900/30 dark:bg-zinc-900/30 rounded-lg p-3 sm:p-4 border border-gray-700 dark:border-zinc-800 min-h-[300px] text-sm sm:text-base break-words">
                                    <div class="text-gray-500 italic dark:text-gray-400">
                                        Select an education record above to view details...
                                        <span class="text-green-400 ml-1 blinking-cursor">|</span>
                                    </div>
                                </div>
                                <div className="mt-6 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                                    <div className="flex flex-wrap items-center justify-between gap-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span>Status: Ready</span>
                                        </div>
                                        <span className="text-[10px] sm:text-xs">Education Terminal v2.1.2</span>
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
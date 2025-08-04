import React from "react";
import "./Projects.css"
import ProjectIcon from "../svgs/projectsIcon";
import ACADEMeImage from "../../assets/ACADEMe.png"
import ExternalLinkIcon from "../svgs/ExternalLinkIcon";
import ProjectGithubIcon from "../svgs/ProjectGithubIcon.jsx";

export default function Projects() {
    return (
        <>

            <div className="max-w-6xl mx-auto" style={{ opacity: 1 }}>
                <div className="text-center" style={{ opacity: 1, transform: "none" }}>
                    <div className="inline-flex items-center gap-3  md:mb-12" style={{ transform: "none" }}>
                        <ProjectIcon className="text-black dark:text-white" />
                        <h1 className="text-2xl md:text-5xl font-bold text-black dark:text-white">Projects</h1>
                    </div>
                </div>
                <div className="[perspective:3000px] relative h-[80vh] pt-12 flex w-full items-center justify-center overflow-clip">
                    <div className="min-h-72 md:min-h-86 w-80 overflow-hidden rounded-md bg-neutral-100 px-6 pt-6 shadow-2xl transform-3d dark:bg-neutral-900 absolute top-10 left-[20%] rotate-[-5deg] card1"
                        draggable="false">
                        <img src={ACADEMeImage} alt="ACADEMe" className="pointer-events-none relative z-10 h-34 w-80 object-contain rounded-md" />
                        <div className="flex justify-between items-center py-2">
                            <h3 className="text-center text-lg font-bold text-neutral-700 dark:text-neutral-300">ACADEMe</h3>
                            <div className="flex items-center space-x-2">
                                <button className="p-1 m-0 border-none outline-none bg-transparent hover:border-none focus:ring-0">
                                    <ExternalLinkIcon />
                                </button>
                                <button className="p-1 m-0 border-none outline-none bg-transparent hover:border-none focus:ring-0">
                                    <ProjectGithubIcon />
                                </button>
                            </div>
                        </div>
                        <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">ACADEMe is an AI-powered platform offering personalized, adaptive learning tailored to each student's progress. It supports multilingual education and integrates seamlessly with schools and independent learners.</p>
                    </div>
                    <div className="min-h-72 md:min-h-86 w-80 overflow-hidden rounded-md bg-neutral-100 px-6 pt-6 shadow-2xl transform-3d dark:bg-neutral-900 card2" draggable="false">
                        <img src={ACADEMeImage} alt="ACADEMe" className="pointer-events-none relative z-10 h-34 w-80 object-contain rounded-md" />
                         <div className="flex justify-between items-center py-2">
                            <h3 className="text-center text-lg font-bold text-neutral-700 dark:text-neutral-300">Inerly</h3>
                            <div className="flex items-center space-x-2">
                                <button className="p-1 m-0 border-none outline-none bg-transparent hover:border-none focus:ring-0">
                                    <ExternalLinkIcon />
                                </button>
                                <button className="p-1 m-0 border-none outline-none bg-transparent hover:border-none focus:ring-0">
                                    <ProjectGithubIcon />
                                </button>
                            </div>
                        </div>
                        <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">Innerly is an anonymous, multilingual telecounseling platform connecting users with verified mental health professionals and AI support—24/7. Built for privacy and accessibility, it empowers users to seek help and engage in well-being activities without revealing their identity.</p>
                    </div>

                </div>
            </div>

        </>
    );
}
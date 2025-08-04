import React from "react";
import "./Connect.css"
import SendIcon from "../svgs/SendIcon"
import FooterFacebookIcon from "../svgs/FooterFacebookIcon"
import FooterInstagramIcon from "../svgs/FooterInstagramIcon" 
import FooterLinkedInIcon from "../svgs/FooterLinkedInIcon"
import FooterGithubIcon from "../svgs/FooterGithubIcon"

export default function Connect() {
    return (
        <>

            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <div className="text-center z-10 max-w-4xl mx-auto" style={{ opacity: 1, transform: "none" }}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16 tracking-wide" style={{ opacity: 1, transform: "none" }}>
                    <span>Let's </span>
                    <span className="text-emerald-400">Talk</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-light" style={{ opacity: 1, transform: "none" }}>
                    What led you here? What are you looking for? I would love to hear from you over a virtual coffee chat!
                </p>
                <div className="flex flex-col items-center space-y-8 mb-16" style={{ opacity: 1, transform: "none" }}>
                    <a href="" className="p-[3px] relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
                        <div className="px-2 md:px-8 py-4 bg-black rounded-lg relative group transition duration-200 text-white hover:bg-transparent">
                            Let's get in touch
                            <SendIcon />
                        </div>
                    </a>
                </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center z-10" style={{ opacity: 1, transform: "none" }}>
                <div className="text-lg font-medium">Abhishek Kumar Ray</div>
                <div className="flex space-x-4">
                    <a href="" className="text-emerald-400 hover:text-white transition-colors duration-300 p-2 rounded-full border border-emerald-400 hover:border-white">
                        <FooterFacebookIcon />
                    </a>
                    <a href="" className="text-emerald-400 hover:text-white transition-colors duration-300 p-2 rounded-full border border-emerald-400 hover:border-white">
                        <FooterInstagramIcon/>
                    </a>
                    <a href="" className="text-emerald-400 hover:text-white transition-colors duration-300 p-2 rounded-full border border-emerald-400 hover:border-white">
                        <FooterLinkedInIcon />
                    </a>
                    <a href="" className="text-emerald-400 hover:text-white transition-colors duration-300 p-2 rounded-full border border-emerald-400 hover:border-white">
                        <FooterGithubIcon />
                    </a>
                </div>
            </div>
            <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse opacity-50"></div>

        </>
    );
}
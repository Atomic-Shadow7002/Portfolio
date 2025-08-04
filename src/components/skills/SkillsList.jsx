import React from "react";
import "./SkillsList.css"; // optional: for animation styles

const skills = [
    "Node JS", "HTML", "CSS", "JavaScript", "ReactJS", "Python", "TypeScript",
    "MongoDB", "Express", "JS", "NextJS", "Tailwind CSS", "PostgreSQL",
    "Figma", "MySQL", "Docker", "AWS", "Git",
    // Duplicate set for seamless scroll loop
    "Node JS", "HTML", "CSS", "JavaScript", "ReactJS", "Python", "TypeScript",
    "MongoDB", "Express", "JS", "NextJS", "Tailwind CSS", "PostgreSQL",
    "Figma", "MySQL", "Docker", "AWS", "Git",
];

export default function SkillsList({ reverse = false }) {
    return (
        <div className="w-full max-w-6xl mx-auto overflow-hidden mask-fade">
            <ul
                className={`flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 ${reverse ? "animate-scroll-reverse" : "animate-scroll"
                    } hover:[animation-play-state:paused] mx-auto`}
            >
                {skills.map((skill, index) => (
                    <li
                        key={index}
                        className="relative w-auto max-w-[200px] shrink-0 rounded-xl border border-zinc-300 px-4 py-3 text-center
                   bg-gradient-to-b from-zinc-50 to-zinc-100 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900"
                    >
                        <span className="text-sm font-medium text-neutral-800 dark:text-gray-100">
                            {skill}
                        </span>
                    </li>
                ))}
            </ul>
        </div>

    );
}



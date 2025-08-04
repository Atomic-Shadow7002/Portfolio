import React from "react";
import SkillsList from "./SkillsList";

export default function Skills() {
    return (
        <>

            <div className="max-w-6xl mx-auto" style={{ opacity: 1 }}>
                <div className="text-center" style={{ opacity: 1, transform: "none" }}>
                    <div className="inline-flex items-center gap-3 mb-4" style={{ transform: "none" }}>
                        <h1 className="text-2xl md:text-5xl font-bold text-black dark:text-white">Skills</h1>
                    </div>
                </div>
                <div className="scroller relative z-20 max-w-6xl overflow-hidden mx-auto mask-image-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                    <SkillsList />
                </div>
                <div className="scroller relative z-20 max-w-6xl overflow-hidden mx-auto mask-image-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                    <SkillsList reverse />
                </div>
                <div className="flex flex-wrap justify-center gap-6 my-4 md:my-8">
                    Image Section
                </div>
            </div>

        </>
    );
}
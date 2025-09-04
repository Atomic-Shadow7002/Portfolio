import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import ACADEMeSignIn from "../../assets/ACADEMe-SignIn.jpg";
import ACADEMeHomepage from "../../assets/ACADEMe-homepage.jpg";
import ACADEMeProgress from "../../assets/ACADEMe-progress.jpg";
import ACADEMeAskme from "../../assets/ACADEMe-askme.jpg";
import Demo from "../../assets/Demo.png";

function generateScrollValues(count, heightStart = 0, heightStep = 120, maxOpacity = 1) {
    const heights = Array.from({ length: count }, (_, i) => heightStart + i * heightStep);
    // Changed: Set all opacity values to maxOpacity (1) so it's 100% from first scroll
    const opacities = Array.from({ length: count }, () => maxOpacity);
    const progress = heights.map((_, i) => i / (count - 1));
    return { heights, opacities, progress };
}

export default function Journey() {
    const containerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(0);

    useLayoutEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.scrollHeight);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 30%", "end end"]
    });

    const sectionCount = 19;
    const { heights: heightValues, opacities: opacityValues, progress: progressPoints } = generateScrollValues(sectionCount);

    const rawHeight = useTransform(scrollYProgress, progressPoints, heightValues);
    const rawOpacity = useTransform(scrollYProgress, progressPoints, opacityValues);

    const height = useSpring(rawHeight, {
        stiffness: 80,
        damping: 20,
        mass: 0.3,
        restDelta: 0.5
    });

    const opacity = useSpring(rawOpacity, {
        stiffness: 120,
        damping: 20,
        mass: 0.3,
        restDelta: 0.001
    });

    const TimelineSection = ({ year, text, images, points = [] }) => {
        const sectionRef = useRef(null);
        const isInView = useInView(sectionRef, { margin: "-30%" });
        const [hasBeenInView, setHasBeenInView] = useState(false);

        // Once an element has been in view, keep it visible
        React.useEffect(() => {
            if (isInView) {
                setHasBeenInView(true);
            }
        }, [isInView]);

        return (
            <motion.div 
                className="flex justify-start pt-10 md:pt-40 md:gap-10" 
                ref={sectionRef}
                initial={{ opacity: 0, y: 50 }}
                animate={hasBeenInView 
                    ? { opacity: 1, y: 0 } 
                    : { opacity: 0, y: -30 }
                }
                transition={{ 
                    duration: 0.54, 
                    ease: "easeOut",
                    opacity: { duration: 0.36 },
                    y: { duration: 0.54 }
                }}
            >
                <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                    <motion.div 
                        className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={hasBeenInView 
                            ? { scale: 1, rotate: 0 } 
                            : { scale: 0.3, rotate: -180 }
                        }
                        transition={{ 
                            duration: 0.45, 
                            delay: hasBeenInView ? 0.18 : 0,
                            ease: "easeOut"
                        }}
                    >
                        <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"></div>
                    </motion.div>
                    <motion.h3 
                        className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold transition-colors duration-300 text-neutral-800 dark:text-neutral-500"
                        initial={{ opacity: 0, x: -20 }}
                        animate={hasBeenInView 
                            ? { opacity: 1, x: 0 } 
                            : { opacity: 0.3, x: 20 }
                        }
                        transition={{ 
                            duration: 0.45, 
                            delay: hasBeenInView ? 0.27 : 0.09,
                            ease: "easeOut"
                        }}
                    >
                        {year}
                    </motion.h3>
                </div>
                <div className="relative pl-20 pr-4 md:pl-4 w-full">
                    <motion.h3 
                        className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-800 dark:text-neutral-500"
                        initial={{ opacity: 0, x: -20 }}
                        animate={hasBeenInView 
                            ? { opacity: 1, x: 0 } 
                            : { opacity: 0.3, x: 20 }
                        }
                        transition={{ 
                            duration: 0.45, 
                            delay: hasBeenInView ? 0.27 : 0.09,
                            ease: "easeOut"
                        }}
                    >
                        {year}
                    </motion.h3>
                    <div>
                        <motion.p 
                            className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.45, delay: 0.36 }}
                        >
                            {text}
                        </motion.p>
                        {points.length > 0 && (
                            <motion.div 
                                className="space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.54, delay: 0.45 }}
                            >
                                {points.map((point, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        className="flex items-center gap-2 text-xs md:text-sm text-neutral-700 dark:text-neutral-300"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                        transition={{ duration: 0.36, delay: 0.54 + idx * 0.09 }}
                                    >
                                        ✅ {point}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                        {images?.length > 0 && (
                            <motion.div 
                                className="grid grid-cols-2 gap-4 mt-4"
                                initial={{ opacity: 0, y: 30 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.63, delay: 0.63 }}
                            >
                                {images.map((img, idx) => (
                                    <motion.img 
                                        key={idx} 
                                        src={img} 
                                        alt="" 
                                        className="h-20 w-full rounded-lg object-contain shadow-md md:h-44 lg:h-60"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={hasBeenInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.45, delay: 0.72 + idx * 0.09 }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="w-full font-sans md:px-10 h-full">
            <motion.div 
                className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, ease: "easeOut" }}
            >
                <motion.h2 
                    className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.54, delay: 0.18 }}
                >
                    My Journey Report
                </motion.h2>
                <motion.p 
                    className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.54, delay: 0.36 }}
                >
                    I've been working on App & Web Development for the past 2 years. Here's a timeline of my journey.
                </motion.p>
            </motion.div>
            <div className="relative max-w-7xl mx-auto pb-20" ref={containerRef}>
                <TimelineSection
                    year="2025"
                    text="Built and launched ACADEMe — an AI-powered platform offering personalized, adaptive learning tailored to each student's progress. It supports multilingual education and integrates seamlessly with schools and independent learners."
                    images={[ACADEMeSignIn, ACADEMeHomepage, ACADEMeProgress, ACADEMeAskme]}
                />
                <TimelineSection
                    year="Sept 2024 - Dec 2024"
                    text="Completed a software development internship at Techsnap where I led React website migration, built 10+ components, and developed features like chat, blog CMS, and task tracker."
                    points={[
                        "Led migration of the company website to React.js",
                        "Built 10+ reusable React components",
                        "Implemented real-time chat functionality",
                        "Developed blog content management system",
                        "Created task tracking dashboard"
                    ]}
                />
                <TimelineSection
                    year="Jun 2024 - July 2024"
                    text="Completed a software development internship at Hr Labs where I was part of the React website migration team, worked on responsiveness, and developed core features for HR management System."
                    points={[
                        "Collaborated on React migration project",
                        "Improved mobile responsiveness across 20+ pages",
                        "Developed employee onboarding workflow"
                    ]}
                />
                <TimelineSection
                    year="Early 2024"
                    text="Developed Revispy, a full-stack e-commerce platform with Stripe integration, real-time inventory management, and admin dashboard using the MERN stack."
                    images={[Demo, Demo, Demo, Demo]}
                />

                {/* Vertical Progress Line */}
                <div
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                    style={{ height: containerHeight }}
                >
                    <motion.div
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
                        style={{ height, opacity }}
                    />
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect, useRef } from "react";
import "./Education.css"
import EducationIcon from "../svgs/EducationIcon";
import TerminalIcon from "../svgs/TerminalIcon";
import RightArrowIcon from "../svgs/RightArrowIcon";
import HighSchoolIcon from "../svgs/HighSchoolIcon";
import UniversityIcon from "../svgs/UniversityIcon";

// Icon components for different fields
const GradeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const SchoolIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
);

const LocationIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-400">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
);

const BookIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-purple-400">
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
    </svg>
);

const LoadingDots = () => (
    <div className="flex items-center space-x-1">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-subtle-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-subtle-bounce" style={{ animationDelay: '200ms' }}></div>
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-subtle-bounce" style={{ animationDelay: '400ms' }}></div>
    </div>
);

const TypeWriter = ({ text, onComplete, delay = 120 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(currentIndex + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 500); // Small delay after completion
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, delay, onComplete]);

    return (
        <span>
            {displayText}
            {currentIndex < text.length && (
                <span className="text-green-400 animate-pulse inline-block" style={{
                    animation: 'blink 1s infinite',
                    animationTimingFunction: 'step-end'
                }}>|</span>
            )}
        </span>
    );
};

export default function Education() {
    const [terminalOutput, setTerminalOutput] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [activeRecord, setActiveRecord] = useState(null); // Track which record is being processed
    const [hasInitialLoaded, setHasInitialLoaded] = useState(false);

    // Intersection Observer setup
    const componentRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasInitialLoaded) {
                    setTimeout(() => {
                        setHasInitialLoaded(true);
                    }, 200);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the component is visible
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before the component is fully visible
            }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, [hasInitialLoaded]);

    const highSchoolData = {
        degree: { text: "12th Grade - Science Stream", icon: <BookIcon /> },
        institution: { text: "Narayana Junior College", icon: <SchoolIcon /> },
        duration: { text: "May 2019 - May 2021", icon: <CalendarIcon /> },
        location: { text: "Ongole, Andhra Pradesh", icon: <LocationIcon /> },
        grade: { text: "96.7% Percentage", icon: <GradeIcon /> }
    };

    const universityData = {
        degree: { text: "Bachelor's Degree in Computer Science Engineering", icon: <BookIcon /> },
        institution: { text: "Assam Down Town University", icon: <SchoolIcon /> },
        duration: { text: "July 2021 - Present", icon: <CalendarIcon /> },
        location: { text: "Guwahati, Assam", icon: <LocationIcon /> },
        grade: { text: "8.2 CGPA", icon: <GradeIcon /> }
    };

    const addToOutput = (content, isCommand = false) => {
        setTerminalOutput(prev => [...prev, { content, isCommand, id: Date.now() + Math.random() }]);
    };

    const processEducation = async (educationData, id) => {
        if (isProcessing) return;

        // Clear previous results first
        setTerminalOutput([]);
        setIsProcessing(true);
        setActiveRecord(id); // Set which record is being processed
        setCurrentStep(0);
        setLoadingMessage('Initializing...');

        // Add fetch command
        addToOutput(`user@portfolio:~$ fetch education --id=${id}`, true);

        await new Promise(resolve => setTimeout(resolve, 800));
        setLoadingMessage('Connecting to database...');

        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoadingMessage('Loading Education Data...');
        addToOutput("📚 Loading Education Data...");

        await new Promise(resolve => setTimeout(resolve, 1500));

        // Process each field
        const fields = Object.keys(educationData);
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const data = educationData[field];

            setCurrentStep(i + 1);
            setLoadingMessage(`Processing ${field}...`);

            await new Promise(resolve => setTimeout(resolve, 600));

            addToOutput(`user@portfolio:~$ cat ${field}.txt`, true);
            await new Promise(resolve => setTimeout(resolve, 500));

            // Add a promise to wait for typewriter completion
            await new Promise(resolve => {
                addToOutput({
                    text: data.text,
                    icon: data.icon,
                    isTyping: true,
                    onComplete: resolve
                });
            });

            await new Promise(resolve => setTimeout(resolve, 800));
        }

        setIsProcessing(false);
        setActiveRecord(null); // Clear active record
        setCurrentStep(0);
        setLoadingMessage('Process completed successfully!');

        // Clear the loading message after a short delay
        setTimeout(() => {
            setLoadingMessage('');
        }, 1500);
    };

    const handleHighSchoolClick = () => {
        processEducation(highSchoolData, 1);
    };

    const handleUniversityClick = () => {
        processEducation(universityData, 2);
    };

    // Function to get button classes based on state
    const getButtonClasses = (recordId) => {
        const baseClasses = "flex flex-wrap sm:flex-nowrap items-center justify-between p-3 sm:p-4 rounded-lg border transition-all duration-500 group relative overflow-hidden";

        if (isProcessing && activeRecord === recordId) {
            return `${baseClasses} border-blue-400 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 animate-pulse cursor-not-allowed transform scale-[1.02] shadow-lg shadow-blue-500/20`;
        } else if (isProcessing) {
            return `${baseClasses} cursor-not-allowed opacity-50 bg-gray-900/50 border-gray-700 dark:border-zinc-800`;
        } else {
            return `${baseClasses} cursor-pointer bg-gray-900/50 border-gray-700 dark:border-zinc-800 hover:border-gray-500 hover:bg-gray-800/50 hover:scale-[1.01]`;
        }
    };

    // Function to get text classes based on state
    const getTextClasses = (recordId) => {
        if (isProcessing && activeRecord === recordId) {
            return "font-medium text-white";
        }
        return "font-medium text-gray-300 group-hover:text-white";
    };

    return (
        <>

            <div ref={componentRef} className={`max-w-6xl mx-auto ${hasInitialLoaded ? 'initial-fade-in' : 'opacity-0'}`} style={{ opacity: hasInitialLoaded ? 1 : 0 }}>
                <div className={`text-center ${hasInitialLoaded ? 'initial-slide-up' : 'opacity-0'}`} style={{ opacity: hasInitialLoaded ? 1 : 0, animationDelay: '0.1s', animationFillMode: 'both' }}>
                    <div className="inline-flex items-center gap-3 mb-4">
                        <EducationIcon className="text-black dark:text-white" />
                        <h1 className="text-2xl md:text-5xl font-bold text-black dark:text-white">Education</h1>
                    </div>
                </div>
                <div className="p-3 md:p-6 font-mono transition-colors">
                    <div className="max-w-6xl mx-auto">
                        <div className={`bg-gradient-to-r from-gray-800 to-gray-700 dark:from-zinc-900 dark:to-zinc-800 rounded-xl shadow-2xl overflow-hidden ${hasInitialLoaded ? 'initial-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                            <div className={`flex flex-wrap items-center justify-between gap-y-2 border-b border-gray-600 dark:border-zinc-700 p-4 ${hasInitialLoaded ? 'initial-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
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
                                <div className={`hidden sm:inline-block text-xs text-gray-400 dark:text-gray-500 bg-gray-700 dark:bg-zinc-800 px-3 py-1 rounded-full ${hasInitialLoaded ? 'initial-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                                    ~/.portfolio/education
                                </div>
                            </div>
                            <div className="bg-black dark:bg-zinc-950 p-4 md:p-6 min-h-[700px] opacity-100">
                                <div className={`mb-6 ${hasInitialLoaded ? 'initial-slide-up' : 'opacity-0'}`} style={{ opacity: hasInitialLoaded ? 1 : 0, animationDelay: '0.7s', animationFillMode: 'both' }}>
                                    <div className="text-green-400 mb-2 text-sm sm:text-base">
                                        <span className="text-gray-500 dark:text-gray-400">user@portfolio:~$</span>
                                        <span className="ml-1">ls education/</span>
                                    </div>
                                    <div className="text-cyan-300 text-sm mb-4">📁 Available education records found</div>
                                </div>
                                <div className={`mb-8 ${hasInitialLoaded ? 'initial-slide-up' : 'opacity-0'}`} style={{ opacity: hasInitialLoaded ? 1 : 0, animationDelay: '0.9s', animationFillMode: 'both' }}>
                                    <div className="text-yellow-400 mb-4 text-sm sm:text-base">Select an education record to view:</div>
                                    <div className="grid gap-3">
                                        <div className="grid gap-3">
                                            <button
                                                className={`${getButtonClasses(1)} ${hasInitialLoaded ? 'initial-slide-in-left' : 'opacity-0'}`}
                                                tabIndex={0}
                                                style={{ opacity: hasInitialLoaded ? 1 : 0, animationDelay: '1.1s', animationFillMode: 'both' }}
                                                onClick={handleHighSchoolClick}
                                                disabled={isProcessing}
                                            >
                                                {/* Loading overlay for active button */}
                                                {isProcessing && activeRecord === 1 && (
                                                    <div className="absolute inset-0 loading-gradient loading-glow opacity-20"></div>
                                                )}
                                                <div className="flex items-center space-x-3 relative z-10">
                                                    <RightArrowIcon />
                                                    <HighSchoolIcon />
                                                    <span className={getTextClasses(1)}>High School Education</span>
                                                   
                                                </div>
                                                <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm whitespace-nowrap relative z-10">
                                                    {isProcessing && activeRecord === 1 ? 'Loading...' : 'Narayana Junior College'}
                                                </span>
                                            </button>
                                            <button
                                                className={`${getButtonClasses(2)} ${hasInitialLoaded ? 'initial-slide-in-right' : 'opacity-0'}`}
                                                tabIndex={0}
                                                style={{ opacity: hasInitialLoaded ? 1 : 0, animationDelay: '1.3s', animationFillMode: 'both' }}
                                                onClick={handleUniversityClick}
                                                disabled={isProcessing}
                                            >
                                                {/* Loading overlay for active button */}
                                                {isProcessing && activeRecord === 2 && (
                                                    <div className="absolute inset-0 loading-gradient loading-glow opacity-20"></div>
                                                )}
                                                <div className="flex items-center space-x-3 relative z-10">
                                                    <RightArrowIcon />
                                                    <UniversityIcon />
                                                    <span className={getTextClasses(2)}>Degree in CSE</span>
                                                
                                                </div>
                                                <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm whitespace-nowrap relative z-10">
                                                    {isProcessing && activeRecord === 2 ? 'Loading...' : 'Assam Down Town University'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={`bg-gray-900/30 dark:bg-zinc-900/30 rounded-lg p-3 sm:p-4 border border-gray-700 dark:border-zinc-800 min-h-[300px] text-sm sm:text-base break-words ${hasInitialLoaded ? 'initial-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
                                    {terminalOutput.length === 0 && !isProcessing ? (
                                        <div className="text-gray-500 italic dark:text-gray-400">
                                            Select an education record above to view details...
                                            <span className="text-green-400 ml-1 blinking-cursor">|</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {terminalOutput.map((output, index) => (
                                                <div key={output.id} className="mb-2">
                                                    {output.isCommand ? (
                                                        <div className="text-green-400">
                                                            {output.content}
                                                        </div>
                                                    ) : typeof output.content === 'string' ? (
                                                        <div className="text-cyan-300">
                                                            {output.content}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center space-x-2 text-white">
                                                            {output.content.icon}
                                                            <TypeWriter
                                                                text={output.content.text}
                                                                delay={120}
                                                                onComplete={output.content.onComplete}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {isProcessing && (
                                                <div className="flex items-center space-x-2 text-green-400">
                                                    <LoadingDots />
                                                    <span className="text-gray-300">{loadingMessage}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className={`mt-6 text-gray-500 dark:text-gray-400 text-xs sm:text-sm ${hasInitialLoaded ? 'initial-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.7s', animationFillMode: 'both' }}>
                                    <div className="flex flex-wrap items-center justify-between gap-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                                            <span>Status: {isProcessing ? 'Processing...' : 'Ready'}</span>
                                            {isProcessing && activeRecord && (
                                                <span className="text-blue-400 font-medium">
                                                    ({activeRecord === 1 ? 'High School' : 'University'})
                                                </span>
                                            )}
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
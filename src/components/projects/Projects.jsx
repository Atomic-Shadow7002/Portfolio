import React, { useState, useRef, useEffect } from "react";
import ProjectIcon from "../svgs/projectsIcon";
import ACADEMeImage from "../../assets/ACADEMe.png";
import ExternalLinkIcon from "../svgs/ExternalLinkIcon";
import ProjectGithubIcon from "../svgs/ProjectGithubIcon.jsx";

export default function Projects() {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "ACADEMe",
      description:
        "ACADEMe is an AI-powered platform offering personalized, adaptive learning tailored to each student's progress.",
      position: { x: 20, y: 40 },
      rotation: -5,
      zIndex: 1,
    },
    {
      id: 2,
      title: "Innerly",
      description:
        "Innerly is an anonymous, multilingual telecounseling platform connecting users with verified mental health professionals.",
      position: { x: 60, y: 40 },
      rotation: 5,
      zIndex: 2,
    },
    {
      id: 3,
      title: "CodeCraft",
      description:
        "CodeCraft is a collaborative coding platform with AI-assisted pair programming.",
      position: { x: 40, y: 30 },
      rotation: -3,
      zIndex: 3,
    },
  ]);

  const [draggedCard, setDraggedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // ✅ detect immediately
  const containerRef = useRef(null);
  const maxZIndex = useRef(3);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- handlers only active for desktop ---
  const handleMouseEnter = (cardId) => !isMobile && setHoveredCard(cardId);
  const handleMouseLeave = () => setHoveredCard(null);
  const handleMouseMoveOnCard = (e, cardId) => {
    if (isMobile || draggedCard || hoveredCard !== cardId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setMousePosition({
      x: (e.clientX - centerX) / (rect.width / 2),
      y: (e.clientY - centerY) / (rect.height / 2),
    });
  };

  const getEventCoordinates = (e) =>
    e.touches?.[0] || { clientX: e.clientX, clientY: e.clientY };

  const handleStart = (e, cardId) => {
    if (isMobile) return;
    e.preventDefault();
    const { clientX, clientY } = getEventCoordinates(e);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({ x: clientX - rect.left, y: clientY - rect.top });
    setDraggedCard(cardId);
    maxZIndex.current += 1;
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, zIndex: maxZIndex.current } : c))
    );
  };

  const handleMove = (e) => {
    if (isMobile || !draggedCard || !containerRef.current) return;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(() => {
      const { clientX, clientY } = getEventCoordinates(e);
      const containerRect = containerRef.current.getBoundingClientRect();
      const newX =
        ((clientX - containerRect.left - dragOffset.x) / containerRect.width) * 100;
      const newY =
        ((clientY - containerRect.top - dragOffset.y) / containerRect.height) * 100;
      setCards((prev) =>
        prev.map((card) =>
          card.id === draggedCard
            ? { ...card, position: { x: Math.max(0, Math.min(70, newX)), y: Math.max(0, Math.min(60, newY)) } }
            : card
        )
      );
    });
  };

  const handleEnd = () => {
    setDraggedCard(null);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  };

  useEffect(() => {
    if (draggedCard && !isMobile) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
      };
    }
  }, [draggedCard, isMobile]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-3">
          <ProjectIcon className="text-black dark:text-white" />
          <h1 className="text-2xl md:text-5xl font-bold text-black dark:text-white">
            Projects
          </h1>
        </div>
      </div>

      {isMobile ? (
        // ✅ simple stacked layout for phones
        <div className="flex flex-col gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4"
            >
              <img
                src={ACADEMeImage}
                alt={card.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
                loading="lazy"
              />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {card.title}
                </h3>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <ExternalLinkIcon className="text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <ProjectGithubIcon className="text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        // ✅ draggable fancy version for desktop
        <div
          ref={containerRef}
          className="relative h-[80vh] pt-12 flex w-full items-center justify-center overflow-hidden"
          style={{ perspective: "1000px", cursor: draggedCard ? "grabbing" : "default" }}
        >
          {cards.map((card) => {
            const isHovered = hoveredCard === card.id;
            const isDragged = draggedCard === card.id;
            const tiltX = isHovered ? mousePosition.y * -15 : isDragged ? 10 : 0;
            const tiltY = isHovered ? mousePosition.x * 15 : isDragged ? 10 : 0;
            const translateZ = isHovered ? 30 : isDragged ? 50 : 0;
            const scale = isHovered ? 1.05 : isDragged ? 1.1 : 1;

            return (
              <div
                key={card.id}
                className="absolute w-80 min-h-80 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6"
                style={{
                  left: `${card.position.x}%`,
                  top: `${card.position.y}%`,
                  transform: `rotateZ(${card.rotation}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${translateZ}px) scale(${scale})`,
                  zIndex: card.zIndex,
                  transition: isDragged ? "none" : "all 0.3s ease-out",
                  cursor: isDragged ? "grabbing" : "grab",
                }}
                onMouseDown={(e) => handleStart(e, card.id)}
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={(e) => handleMouseMoveOnCard(e, card.id)}
              >
                <img
                  src={ACADEMeImage}
                  alt={card.title}
                  className="w-full h-36 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <ExternalLinkIcon className="text-gray-700 dark:text-gray-300" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <ProjectGithubIcon className="text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

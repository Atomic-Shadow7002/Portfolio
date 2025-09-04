import React, { useState, useRef, useEffect } from "react";
import ProjectIcon from "../svgs/projectsIcon";
import ACADEMeImage from "../../assets/ACADEMe.png"
import ExternalLinkIcon from "../svgs/ExternalLinkIcon";
import ProjectGithubIcon from "../svgs/ProjectGithubIcon.jsx";

export default function Projects() {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "ACADEMe",
      description: "ACADEMe is an AI-powered platform offering personalized, adaptive learning tailored to each student's progress. It supports multilingual education and integrates seamlessly with schools and independent learners.",
      position: { x: 20, y: 40 }, // Left
      rotation: -5,
      zIndex: 1
    },
    {
      id: 2,
      title: "Innerly",
      description: "Innerly is an anonymous, multilingual telecounseling platform connecting users with verified mental health professionals and AI support—24/7. Built for privacy and accessibility, it empowers users to seek help and engage in well-being activities without revealing their identity.",
      position: { x: 60, y: 40 }, // Right
      rotation: 5,
      zIndex: 2
    },
    {
      id: 3,
      title: "CodeCraft",
      description: "CodeCraft is a collaborative coding platform that enables real-time pair programming with AI assistance. Features include intelligent code suggestions, automated testing, and seamless integration with popular development tools.",
      position: { x: 40, y: 30 }, // Center top
      rotation: -3,
      zIndex: 3
    }
  ]);

  const [draggedCard, setDraggedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const maxZIndex = useRef(3);

  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');

  const handleMouseEnter = (cardId) => {
    if (draggedCard) return;
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleMouseMoveOnCard = (e, cardId) => {
    if (draggedCard || hoveredCard !== cardId) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseDown = (e, cardId) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    setDraggedCard(cardId);
    setHoveredCard(null);
    
    maxZIndex.current += 1;
    setCards(prevCards => 
      prevCards.map(c => 
        c.id === cardId 
          ? { ...c, zIndex: maxZIndex.current }
          : c
      )
    );
  };

  const handleMouseMove = (e) => {
    if (draggedCard && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newX = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * 100;
      const newY = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * 100;
      
      const constrainedX = Math.max(0, Math.min(70, newX));
      const constrainedY = Math.max(0, Math.min(60, newY));
      
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === draggedCard 
            ? { ...card, position: { x: constrainedX, y: constrainedY } }
            : card
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedCard(null);
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (draggedCard) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedCard, dragOffset]);

  return (
    <div className="max-w-6xl mx-auto" style={{ opacity: 1 }}>
      <div className="text-center" style={{ opacity: 1, transform: "none" }}>
        <div className="inline-flex items-center gap-3 md:mb-12" style={{ transform: "none" }}>
          <ProjectIcon className="text-black dark:text-white" />
          <h1 className="text-2xl md:text-5xl font-bold text-black dark:text-white">Projects</h1>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative h-[80vh] pt-12 flex w-full items-center justify-center overflow-hidden"
        style={{ 
          cursor: draggedCard ? 'grabbing' : 'default',
          perspective: '1000px'
        }}
      >
        {cards.map((card) => {
          const isHovered = hoveredCard === card.id;
          const isDragged = draggedCard === card.id;
          const isDark = document.documentElement.classList.contains('dark');
          
          const tiltX = isHovered ? mousePosition.y * -15 : isDragged ? 10 : 0;
          const tiltY = isHovered ? mousePosition.x * 15 : isDragged ? 10 : 0;
          const translateZ = isHovered ? 30 : isDragged ? 50 : 0;
          const scale = isHovered ? 1.05 : isDragged ? 1.1 : 1;
          
          const getHoverColor = () => {
            if (isDark) return '#000000';
            return '#3b82f6';
          };

          const getTextPrimaryColor = () => {
            if (isDark) return '#ffffff';
            return isHovered ? '#3b82f6' : '#1f2937';
          };

          const getTextSecondaryColor = () => {
            if (isDark) return isHovered ? '#374151' : '#9ca3af';
            return isHovered ? '#4b5563' : '#6b7280';
          };

          const getButtonBgColor = () => {
            if (isDark) {
              return isHovered 
                ? 'rgba(0, 0, 0, 0.3)' 
                : 'rgba(255, 255, 255, 0.1)';
            }
            return isHovered 
              ? 'rgba(59, 130, 246, 0.2)' 
              : 'rgba(0, 0, 0, 0.05)';
          };

          const getOverlayGradient = () => {
            if (isDark) {
              return 'linear-gradient(45deg, rgba(0,0,0,0.2), rgba(31,41,55,0.2))';
            }
            return 'linear-gradient(45deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))';
          };
          
          return (
            <div
              key={card.id}
              className="absolute w-80 min-h-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6 cursor-grab"
              style={{
                left: `${card.position.x}%`,
                top: `${card.position.y}%`,
                transform: `
                  rotateZ(${card.rotation}deg) 
                  rotateX(${tiltX}deg) 
                  rotateY(${tiltY}deg) 
                  translateZ(${translateZ}px) 
                  scale(${scale})
                `,
                zIndex: card.zIndex,
                opacity: isHovered ? 0.95 : isDragged ? 0.85 : 1,
                transition: isDragged ? 'none' : 'all 0.3s ease-out',
                willChange: 'transform, opacity',
                userSelect: 'none',
                cursor: isDragged ? 'grabbing' : 'grab',
                filter: `
                  drop-shadow(0 ${isDragged ? 25 : isHovered ? 20 : 10}px ${isDragged ? 50 : isHovered ? 40 : 25}px rgba(0,0,0,${isDragged ? 0.3 : isHovered ? 0.2 : 0.1}))
                  brightness(${isHovered ? 1.05 : 1})
                `
              }}
              onMouseDown={(e) => handleMouseDown(e, card.id)}
              onMouseEnter={() => handleMouseEnter(card.id)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={(e) => handleMouseMoveOnCard(e, card.id)}
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img 
                  src={ACADEMeImage}
                  alt={card.title}
                  className="w-full h-36 object-cover rounded-lg transition-transform duration-300"
                  style={{
                    transform: `scale(${isHovered ? 1.03 : 1}) rotate(${isHovered ? mousePosition.x * 2 : 0}deg)`
                  }}
                  draggable="false"
                />
                <div 
                  className="absolute inset-0 rounded-lg transition-opacity duration-300"
                  style={{
                    background: getOverlayGradient(),
                    opacity: isHovered ? 0.6 : 0
                  }}
                />
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <h3 
                  className="text-lg font-bold transition-colors duration-300"
                  style={{ 
                    color: getTextPrimaryColor()
                  }}
                >
                  {card.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                    style={{
                      backgroundColor: getButtonBgColor(),
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <ExternalLinkIcon className="text-gray-700 dark:text-gray-300" />
                  </button>
                  <button 
                    className="p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                    style={{
                      backgroundColor: getButtonBgColor(),
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <ProjectGithubIcon className="text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              
              <p 
                className="text-sm leading-relaxed transition-colors duration-300"
                style={{ 
                  color: getTextSecondaryColor()
                }}
              >
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

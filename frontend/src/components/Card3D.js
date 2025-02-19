import React, { useState } from 'react';

const Card3D = ({ title, icon, children, animate, highlight, className = "", darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setPosition({ x, y });
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 ease-out ${
        isHovered ? (darkMode ? 'shadow-2xl shadow-indigo-500/20' : 'shadow-2xl shadow-indigo-500/30') : 'shadow-lg'
      } ${animate ? 'animate-pulse' : ''} ${highlight ? 'ring-2 ring-indigo-500/50' : ''} ${darkMode ? 'bg-slate-800' : 'bg-white'} ${className}`}
      style={{ transform: isHovered ? `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg) scale(1.02)` : 'perspective(1000px) rotateX(0) rotateY(0)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="card-content p-4">
        <div className="flex items-center mb-3">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-300">{icon}</div>
          <h2 className="ml-2 text-lg font-medium text-gray-800 dark:text-white">{title}</h2>
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default Card3D;

import React from 'react';

interface AnimatedCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ title, children, className = '' }) => {
  return (
    <div 
      className={`glassmorphism rounded-xl shadow-2xl p-6 transition-all duration-300 ease-in-out hover:shadow-sky-500/50 hover:scale-[1.02] hover:border-sky-400/70 ${className}`}
    >
      {title && <h2 className="text-2xl font-orbitron font-semibold mb-4 text-sky-300 border-b-2 border-sky-500/50 pb-2">{title}</h2>}
      {children}
    </div>
  );
};

export default AnimatedCard;
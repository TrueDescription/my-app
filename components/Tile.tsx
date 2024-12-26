import { useState } from 'react';
import { FullScreenCard } from './FullScreenCard';

interface TileProps {
  value: number;
  question: string;
  answer: string;
  updateScore: (points: number, team?: 1 | 2, isSteal?: boolean) => void;
  addSkip: (team: 1 | 2) => void;
  currentTeam: 1 | 2;
  switchTeam: () => void;
}

export const Tile: React.FC<TileProps> = ({ 
  value, 
  question, 
  answer, 
  updateScore, 
  addSkip, 
  currentTeam,
  switchTeam
}) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const handleClick = () => {
    if (!isAnswered) {
      setShowFullScreen(true);
    }
  };

  const handleClose = () => {
    setShowFullScreen(false);
    setIsAnswered(true);
    switchTeam();
  };

  return (
    <>
      <div 
        className={`bg-blue-600 text-white font-bold flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-blue-700 p-1 h-[calc(100%/8)] ${isAnswered ? 'opacity-50' : ''}`}
        onClick={handleClick}
      >
        <span className="text-center break-words line-clamp-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          {isAnswered ? '' : `$${value}`}
        </span>
      </div>
      {showFullScreen && (
        <FullScreenCard
          value={value}
          question={question}
          answer={answer}
          onClose={handleClose}
          updateScore={updateScore}
          addSkip={addSkip}
          currentTeam={currentTeam}
        />
      )}
    </>
  );
};


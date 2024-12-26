import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FullScreenCardProps {
  value: number;
  question: string;
  answer: string;
  onClose: () => void;
  updateScore: (points: number, team?: 1 | 2, isSteal?: boolean) => void;
  addSkip: (team: 1 | 2) => void;
  currentTeam: 1 | 2;
}

export const FullScreenCard: React.FC<FullScreenCardProps> = ({ 
  value, 
  question, 
  answer, 
  onClose, 
  updateScore, 
  addSkip,
  currentTeam 
}) => {
  const [state, setState] = useState<'question' | 'answer' | 'steal'>('question');
  const [stealAttempts, setStealAttempts] = useState(0);

  const handleClick = () => {
    if (state === 'question') {
      setState('answer');
    } else {
      onClose();
    }
  };

  const handleCorrect = () => {
    updateScore(value, currentTeam);
    onClose();
  };

  const handleWrong = () => {
    updateScore(-value, currentTeam);
    setState('steal');
    setStealAttempts(0);
  };

  const handleSteal = () => {
    const stealingTeam = currentTeam === 1 ? 2 : 1;
    updateScore(value, stealingTeam, true);
    onClose();
  };

  const handleStealFail = () => {
    const stealingTeam = currentTeam === 1 ? 2 : 1;
    updateScore(-value, stealingTeam);
    addSkip(stealingTeam);
    setStealAttempts(prev => prev + 1);
    if (stealAttempts >= 1) {
      onClose();
    } else {
      setState('steal');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
        onClick={handleClick}
      >
        <div className="bg-blue-600 p-8 rounded-lg max-w-2xl w-full text-center" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-4xl font-bold text-white mb-4">${value}</h2>
          <p className="text-2xl text-white mb-8">{question}</p>
          {(state === 'answer' || state === 'steal') && (
            <p className="text-xl text-yellow-300 mb-8">{answer}</p>
          )}
          {state === 'answer' && (
            <div className="flex justify-center space-x-4">
              <button onClick={handleCorrect} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">Correct</button>
              <button onClick={handleWrong} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Wrong</button>
            </div>
          )}
          {state === 'steal' && stealAttempts < 2 && (
            <div className="flex justify-center space-x-4 mt-4">
              <button onClick={handleSteal} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">Steal</button>
              <button onClick={handleStealFail} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">Failed Steal</button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};


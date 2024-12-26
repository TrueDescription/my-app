import { useState, useEffect } from 'react';
import { Tile } from './Tile';

interface Question {
  value: number;
  question: string;
  answer: string;
}

interface Category {
  name: string;
  questions: Question[];
}

interface JeopardyData {
  categories: Category[];
}

interface JeopardyBoardProps {
  updateScore: (points: number, team?: 1 | 2, isSteal?: boolean) => void;
  addSkip: (team: 1 | 2) => void;
  currentTeam: 1 | 2;
  switchTeam: () => void;
}

export const JeopardyBoard: React.FC<JeopardyBoardProps> = ({ updateScore, addSkip, currentTeam, switchTeam }) => {
  const [jeopardyData, setJeopardyData] = useState<JeopardyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/jeopardyData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        try {
          const data = JSON.parse(text);
          setJeopardyData(data);
        } catch (e) {
          console.error("Parsing error:", e);
          setError("Error parsing JSON data. Please check the file format.");
        }
      })
      .catch(e => {
        console.error("Fetch error:", e);
        setError("Error loading Jeopardy data. Please try again later.");
      });
  }, []);

  if (error) {
    return <div className="text-center text-2xl text-red-500">{error}</div>;
  }

  if (!jeopardyData) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-7 gap-1 p-1 bg-gray-800 h-full">
      {jeopardyData.categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="flex flex-col h-full">
          <div className="bg-yellow-500 text-black font-bold text-center flex items-center justify-center p-1 h-[calc(100%/8)]">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words line-clamp-2">{category.name}</span>
          </div>
          {category.questions.map((item, itemIndex) => (
            <Tile
              key={itemIndex}
              value={item.value}
              question={item.question}
              answer={item.answer}
              updateScore={updateScore}
              addSkip={addSkip}
              currentTeam={currentTeam}
              switchTeam={switchTeam}
            />
          ))}
        </div>
      ))}
    </div>
  );
};


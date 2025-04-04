"use client"

import { useState } from 'react';
import { JeopardyBoard } from '@/components/JeopardyBoard';
import { TeamScores } from '@/components/TeamScores';

export default function App() {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [currentTeam, setCurrentTeam] = useState<1 | 2>(1);
  const [team1Skips, setTeam1Skips] = useState(0);
  const [team2Skips, setTeam2Skips] = useState(0);

  const updateScore = (points: number, team?: 1 | 2, isSteal: boolean = false) => {
    const targetTeam = team || currentTeam;
    if (targetTeam === 1) {
      setTeam1Score(prev => prev + points);
    } else {
      setTeam2Score(prev => prev + points);
    }

    if (isSteal) {
      setCurrentTeam(targetTeam);
    }
  };

  const switchTeam = () => {
    const nextTeam = currentTeam === 1 ? 2 : 1;
    const skips = nextTeam === 1 ? team1Skips : team2Skips;
    
    if (skips > 0) {
      if (nextTeam === 1) {
        setTeam1Skips(prev => prev - 1);
      } else {
        setTeam2Skips(prev => prev - 1);
      }
    } else {
      setCurrentTeam(nextTeam);
    }
  };

  const addSkip = (team: 1 | 2) => {
    if (team === 1) {
      setTeam1Skips(prev => prev + 1);
    } else {
      setTeam2Skips(prev => prev + 1);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <TeamScores 
        team1Score={team1Score} 
        team2Score={team2Score} 
        currentTeam={currentTeam}
        team1Skips={team1Skips}
        team2Skips={team2Skips}
      />
      <div className="flex-grow overflow-hidden">
        <JeopardyBoard 
          updateScore={updateScore} 
          addSkip={addSkip} 
          currentTeam={currentTeam}
          switchTeam={switchTeam}
        />
      </div>
    </div>
  );
}


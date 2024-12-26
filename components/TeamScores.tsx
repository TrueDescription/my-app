interface TeamScoresProps {
  team1Score: number;
  team2Score: number;
  currentTeam: 1 | 2;
  team1Skips: number;
  team2Skips: number;
}

export const TeamScores: React.FC<TeamScoresProps> = ({ 
  team1Score, 
  team2Score, 
  currentTeam, 
  team1Skips, 
  team2Skips 
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-900 text-white">
      <div className={`text-2xl font-bold ${currentTeam === 1 ? 'text-yellow-400' : ''} relative`}>
        Team 1: ${team1Score}
        {team1Skips > 0 && (
          <span className="absolute -top-2 -right-2 text-red-500 text-3xl">
            {'❌'.repeat(team1Skips)}
          </span>
        )}
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Jeopardy Board</h1>
      <div className={`text-2xl font-bold ${currentTeam === 2 ? 'text-yellow-400' : ''} relative`}>
        Team 2: ${team2Score}
        {team2Skips > 0 && (
          <span className="absolute -top-2 -right-2 text-red-500 text-3xl">
            {'❌'.repeat(team2Skips)}
          </span>
        )}
      </div>
    </div>
  );
};


'use client';

type Player = 'X' | 'O';

interface ScoreBoardProps {
  scores: Record<Player, number>;
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        padding: '12px 24px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <ScoreCard player="X" score={scores.X} />
      <div
        style={{
          fontSize: '1.4rem',
          fontWeight: '900',
          color: 'rgba(255,255,255,0.3)',
          padding: '0 8px',
        }}
      >
        VS
      </div>
      <ScoreCard player="O" score={scores.O} />
    </div>
  );
}

interface ScoreCardProps {
  player: Player;
  score: number;
}

function ScoreCard({ player, score }: ScoreCardProps) {
  const color = player === 'X' ? '#e94560' : '#53d8fb';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        minWidth: '80px',
      }}
    >
      <div
        style={{
          fontSize: '1.1rem',
          fontWeight: '800',
          color,
          textShadow: `0 0 10px ${color}88`,
          background: `${color}22`,
          padding: '4px 14px',
          borderRadius: '8px',
          border: `1px solid ${color}44`,
          letterSpacing: '1px',
        }}
      >
        Player {player}
      </div>
      <div
        style={{
          fontSize: '2rem',
          fontWeight: '900',
          color,
          lineHeight: 1,
        }}
      >
        {score}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

type CellValue = 'X' | 'O' | null;

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export default function Cell({ value, onClick, isWinning, disabled }: CellProps) {
  const [hovered, setHovered] = useState(false);

  const getCellStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: '80px',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: '900',
      borderRadius: '12px',
      cursor: disabled ? 'default' : 'pointer',
      border: '2px solid',
      transition: 'all 0.2s ease',
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
    };

    if (isWinning) {
      return {
        ...base,
        background: value === 'X'
          ? 'linear-gradient(135deg, rgba(233,69,96,0.5), rgba(233,69,96,0.3))'
          : 'linear-gradient(135deg, rgba(83,216,251,0.5), rgba(83,216,251,0.3))',
        borderColor: value === 'X' ? '#e94560' : '#53d8fb',
        boxShadow: value === 'X'
          ? '0 0 20px rgba(233,69,96,0.7), inset 0 0 10px rgba(233,69,96,0.2)'
          : '0 0 20px rgba(83,216,251,0.7), inset 0 0 10px rgba(83,216,251,0.2)',
        transform: 'scale(1.05)',
      };
    }

    if (value === 'X') {
      return {
        ...base,
        background: 'linear-gradient(135deg, rgba(233,69,96,0.2), rgba(233,69,96,0.1))',
        borderColor: 'rgba(233,69,96,0.5)',
        color: '#e94560',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      };
    }

    if (value === 'O') {
      return {
        ...base,
        background: 'linear-gradient(135deg, rgba(83,216,251,0.2), rgba(83,216,251,0.1))',
        borderColor: 'rgba(83,216,251,0.5)',
        color: '#53d8fb',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      };
    }

    return {
      ...base,
      background: hovered
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(255,255,255,0.03)',
      borderColor: hovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
      transform: hovered ? 'scale(1.03)' : 'scale(1)',
      boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
    };
  };

  return (
    <button
      style={getCellStyle()}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={value ? `Cell ${value}` : 'Empty cell'}
    >
      {value && (
        <span
          style={{
            display: 'inline-block',
            animation: 'popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            color: value === 'X' ? '#e94560' : '#53d8fb',
            textShadow: value === 'X'
              ? '0 0 10px rgba(233,69,96,0.8)'
              : '0 0 10px rgba(83,216,251,0.8)',
          }}
        >
          {value}
        </span>
      )}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          80% { transform: scale(1.1) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </button>
  );
}

'use client';

import Cell from './Cell';

type Player = 'X' | 'O';
type CellValue = Player | null;
type BoardState = CellValue[][];

interface BoardProps {
  board: BoardState;
  onCellClick: (row: number, col: number) => void;
  isWinningCell: (row: number, col: number) => boolean;
  winner: Player | 'Draw' | null;
}

export default function Board({ board, onCellClick, isWinningCell, winner }: BoardProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '8px',
        padding: '16px',
        background: 'rgba(0,0,0,0.25)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3)',
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            isWinning={isWinningCell(rowIndex, colIndex)}
            disabled={cell !== null || winner !== null}
          />
        ))
      )}
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import Board from './Board';
import ScoreBoard from './ScoreBoard';

const BOARD_SIZE = 5;
const WIN_COUNT = 4;

type Player = 'X' | 'O';
type CellValue = Player | null;
type BoardState = CellValue[][];

function createEmptyBoard(): BoardState {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
}

function checkWinner(
  board: BoardState,
  row: number,
  col: number,
  player: Player
): number[][] | null {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [dr, dc] of directions) {
    const cells: number[][] = [[row, col]];

    for (let i = 1; i < WIN_COUNT; i++) {
      const r = row + dr! * i;
      const c = col + dc! * i;
      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
        cells.push([r, c]);
      } else {
        break;
      }
    }

    for (let i = 1; i < WIN_COUNT; i++) {
      const r = row - dr! * i;
      const c = col - dc! * i;
      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
        cells.push([r, c]);
      } else {
        break;
      }
    }

    if (cells.length >= WIN_COUNT) {
      return cells;
    }
  }

  return null;
}

function isBoardFull(board: BoardState): boolean {
  return board.every((row) => row.every((cell) => cell !== null));
}

export default function TicTacToe() {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [winningCells, setWinningCells] = useState<number[][]>([]);
  const [scores, setScores] = useState<Record<Player, number>>({ X: 0, O: 0 });
  const [moveCount, setMoveCount] = useState(0);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (board[row][col] !== null || winner !== null) return;

      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = currentPlayer;

      const winCells = checkWinner(newBoard, row, col, currentPlayer);
      const newMoveCount = moveCount + 1;

      if (winCells) {
        setBoard(newBoard);
        setWinner(currentPlayer);
        setWinningCells(winCells);
        setMoveCount(newMoveCount);
        setScores((prev) => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }));
      } else if (isBoardFull(newBoard)) {
        setBoard(newBoard);
        setWinner('Draw');
        setMoveCount(newMoveCount);
      } else {
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        setMoveCount(newMoveCount);
      }
    },
    [board, currentPlayer, winner, moveCount]
  );

  const handleReset = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setWinningCells([]);
    setMoveCount(0);
  }, []);

  const handleResetAll = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setWinningCells([]);
    setMoveCount(0);
    setScores({ X: 0, O: 0 });
  }, []);

  const isWinningCell = useCallback(
    (row: number, col: number) => {
      return winningCells.some(([r, c]) => r === row && c === col);
    },
    [winningCells]
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>5×5 Tic Tac Toe</h1>
      <p style={styles.subtitle}>Get 4 in a row to win!</p>

      <ScoreBoard scores={scores} />

      <div style={styles.statusContainer}>
        {winner === null ? (
          <div style={styles.status}>
            <span
              style={{
                ...styles.playerIndicator,
                background: currentPlayer === 'X' ? '#e94560' : '#0f3460',
                boxShadow: currentPlayer === 'X'
                  ? '0 0 15px rgba(233,69,96,0.6)'
                  : '0 0 15px rgba(15,52,96,0.6)',
              }}
            >
              {currentPlayer}
            </span>
            <span style={styles.statusText}>Player {currentPlayer}&apos;s Turn</span>
          </div>
        ) : winner === 'Draw' ? (
          <div style={styles.resultBanner}>
            <span style={styles.drawText}>It&apos;s a Draw! 🤝</span>
          </div>
        ) : (
          <div style={styles.resultBanner}>
            <span
              style={{
                ...styles.winnerText,
                color: winner === 'X' ? '#e94560' : '#53d8fb',
              }}
            >
              Player {winner} Wins! 🎉
            </span>
          </div>
        )}
      </div>

      <Board
        board={board}
        onCellClick={handleCellClick}
        isWinningCell={isWinningCell}
        winner={winner}
      />

      <div style={styles.moveInfo}>
        Moves played: <strong>{moveCount}</strong>
      </div>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={handleReset}>
          New Game
        </button>
        <button style={{ ...styles.button, ...styles.resetButton }} onClick={handleResetAll}>
          Reset Scores
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '30px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '800',
    background: 'linear-gradient(90deg, #e94560, #53d8fb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '1px',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#aaa',
    marginTop: '-8px',
  },
  statusContainer: {
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.1rem',
    color: '#eee',
  },
  playerIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    fontWeight: '900',
    fontSize: '1.1rem',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
  statusText: {
    fontWeight: '600',
  },
  resultBanner: {
    padding: '10px 24px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
  },
  drawText: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#f5c518',
  },
  winnerText: {
    fontSize: '1.2rem',
    fontWeight: '700',
  },
  moveInfo: {
    fontSize: '0.9rem',
    color: '#aaa',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 28px',
    fontSize: '1rem',
    fontWeight: '700',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #e94560, #c73652)',
    color: '#fff',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    boxShadow: '0 4px 15px rgba(233,69,96,0.4)',
    letterSpacing: '0.5px',
  },
  resetButton: {
    background: 'linear-gradient(135deg, #0f3460, #16213e)',
    boxShadow: '0 4px 15px rgba(15,52,96,0.5)',
  },
};

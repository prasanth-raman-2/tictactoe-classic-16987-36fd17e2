import React, { useState } from "react";

/**
 * Main container component for TicTacToe Classic.
 * Implements two-player gameplay, win/draw detection, and game reset.
 * UI: Centered, clean, minimalistic, 3x3 grid with specified color theme.
 */

// Game cell component
function Cell({ value, onClick, disabled }) {
  return (
    <button
      className="ttt-cell"
      onClick={onClick}
      disabled={!!value || disabled}
      aria-label={value ? `${value} mark` : "empty"}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Game state: Array of 9 cells (null | 'X' | 'O')
   * true: 'X' to move, false: 'O' to move
   */
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [status, setStatus] = useState({ winner: null, draw: false });

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    // If game ended or cell occupied, disallow
    if (status.winner || status.draw || board[idx]) return;

    const nextBoard = board.slice();
    nextBoard[idx] = isX ? "X" : "O";
    const outcome = getGameOutcome(nextBoard);

    setBoard(nextBoard);
    setIsX((prev) => !prev);
    setStatus(outcome);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setStatus({ winner: null, draw: false });
  }

  // Compute message above board: turn or result
  let msg;
  if (status.winner) {
    msg = (
      <span className="ttt-status-win">
        Winner: <strong>{status.winner}</strong>
      </span>
    );
  } else if (status.draw) {
    msg = <span className="ttt-status-draw">Draw!</span>;
  } else {
    msg = (
      <span className="ttt-status-turn">
        Turn: <strong>{isX ? "X" : "O"}</strong>
      </span>
    );
  }

  // True if no moves allowed (game over)
  const boardDisabled = status.winner || status.draw;

  return (
    <div className="ttt-main-container">
      <div className="ttt-msg">{msg}</div>
      <div className="ttt-board">
        {board.map((cell, idx) => (
          <Cell
            key={idx}
            value={cell}
            onClick={() => handleCellClick(idx)}
            disabled={boardDisabled}
          />
        ))}
      </div>
      <div className="ttt-controls">
        <button className="ttt-reset-btn" onClick={handleReset}>
          Reset
        </button>
        <div className="ttt-game-status">
          {status.winner
            ? `Player ${status.winner} wins!`
            : status.draw
            ? "Stalemate: No winner."
            : "Game in progress..."}
        </div>
      </div>
    </div>
  );
}

// Win/draw detection helper
function getGameOutcome(board) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], draw: false };
    }
  }
  // Draw if all filled, no winner
  if (board.every((c) => c)) return { winner: null, draw: true };
  return { winner: null, draw: false };
}

export default TicTacToeClassic;

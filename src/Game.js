// src/Game.js
import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (squares[i] || winner) return; // Ignore if square is already filled or there's a winner

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    checkWinner(newSquares);
  };

  const checkWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return;
      }
    }
  };

  const renderStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div>{renderStatus()}</div>
      <Board squares={squares} onClick={handleClick} />
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
}

export default Game;

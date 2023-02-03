import { useState } from 'react';
import './styles.scss';

function Square({
	value,
	onSquareClick,
	isWinnerSquare,
}: {
	value: string;
	onSquareClick: () => void;
	isWinnerSquare: boolean;
}) {
	return (
		<button className={`square ${isWinnerSquare ? 'isWinner' : ''}`} onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board({
	xIsNext,
	squares,
	onPlay,
}: {
	xIsNext: boolean;
	squares: string[];
	onPlay: (nextSquares: string[], squareClicked: number) => void;
}) {
	function handleClick(i: number) {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? 'X' : 'O';
		onPlay(nextSquares, i);
	}
	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'Winner: ' + (xIsNext ? 'O' : 'X');
	} else {
		if (squares.every((s) => s !== null)) {
			status = 'Draw';
		} else {
			status = 'Next player: ' + (xIsNext ? 'X' : 'O');
		}
	}

	return (
		<div>
			<div className="status">{status}</div>
			{[0, 1, 2].map((boardRow) => (
				<div className="board-row" key={boardRow}>
					{[0, 1, 2].map((squareNr) => {
						const squareNumber = 3 * boardRow + squareNr;
						let isWinnerSquare = false;
						if (winner && winner.some((w) => w === squareNumber)) {
							isWinnerSquare = true;
						}
						return (
							<Square
								key={squareNumber}
								value={squares[squareNumber]}
								onSquareClick={() => handleClick(squareNumber)}
								isWinnerSquare={isWinnerSquare}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
}

export default function TicTacToeGame() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [historySquare, setHistorySquare] = useState(Array(9).fill(null));
	const [historyReversed, setHistoryReversed] = useState(false);
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	function handlePlay(nextSquares: string[], squareClicked: number) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		const nextHistorySquares = [...historySquare.slice(0, currentMove + 1), squareClicked];
		setHistorySquare(nextHistorySquares);
		setCurrentMove(nextHistory.length - 1);
	}

	function handleTogle() {
		setHistoryReversed(!historyReversed);
	}

	const moves = history.map((squares, move) => {
		let description = 'Go to ';
		const newMove = historyReversed ? history.length - 1 - move : move;
		const squareClicked = historySquare[newMove];
		const row = Math.floor(squareClicked / 3) + 1;
		const col = (squareClicked % 3) + 1;

		if (newMove === currentMove) {
			description = 'You are at ';
		}
		if (newMove > 0) {
			description += `move # ${newMove} (${col},${row})`;
		} else {
			description += 'game start';
		}

		return (
			<li key={move}>
				{newMove === currentMove ? (
					<div>{description}</div>
				) : (
					<button onClick={() => setCurrentMove(newMove)}>{description}</button>
				)}
			</li>
		);
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
				<button onClick={handleTogle}>Reverse history</button>
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

function calculateWinner(squares: string[]) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return lines[i];
		}
	}
	return null;
}

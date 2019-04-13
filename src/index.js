import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from '../src/Board.js'

class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
	  		history: [{
				squares: [[null, null, null],
					[null, null, null],
					[null, null, null]]
			}],
			xIsNext: true,
			stepNumber: 0,
			direction: false,
			winners: null,
		};
	
	}

	toggleHistory() {
		console.log("CALLED");
		const direction = !this.state.direction;
		this.setState({direction: direction});
	}

	renderMoves(history) {
		let moves = history.map((step, move) => {
			const placed =  history[move].placed;
			let desc = move ?
				'Go to [ ' + placed + ' ]' :
				'Go to game start';
			let moveCurrent = move === this.state.stepNumber;
			if (moveCurrent) {
				desc = <b>{desc}</b>
			}
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{desc} 
					</button>
				</li>
			);
		});

		const direction = this.state.direction;
		if (direction) {
			moves.reverse();
		}

		return moves;
	}


	getStatus(winnerInfo, current) {
		let status = null;
		let winner = winnerInfo ? winnerInfo.winner : null;
		if (winner) {
			status = 'Winner: ' + winner;
		}
		else if (calculateDraw(current.squares)) {
			status = 'DRAW';
		}
		else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}
		return status;
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		
		let moves = this.renderMoves(history);


		const winnerInfo = calculateWinner(current.squares);
		let status = this.getStatus(winnerInfo, current);
		let winBoxes = winnerInfo ? winnerInfo.boxes : null;

		return (
		  <div className="game">
			<div className="game-board">
				<Board 
					squares={current.squares}
					onClick={(i, j) => this.handleClick(i, j)}
					winSquares={winBoxes}
				/>
			</div>
			<div className="game-info">
			<div>{status}</div>
			<button onClick={() => this.toggleHistory()}>REVERSO</button>
			  <ol>{moves}</ol>
			</div>
		  </div>
		);
  }
	handleClick(i, j) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		let squares = JSON.parse(JSON.stringify([...current.squares]));
		if (squares[i][j] || calculateWinner(squares)) {
			return;
		}
		
		const move = this.state.xIsNext ? 'X' : 'O';
		squares[i][j] = move;
		const location = '(' + i + ',' + j + ')';

		this.setState({
			history: history.concat([{
				squares: squares,
				placed: 'placed ' + move + ' in ' + location, 
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
	const lines = [
		[[0,0], [0,1], [0,2]],
		[[1,0], [1,1], [1,2]],
		[[2,0], [2,1], [2,2]],
		[[0,0], [1,0], [2,0]],
		[[0,1], [1,1], [2,1]],
		[[0,2], [1,2], [2,2]],
		[[0,0], [1,1], [2,2]],
		[[0,2], [1,1], [2,0]],

];
	for (let i = 0; i < lines.length; ++i) {
		const [a, b, c] = lines[i];
		if (squares[a[0]][a[1]] && 
			squares[a[0]][a[1]] === squares[b[0]][b[1]] && 
			squares[a[0]][a[1]] === squares[c[0]][c[1]]) {
			return {
				winner: squares[a[0]][a[1]], 
				boxes: [JSON.stringify(a), JSON.stringify(b), JSON.stringify(c)]};
		}
	}
	return null;
}

function calculateDraw(squares) {
	let allFilled = true;
	squares.forEach((row) => {
		row.forEach((element) => {
			if (element == null) {
				allFilled = false;
			}
		});
	});
	return allFilled;
}

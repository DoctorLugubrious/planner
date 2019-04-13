
import React from 'react';
import ReactDOM from 'react-dom';
import Square from '../src/Square.js'

class Board extends React.Component {



	constructor(props) {
		super(props);
		this.renderSquare = this.renderSquare.bind(this);
	}
renderSquare(i, j) {
	const winBoxes = this.props.winSquares;
	let winBox = false;
	if (winBoxes) {
		console.log("checking " + i  + "," + j + " against" + JSON.stringify(winBoxes));
		winBox = winBoxes.includes(JSON.stringify([i,j]));
		console.log(winBox);
	}
	  return (
		<Square value={this.props.squares[i][j]}
			onClick={() => this.props.onClick(i, j)}
			key={3 * i + j}
			winner={winBox}
	  	/>
	  );
  }

render() {
	let result = [];
	this.props.squares.forEach((square, i) => {
		let temp =[];
		square.forEach((element, j) => {
			temp.push(this.renderSquare(i, j))
		});
		result.push((
			<div className="board-row" key={i}>
				{temp}
			</div>
		));
	});

	return (
		<div>
			{result}
		</div> 
	); 
  }
}

export default Board;

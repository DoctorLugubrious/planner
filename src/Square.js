import React from 'react';

const Square = (props) => {
	let style = {};
	if (props.winner) {
		style={
			backgroundImage: 'radial-gradient(greenyellow,lightgreen)',
			color: 'white',
			textShadow: '0px 0px 2px rgba(0, 0, 0, 50%)',
		};
	}
	return (
		<button className="square" onClick={props.onClick} style={style}>
			{ props.value }
		</button>
	);
}

export default Square;

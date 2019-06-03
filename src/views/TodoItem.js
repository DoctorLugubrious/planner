import React from 'react'
import Draggable from 'react-draggable'

import './todoItem.css'
import Pos from '../utility/Pos.js'

export default class TodoItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dimensions: {x:0, y:0, height:0, width:0},
		};
	}


	handleStart = (event, info) => {
		//this.start = {x: info.x, y: info.y};
	}

	handleStop = (event, info) => {
		let {x, y, width, height} = Pos(this.props.id);
		x += info.x;
		y += info.y;
		this.props.handler(this.props.text, {x, y, width, height});
	}


	render = () => {
		return (
			<Draggable
					onStart={this.handleStart}
					onStop={this.handleStop}
					position={{x: 0, y: 0}}
					defaultClassName="todoDraggable"
				>
					<li id={this.props.id}>{this.props.text}</li>
			</Draggable>
		);
	}
}

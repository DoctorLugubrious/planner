import React from 'react'
import Draggable from 'react-draggable'

import './todoItem.css'
import Pos from '../utility/Pos'

interface TodoProps {
	id:string;
	handler: (text:string, location:any) => any, text:string;
}

export default class TodoItem extends React.Component<TodoProps , object> {

	constructor(props: TodoProps) {
		super(props);
		this.state = {
			dimensions: {x:0, y:0, height:0, width:0},
		};
	}


	handleStart = (event: any, info: {x: number, y: number}) => {
		//this.start = {x: info.x, y: info.y};
	};
//TODO fix how these handle events
	handleStop = (event: any, info: any) => {
		let {left, top, width, height} = Pos(this.props.id);
		left += info.x;
		top += info.y;
		this.props.handler(this.props.text, {left, top, width, height});
	};


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

import React from 'react'
import TodoItem from './TodoItem'
import Pos from '../utility/Pos'
import Inside from '../utility/Inside'
import Clamp from '../utility/Clamp'

class TodoList extends React.Component {

	handleDrag = (text, pos) => {
		let {x, y, width, height} = Pos(this.props.id);
		if(Inside(x, y, width, height, pos.x, pos.y)) {
			let index = Math.round((pos.y - y) / pos.height);
			index = Clamp(index, 0, this.props.items.length - 1);
			this.moveItem(text, index);
		}
		else {
			this.props.handler(text, pos);
		}
	};

	constructor(props) {
		super(props);
	}

	moveItem(text, index) {
		const items = this.props.items;
		let oldIndex = items.indexOf(text);
		
		let newItems = items.slice();
		newItems.splice(oldIndex, 1);
		newItems.splice(index, 0, text);

		this.props.notifyItems(newItems);
	}

	render = () => {
		return (<ul 
			className="todoList" 
			id={this.props.id}
				>
					{this.props.items.map((item, index) => (
					<TodoItem 
						text={item} 
						key={index} 
						handler={this.handleDrag}
						id={"todoItem" + index}
					/>
				))}
			</ul>
		);
	}
}

export {TodoList};

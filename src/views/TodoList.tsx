import React from 'react'
import TodoItem from './TodoItem'
import Pos from '../utility/Pos'
import Inside from '../utility/Inside'
import Clamp from '../utility/Clamp'

interface TodoListProps {
	handler: (text:string, pos:any) => any;
	id:string;
	items:string[];
	notifyItems:(items:string[]) => any;
}

class TodoList extends React.Component<TodoListProps, object> {

	//TODO better handle this event handler
	handleDrag = (text:string, pos:{x: number, y:number, height: number}) => {
		let {left, top, width, height} = Pos(this.props.id);
		if(Inside(left, top, width, height, pos.x, pos.y)) {
			let index = Math.round((pos.y - top) / pos.height);
			index = Clamp(index, 0, this.props.items.length - 1);
			this.moveItem(text, index);
		}
		else {
			this.props.handler(text, pos);
		}
	};


	moveItem(text:string, index:number) {
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

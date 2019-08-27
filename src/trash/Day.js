import React from 'react'

import DayPresenter from '../presenters/Day'
import {TodoList} from './TodoList'
import {DailySchedule, generateSchedule, getTime} from './DailySchedule'
import DeepCopy from '../utility/objects/DeepCopy'

import './Day.css'

export default class DayView extends React.Component {
	constructor(props) {
		super(props);
		this.presenter = new DayPresenter(this, props.model);
		this.state = { 
			date: this.presenter.getAttribute("date"),
			items: ['clean up', 'write website', 'eat dinner'],
			schedule: generateSchedule(),
		};
		this.todoPos = {x: 50, y: 80};
	}

	onChange = (date) => {
		this.setState({date: date});
	};

	moveListItem = (item, newPos) => {
		let newItems = this.state.items.slice();
		let pos = newItems.indexOf(item);
		if (pos !== -1) {
			newItems.splice(pos, 1);
			newItems.splice(newPos, 0, item);

			this.setState({items: newItems});
		}
	};

	onDragEnd = (name, newPos) => {
		let newItems = DeepCopy(this.state.items);
		newItems.splice(newItems.indexOf(name), 1);

		let newSchedule = new Map(this.state.schedule);

		let {hour, minute} = getTime(newPos.x, newPos.y);
		newSchedule.get(hour).set(minute, name);

		setTimeout(() => this.setState(
			{
				items: newItems,
				schedule: newSchedule
			}
		), 50);
	};

	notifyItems = (newItems) => {
		this.setState({items: newItems});
	};


	render() {
		return (
			<div>
			<p>DAY OF {"" + this.state.date}</p>
			<div className="mainDay">
				<TodoList 
					handler={this.onDragEnd}
					items={this.state.items}
					id="dailyItems"
					notifyItems={this.notifyItems}	
					/>
			<DailySchedule
					handler={this.onDragEnd}
					schedule={this.state.schedule}/>
			</div>
			<br/>
			<button onClick={() => this.state.model.changeView("CALENDAR")}>
				Calendar
			</button>
			<button onClick={() => this.state.model.changeView("MAIN")}>
				Back to main
			</button>
			</div>
		);
	}
}



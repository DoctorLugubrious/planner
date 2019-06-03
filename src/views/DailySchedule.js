import React from 'react'
import DailySchedulePresenter from '../presenters/DailySchedule.js'
import DeepCopy from '../utility/DeepCopy.js'
import range from '../utility/Range.js'

const minOffset = 5;

function addAllMinutes(dst, hour, suffix) {
	for(const minute of range(0, 60, minOffset)) {
		let minName = ("00" + minute).slice(-2);
		let key = hour + ":" + minName + suffix;
		dst.set(key, null);
	}
}


let generateSchedule = () => {
	let schedule = new Map();

	for(const hour of range(5, 12)) {
		addAllMinutes(schedule, hour, 'am');
	}
	addAllMinutes(schedule, 12, 'pm');
	for(const hour of range(1, 9)) {
		addAllMinutes(schedule, hour, 'pm');
	}
	return schedule;
}

export default class DailyScheduleView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new DailySchedulePresenter(this, props.model);
		this.state = {
			events: this.presenter.events()
		};
	}

	generateBody = (eventsMap) => {
		let result = [];
		for(const [time, event] of eventsMap.entries()) {
			if (event !== null) {
				result.push((<tr>
					<td>{time}</td>
					<td>
						{event.name + " is " + event.completed}
						<button onClick={() => this.presenter.complete(event.name)}>COMPLETE</button>
					</td>
				</tr>));
			}
			else {
				result.push((<tr>
					<td>{time}</td>
					<td>
						{"UNSCHEDULED"}
					</td>
				</tr>));
			}
		}
		return result;
	}

	onChange = () => {
		this.setState({events: this.presenter.events()});
	}

	render = () => {
		let eventsMap = DeepCopy(this.state.events).reduce((map, obj) => {
			map.set(obj.start, obj);
			return map;
		}, generateSchedule());
		
		let body = (<tbody>
			{this.generateBody(eventsMap)}
		</tbody>);

		return (<div>
			<p>Daily Schedule</p>
			<table>
				{body}
			</table>
			<button onClick={() => this.presenter.onChangeView("MAIN")}>Back to Main</button>
			<button onClick={() => this.presenter.onChangeView("DAILY EVENTS")}>Plan</button>
                     <button onClick={() => this.presenter.onChangeView("CALENDAR")}>Calendar</button>		</div>
		);
	}
}

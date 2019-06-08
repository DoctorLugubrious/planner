import React from 'react'
import DailySchedulePresenter from '../presenters/DailySchedule'
import DeepCopy from '../utility/DeepCopy'
import range from '../utility/Range'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
import dailyGoal from "../model/dailyGoal";

const minOffset = 5;

function addAllMinutes(dst:Map<string, dailyGoal|null>, hour:number, suffix:string) {
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
};

export default class DailyScheduleView extends React.Component<viewProps, object> {

	constructor(props: viewProps) {
		super(props);
		this.presenter = new DailySchedulePresenter(this, props.model);
		this.state = {
			events: this.presenter.events()
		};
	}

	presenter: DailySchedulePresenter;

	state: {events: dailyGoal[]};

	generateBody = (eventsMap: Map<string, dailyGoal|null>) => {
		let result: object[] = [];
		eventsMap.forEach((event: dailyGoal|null, time:string) => {
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
		});
		return result;
	};

	onChange = () => {
		this.setState({events: this.presenter.events()});
	};

	render = () => {
		let eventsMap = DeepCopy(this.state.events).reduce((map: Map<string, dailyGoal|null>, obj: dailyGoal) => {
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

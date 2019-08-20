import Goal from "../../model/Goal";
import * as React from "react";
;
import WeeklyEventView from "../schedule/WeeklyEvent";
import {ChangeEvent} from "react";
import DailyGoal from "../../model/DailyGoal";

interface AssignWeeklyProps {
	goal: Goal,
	post: (goal: Goal, daily: DailyGoal, date: Date) => void;
}

interface AssignWeeklyState {
	day: string;
}

export default class AssignWeekly extends React.Component<AssignWeeklyProps, AssignWeeklyState>  {
	constructor(props: AssignWeeklyProps) {
		super(props);
		this.state = {
			day: '',
		}
	}

	changeDays = (e: ChangeEvent<HTMLSelectElement>) => {
		this.setState({day: e.target.value});
	};

	getDate: () => Date = () => {
		let result = new Date();
		let numDays = WeeklyEventView.dayOptions.findIndex((value => value == this.state.day));
		result.setDate(result.getDate() + numDays);
		return result;
	};

	render = () => {
		return (<div>
			<select onChange={this.changeDays} value={this.state.day}>
				{WeeklyEventView.dayOptions.map(value => <option key={value}>{value}</option>)}
			</select>
			<button onClick={() => this.props.post(this.props.goal, {
				name: this.props.goal.name,
				completed: false,
				start: "",
			}, this.getDate())}>
				ASSIGN TO DAY
			</button>
		</div>)
	}
};

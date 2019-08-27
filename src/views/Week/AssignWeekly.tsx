import Goal from "../../goalData/Goal";
import * as React from "react";
import {ChangeEvent} from "react";
import WeeklyEventView from "../weeklyEvents/WeeklyEvent";
import DailyGoal from "../../goalData/DailyGoal";
import GetDay from "../../utility/datesAndTimes/GetDay";

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
			day: WeeklyEventView.dayOptions[0],
		}
	}

	changeDays = (e: ChangeEvent<HTMLSelectElement>) => {
		this.setState({day: e.target.value});
	};

	getDate: () => Date = () => {
		let result = new Date();
		let today = GetDay(result);

		let todayIndex = WeeklyEventView.dayOptions.findIndex((value => value == today));
		let nextDayIndex = WeeklyEventView.dayOptions.findIndex((value => value == this.state.day));
		//CALCULATES THE NUMBER OF DAYS BETWEEN THE CURRENT DATE AND THE NEXT SELECTED
		let dayOffset = ((nextDayIndex - todayIndex) + 6) % 7 + 1;

		result.setDate(result.getDate() + dayOffset);

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

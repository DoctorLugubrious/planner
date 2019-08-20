import React, {ChangeEvent} from 'react'
import Goal from "../../model/Goal";
import FormatDate from "../../utility/FormatDate";
import FormatTime from "../../utility/FormatTime";

interface GoalProps {
	name: string;
	assignGoal:(name:string, time1:string, len: number, day: Date) => void;
	deleteGoal:() => void;
	date: Date;
}

interface GoalState {
	time: string;
	len: number;
}

export default class GoalDisplay extends React.Component<GoalProps, GoalState> {
	constructor(props: GoalProps) {
		super(props);
		this.state = {
			time: '10:00',
			len: 0,
		}
	}

	get date(): Date {
		let current: Date = this.props.date;
		let newDate : Date = new Date(current);

		let times: string[] = this.state.time.split(":");
		newDate.setHours(parseInt(times[0]));
		newDate.setMinutes(parseInt(times[1]));
		console.log(newDate);

		return newDate;
	};

	render = () => {
		const props = this.props;
		return (
			<li>
				{props.name}
				<input type="time"
					onChange={(e :ChangeEvent<HTMLInputElement>) => this.setState({time: e.target.value})}
				/>
				<input type="number"
				       onChange={(e :ChangeEvent<HTMLInputElement>) => this.setState({len: parseInt(e.target.value)})}
				/>
				<button onClick={() => props.assignGoal(props.name, FormatTime(this.date, true), this.state.len, new Date())}>
					assign
				</button>
				<button onClick={props.deleteGoal}>
					delete
				</button>
			</li>
		);
	}
}


import React, {ChangeEvent} from 'react'
import {FormatTime, Time12to24} from "../../utility/datesAndTimes/FormatTime";
import DailyGoal from "../../goalData/DailyGoal";
import {FiTrash} from "react-icons/all";

interface GoalProps {
	assignGoal:(name:string, time1:string, len: number, day: Date) => void;
	deleteGoal:() => void;
	date: Date;
	goal: DailyGoal;
}

interface GoalState {
	time: string;
	len: number;
}

export default class DailyGoalDisplay extends React.Component<GoalProps, GoalState> {
	constructor(props: GoalProps) {
		super(props);

		let time = Time12to24(props.goal.start);


		if (props.goal.len !== undefined) {
			this.state = {
				time: time,
				len: props.goal.len,
			};
		}
		else {
			this.state = {
				time: time,
				len: 0,
			};
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

		const assignName = this.props.goal.start === "" ? "assign" : "reassign";

		return (
			<div className="dailyGoal">
				<div className="dailyGoalName">{props.goal.name}</div>
				<div className={'dailyButtons'}>
					<div className={'reassign'}>
						<input type="time"
						       value={this.state.time}
						       onChange={(e :ChangeEvent<HTMLInputElement>) => this.setState({time: e.target.value})}
						/>
						<input type="number"
						       value={this.state.len}
						       onChange={(e :ChangeEvent<HTMLInputElement>) => this.setState({len: parseInt(e.target.value)})}
						/>
						<button
							onClick={() => props.assignGoal(props.goal.name, FormatTime(this.date, true), this.state.len, new Date())}>
							{assignName}
						</button>
					</div>
					<button className="deleteButton" onClick={props.deleteGoal}>
						<FiTrash/>
					</button>
				</div>
			</div>
		);
	}
}


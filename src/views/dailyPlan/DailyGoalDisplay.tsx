import React, {ChangeEvent} from 'react'
import {FormatTime, Time12to24} from "../../utility/datesAndTimes/FormatTime";
import DailyGoal from "../../goalData/DailyGoal";
import {FiTrash} from "react-icons/all";

interface GoalProps {
	assignGoal:(name:string, time1:string, len: number) => void;
	deleteGoal:() => void;
	date: Date;
	goal: DailyGoal;
}

interface GoalState {
	time: string;
	len: number|string;
}

export default class DailyGoalDisplay extends React.Component<GoalProps, GoalState> {
	constructor(props: GoalProps) {
		super(props);

		this.state = this.initState();
	}

	private initState(): GoalState {
		let props = this.props;
		let time:string = Time12to24(props.goal.start);

		if (props.goal.len !== undefined) {
			return {
				time: time,
				len: props.goal.len,
			};
		}
		else {
			return {
				time: time,
				len: "",
			};
		}
	}

	get date(): Date {
		let current: Date = this.props.date;
		let newDate : Date = new Date(current);

		let times: string[] = this.state.time.split(":");
		newDate.setHours(parseInt(times[0]));
		newDate.setMinutes(parseInt(times[1]));

		return newDate;
	};

	private assignGoal = () => {
		this.props.assignGoal(this.props.goal.name, FormatTime(this.date, true), Number(this.state.len));
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
							   step="5"
						/>
						<input type="number"
						       value={this.state.len.toString()}
						       onChange={(e :ChangeEvent<HTMLInputElement>) => this.setState({len: parseInt(e.target.value)})}
						/>
						<button
							onClick={() => this.assignGoal()}>
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


import * as React from "react";
import DailyGoal from "../../goalData/DailyGoal";
import {FiCheckCircle, FiCircle} from "react-icons/all";

interface DailyGoalViewProps {
	event: DailyGoal;
	complete: (goal: DailyGoal, name: string) => void;
}
export default class DailyGoalView extends React.Component<DailyGoalViewProps, {}> {

	completeGoal = () => {
		let event = this.props.event;
		event.completed = !event.completed;
		this.props.complete(event, event.name);
	};

	render() {
		let event = this.props.event;

		return (<div className='scheduleItem'>
			<div className={event.completed?"completed":""}>{event.name}</div>
			<button key={1} onClick={this.completeGoal}>{event.completed? <FiCheckCircle/> : <FiCircle/>}</button>
		</div>);
	}
}

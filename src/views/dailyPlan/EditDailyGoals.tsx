import * as React from "react";
import DailyGoal from "../../goalData/DailyGoal";
import DailyGoalDisplay from "./DailyGoalDisplay";

interface EditDailyGoalProps {
	events: DailyGoal[];
	date: Date;
	deleteGoal: (goal: DailyGoal) => void;
	onItemClick: (name: string, start: string, len: number) => void;
}

interface EditDailyGoalState {

}

export default class EditDailyGoals extends React.Component<EditDailyGoalProps, EditDailyGoalState> {


	render() {

		return (<ul>
			{this.props.events.map((event: DailyGoal, index: number) => (
				<li key={index}>
					<DailyGoalDisplay
						goal={event}
						assignGoal={this.props.onItemClick}
						deleteGoal={() => this.props.deleteGoal(event)}
						date={this.props.date}/>
				</li>
			))}
		</ul>);
	}
}

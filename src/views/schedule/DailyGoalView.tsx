import * as React from "react";
import DailyGoal from "../../model/DailyGoal";

interface DailyGoalViewProps {
	event: DailyGoal;
}
export default class DailyGoalView extends React.Component<DailyGoalViewProps, {}> {
	render() {
		return (<div>
			{this.props.event.name}
		</div>);
	}
}
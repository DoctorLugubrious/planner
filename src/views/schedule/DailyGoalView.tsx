import * as React from "react";
import DailyGoal from "../../goalData/DailyGoal";

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
		let info: JSX.Element[] = [];
		let event = this.props.event;

		if (!event.completed) {
			info.push(<button onClick={this.completeGoal}>COMPLETE</button>);
		}
		else {
			info.push(<span>is completed!</span>);
			info.push(<button onClick={this.completeGoal}>UNCOMPLETE</button>);
		}

		return (<div>
			{event.name}
			{info}
		</div>);
	}
}
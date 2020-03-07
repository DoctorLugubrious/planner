import React, {JSXElementConstructor} from 'react'
import RepeatingGoal from "../../goalData/RepeatingGoal";
import AssignWeekly from "./AssignWeekly";
import DailyGoal from "../../goalData/DailyGoal";
import Goal from "../../goalData/Goal";

interface WeeklyReoccurringGoalsProps {
	goals: RepeatingGoal[],
	post: (goal: Goal, dailyGoal: DailyGoal, date: Date) => void
}

interface WeeklyReoccurringGoalsState {
}

export default class WeeklyReoccurringGoals extends React.Component<WeeklyReoccurringGoalsProps, WeeklyReoccurringGoalsState> {
	render() {
		let result: JSX.Element[] = [];
		this.props.goals.forEach((value: RepeatingGoal, index: number) => {
			result.push((<li key={index}>
				{value.name}
				<AssignWeekly goal={value} post={this.props.post}/>
			</li>));
		});
		return (<div>
			<h2>Reoccurring</h2>
			<ul>
				{result}
			</ul>
		</div>);
	}
}

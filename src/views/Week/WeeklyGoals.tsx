import React from 'react'
import {ViewType} from "../ViewTypes";
import viewProps from "../data/viewProps";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import GoalList from "../goals/GoalList";
import {GoalType} from "../../goalData/GoalType";
import AssignWeekly from "./AssignWeekly";
import WeeklyAssignedDays from "./WeeklyAssignedDays";
import WeeklyReoccurringGoals from "./WeeklyReoccurringGoals";
import RepeatingGoal from "../../goalData/RepeatingGoal";
import {GoalFrequency} from "../../goalData/GoalFrequency";


export default class WeeklyGoalsView extends React.Component<viewProps, viewState> {

	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		return true;
	}

	listener: Listener;
	render = () => {
		let model = this.props.model;
		return(<div>
			<p>Weekly Plan</p>
			<GoalList
				goals={model.weeklyGoals}
				type={GoalType.WEEKLY}
				decompose={model.startDecomposeGoal}
				delete={model.deleteWeeklyGoal}
				add={model.addWeeklyGoal}
				roles={model.roles}
				optionalButton={(goal, role) => {
					return <AssignWeekly goal={goal} post={(goal, daily, date) => {
						this.props.model.assignWeeklyGoal(role, goal, date);
					}
				}/>
			 }}/>
			 <WeeklyReoccurringGoals goals={model.repeatingGoals.filter((value: RepeatingGoal) => {
				    return value.frequency == GoalFrequency.WEEKLY
				 })}
                 post={(oldGoal, newGoal, date) => {
                 	this.props.model.addDailyGoalForDate(date, newGoal);
                 	this.props.model.hideRepeating(oldGoal.name);
                 }}
			 />
			 <WeeklyAssignedDays model={this.state.model}/>
			<button onClick={() => this.state.model.changeView(ViewType.MAIN)}>done</button>
		</div>);
	}
}

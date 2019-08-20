import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import ReoccurringWeeklyEvent from "../../model/ReoccurringWeeklyEvent";
import GoalList from "../goals/GoalList";
import goal from "../../model/Goal";
import {GoalType} from "../../model/GoalType";
import AddContinuous from "../goals/AddContinuous";
import RepeatingGoal from "../../model/RepeatingGoal";



export default class RepeatingGoalView extends React.Component<viewProps, viewState> {
	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		//TODO check model
		return true;
	}

	listener: Listener;

	deleteGoal = (goal: RepeatingGoal) => {
		this.props.model.deleteRepeatingGoal(goal);
	};


	render = () => {
		return (<div>
			<p>Edit Continuous Goals</p>
			{this.state.model.repeatingGoals.map((value, index) => (<ul>
				<li key={value.name}>{value.name}<button onClick={() => this.deleteGoal(value)}>DELETE</button> </li>
			</ul>))}
			<AddContinuous submit={this.props.model.addRepeatingGoal} roles={this.props.model.roles}/>
			<button onClick={() => this.state.model.changeView(ViewType.WEEKLY_GOALS)}>done</button>
		</div>);
	};
}

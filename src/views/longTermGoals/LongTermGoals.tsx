import React from 'react';
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import GoalList from "../goals/GoalList";
import {GoalType} from "../../goalData/GoalType";


export default class LongTermGoalsView extends React.Component<viewProps, viewState> {

	private originalSize: number;

	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalSize = props.model.longTermGoals.size;
	}

	listener: Listener;

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		if (this.originalSize !== nextProps.model.longTermGoals.size) {
			this.originalSize = nextProps.model.longTermGoals.size;
			return true;
		}
		return false;
	}

	render = () => {

		let model = this.state.model;
		return (<div>
			<p>Goals</p>
			<GoalList
				add={model.addLongTermGoal}
				decompose={model.startDecomposeGoal}
				delete={model.deleteLongTermGoal}
				goals={model.longTermGoals}
				roles={model.roles}
				type={GoalType.LONG_TERM}
				optionalButton={() => null}/>
			<button onClick={() => this.state.model.changeView(ViewType.ADD_GOAL)}>Add Goal</button>
			<button onClick={() => this.state.model.changeView(ViewType.MAIN)}>done</button>
		</div>);
	}
}

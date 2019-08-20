import React from 'react'
import viewProps from "../data/viewProps";
import GoalList from "../goals/GoalList"
import {ViewType} from "../ViewTypes";
import {GoalType} from "../../model/GoalType";
import {viewState} from "../data/viewState";
import Listener from "../Listener";


export default class YearlyView extends React.Component<viewProps, viewState> {

	constructor(props:viewProps) {
		super(props);
		this.listener = new Listener(this);
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		//TODO check model
		return true;
	}

	listener: Listener;

	render = () => {
		return (<div>
			<p>Yearly Goals</p>
			<GoalList
				goals={this.state.model.yearlyGoals}
				delete={this.state.model.deleteYearlyGoal}
				roles={this.state.model.roles}
				add={this.state.model.addYearlyGoal}
				decompose={this.state.model.startDecomposeGoal}
				type={GoalType.YEARLY}
				optionalButton={() => null}/>
			<button onClick={() => this.state.model.changeView(ViewType.MONTHLY)}>done</button>
		</div>);
	}
}

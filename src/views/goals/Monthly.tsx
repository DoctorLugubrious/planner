import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import {GoalType} from "../../goalData/GoalType";
import GoalList from "./GoalList";
import DeepCopy from "../../utility/objects/DeepCopy";


export default class MonthlyView extends React.Component<viewProps, viewState> {

	private originalGoals: string;

	constructor(props:viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalGoals = DeepCopy(props.model.monthlyGoals);
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let newGoals = DeepCopy(nextProps.model.monthlyGoals);
		if (newGoals === this.originalGoals) {
			return false;
		}

		this.originalGoals = newGoals;
		return true;
	}

	listener: Listener;

	render = () => {
		return(<div>
			<p>Monthly View</p>
			<GoalList
				goals={this.state.model.monthlyGoals}
				delete={this.state.model.deleteMonthlyGoal}
				add={this.state.model.addMonthlyGoal}
			 	decompose={this.state.model.startDecomposeGoal}
				roles={this.state.model.roles}
			 	type={GoalType.MONTHLY}
				optionalButton={() => null}/>

			<button onClick={() => this.state.model.changeView(ViewType.CONTINUOUS)}>done</button>
		</div>);
	};

}

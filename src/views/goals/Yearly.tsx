import React from 'react'
import viewProps from "../data/viewProps";
import GoalList from "./GoalList"
import {ViewType} from "../ViewTypes";
import {GoalType} from "../../goalData/GoalType";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import DeepCopy from "../../utility/objects/DeepCopy";
import {FiArrowRight, FiHome} from "react-icons/all";


export default class YearlyView extends React.Component<viewProps, viewState> {

	private originalGoals: string;

	constructor(props:viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalGoals = DeepCopy(props.model.yearlyGoals);
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let newGoals = DeepCopy(nextProps.model.yearlyGoals);
		if (newGoals === this.originalGoals) {
			return false;
		}

		this.originalGoals = newGoals;
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
			<div style={{"display": "flex", "justifyContent": "space-between", "padding": "16px"}}>
				<button onClick={() => this.state.model.changeView(ViewType.MAIN)}><FiHome/></button>
				<button onClick={() => this.state.model.changeView(ViewType.MONTHLY)}><FiArrowRight/></button>
			</div>
		</div>);
	}
}

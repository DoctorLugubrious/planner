import React from 'react';
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import GoalList from "../goals/GoalList";
import {GoalType} from "../../goalData/GoalType";
import DeepCopy from "../../utility/objects/DeepCopy";
import {FiHome} from "react-icons/all";


export default class LongTermGoalsView extends React.Component<viewProps, viewState> {

	private originalGoals: string;

	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalGoals = DeepCopy(props.model.longTermGoals);
	}

	listener: Listener;

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let newGoals = DeepCopy(nextProps.model.longTermGoals);
		if (newGoals === this.originalGoals) {
			return false;
		}

		this.originalGoals = newGoals;
		return true;
	}

	render = () => {

		let model = this.state.model;
		return (<div>
			<button onClick={() => this.state.model.changeView(ViewType.MAIN)} style={{'marginLeft': '16px'}}><FiHome/></button>
			<h1>Long-term Goals</h1>
			<GoalList
				add={model.addLongTermGoal}
				decompose={model.startDecomposeGoal}
				delete={model.deleteLongTermGoal}
				goals={model.longTermGoals}
				roles={model.roles}
				type={GoalType.LONG_TERM}
				optionalButton={() => null}/>

		</div>);
	}
}

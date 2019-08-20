import React from 'react';
import viewProps from "../data/viewProps";
import Goal from "../../model/Goal";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import GoalList from "../goals/GoalList";
import {GoalType} from "../../model/GoalType";


export default class LongTermGoalsView extends React.Component<viewProps, viewState> {

	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}

	listener: Listener;

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		//TODO check model
		return true;
	}

	render = () => {
		/*
		let goals: JSX.Element[] = [];
		let i = 0;
		this.props.model.longTermGoals.forEach((goalList: Goal[], role: string) => {
			goals.push((<div key={++i}>
				<h2>{role}</h2>
				<ul>
				{goalList.map((goal:Goal, index: number) =>
					<li key={i + "-" + index}>
						{goal.name}
						<button onClick={() => {this.props.model.deleteLongTermGoal(role, goal.name)}}>DELETE</button>
					</li>)}
				</ul>
			</div>));

		});*/

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

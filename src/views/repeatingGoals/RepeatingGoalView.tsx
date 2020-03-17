import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import AddRepeatingGoal from "./AddRepeatingGoal";
import RepeatingGoal from "../../goalData/RepeatingGoal";
import {FiArrowLeft, FiArrowRight, FiTrash} from "react-icons/all";

export default class RepeatingGoalView extends React.Component<viewProps, viewState> {
	private originalSize: number;

	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalSize = props.model.repeatingGoals.length;
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let newSize = nextProps.model.repeatingGoals.length;
		if (newSize === this.originalSize) {
			return false;
		}

		this.originalSize = newSize;
		return true;
	}

	listener: Listener;

	deleteGoal = (goal: RepeatingGoal) => {
		this.props.model.deleteRepeatingGoal(goal);
	};


	render = () => {
		return (<div>
			<h1>Edit Repeating Goals</h1>
			<div>
				<ul className='goalList'>
				{this.state.model.repeatingGoals.map((value, index) => (
					<li key={index + value.name} className={'goal'}>
						<div className='goalName'>{value.name}</div>
						<button onClick={() => this.deleteGoal(value)} className='deleteButton'><FiTrash/></button>
					</li>
				))}
				</ul>
				<AddRepeatingGoal submit={this.props.model.addRepeatingGoal} roles={this.props.model.roles}/>
			</div>

			<div style={{"display": "flex", "justifyContent": "space-between", "padding": "16px"}}>
				<button onClick={() => this.state.model.changeView(ViewType.MONTHLY)}><FiArrowLeft/></button>
				<button onClick={() => this.state.model.changeView(ViewType.WEEKLY_GOALS)}><FiArrowRight/></button>
			</div>
		</div>);
	};
}

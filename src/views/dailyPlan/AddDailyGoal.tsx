import React, {ChangeEvent} from 'react'
import {FiPlus} from "react-icons/all";
import DailyGoal from "../../goalData/DailyGoal";

interface AddDailyGoalProps {
	onSubmit: (goal: DailyGoal) => void;
}

interface AddDailyGoalState {
	newName: string;
}

export default class AddDailyGoal extends React.Component<AddDailyGoalProps, AddDailyGoalState> {

	constructor(props: AddDailyGoalProps) {
		super(props);
		this.state = {
			newName: "",
		}
	}

	textChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState ({newName: e.target.value});
	};

	private onSubmit() {
		this.props.onSubmit({name: this.state.newName, completed: false, start: ""});
		this.setState({newName: ''});
	}

	render() {
		return (<div className="addDailyGoal">
			<h2>Add New Daily Goal</h2>
			<div className={"hbox"}>
				<input type="text" onChange={this.textChange} value={this.state.newName}/>
				<button className="add" onClick={() => this.onSubmit()}><FiPlus/>
				</button>
			</div>
		</div>);
	}
}

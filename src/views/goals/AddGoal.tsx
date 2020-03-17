import React, {ChangeEvent} from 'react'
import Goal from "../../goalData/Goal";
import {FiPlus} from "react-icons/all";

interface AddGoalProps {
	add: (name: Goal, role: string) => void;
	role: string;
}

interface AddGoalState {
}

export default class AddGoal extends React.Component<AddGoalProps, AddGoalState> {

	current: string = "";

	changeNew = (e: ChangeEvent<HTMLInputElement>) => {
		this.current = e.target.value;
	};

	render() {
		return (<div>
			<div className='addGoal'>
				<input type="text" onChange={this.changeNew} id="newInput"/>
				<button onClick={() => {
					this.props.add({name: this.current}, this.props.role);
				}}><FiPlus/></button>
			</div>
		</div>);
	}
}

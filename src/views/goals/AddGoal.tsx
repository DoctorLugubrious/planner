import React, {ChangeEvent} from 'react'
import Goal from "../../goalData/Goal";
import {FiPlus} from "react-icons/all";

interface AddGoalProps {
	add: (name: Goal, role: string) => void;
	role: string;
}

interface AddGoalState {
	name: string;
}

export default class AddGoal extends React.Component<AddGoalProps, AddGoalState> {

	constructor(props: AddGoalProps) {
		super(props);
		this.state = {
			name: "",
		}
	}

	changeNew = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({name: e.target.value});
	};

	render() {
		return (<div>
			<div className='addGoal'>
				<input type="text" onChange={this.changeNew} value={this.state.name}/>
				<button onClick={() => {
					this.props.add({name: this.state.name}, this.props.role);
					this.setState({name: ""});
				}}><FiPlus/></button>
			</div>
		</div>);
	}
}

import React, {ChangeEvent} from 'react'
import Goal from "../../goalData/Goal";

interface AddGoalProps {
	add: (name: Goal, role: string) => void;
	roles: string[];
}

interface AddGoalState {
}

export default class AddGoal extends React.Component<AddGoalProps, AddGoalState> {

	role: string = this.props.roles[0];
	current: string = "";

	changeRole = (e: ChangeEvent<HTMLSelectElement>) => {
		this.role = e.target.value;
	};

	changeNew = (e: ChangeEvent<HTMLInputElement>) => {
		this.current = e.target.value;
	};

	render() {
		if (this.props.roles.length === 0) {
			return (<div>CREATE SOME ROLES, n00b!</div>);
		}


		return (<div>

			<input type="text" onChange={this.changeNew} id="newInput"/>
			<select onChange={this.changeRole}>
				{this.props.roles.map((role: string) =>
					                      <option value={role} key={role}>{role}</option>
				)}
			</select>
			<button onClick={() => {
				this.props.add({name: this.current}, this.role);
			}}>ADD
			</button>
		</div>);
	}
}
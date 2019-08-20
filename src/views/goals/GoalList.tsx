import React, {ChangeEvent} from "react";
import goal from "../../model/Goal";
import {GoalType} from "../../model/GoalType";

interface GoalListProps {
	goals: Map<string, goal[]>;
	type: GoalType;
	decompose: (goal: goal, type: GoalType, role: string) => void;
	delete: (role:string, name: string) => void;
	add: (name: goal, role: string) => void;
	roles: string[];
	optionalButton : (goal: goal, role: string) => JSX.Element|null;
}
//TODO decompose this into multiple types
export default class GoalList extends React.Component<GoalListProps, {}> {

	changeNew = (e: ChangeEvent<HTMLInputElement>) => {
		this.current = e.target.value;
	};

	changeRole = (e:ChangeEvent<HTMLSelectElement>) => {
	  this.role = e.target.value;
	};

	current: string = "";
	role: string = this.props.roles[0];

	render() {

		if (this.props.roles.length === 0){
			return (<div>CREATE SOME GOALS, n00b!</div>);
		}

		let goals: JSX.Element[] = [];

		this.props.goals.forEach((value: goal[], key: string) => {
			goals.push(<div key={key}>
				<h2>{key}</h2>
				<ul>
					{value.map((goal: goal, index: number) => <li key={index}>
						{goal.name}
						<button onClick={() => {
							this.props.decompose(goal, this.props.type, key);
						}}>DECOMPOSE
						</button>
						<button onClick={() => {
							this.props.delete(key, goal.name)
						}}>DELETE
						</button>
						{this.props.optionalButton(goal, key)}
					</li>)}
				</ul>
			</div>)
		});

		return (<div>
			{goals}
			<input type="text" onChange={this.changeNew} id="newInput"/>
			<select onChange={this.changeRole}>
				{this.props.roles.map((role: string) =>
					<option value={role} key={role}>{role}</option>
				)}
			</select>
			<button onClick={() => {
				this.props.add({name: this.current}, this.role);
			}}>ADD</button>
		</div>);
	}
};


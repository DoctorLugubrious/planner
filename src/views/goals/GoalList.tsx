import React from "react";
import goal from "../../goalData/Goal";
import {GoalType} from "../../goalData/GoalType";
import AddGoal from "./AddGoal";
import {MdCallSplit, FiTrash} from "react-icons/all";

interface GoalListProps {
	goals: Map<string, goal[]>;
	type: GoalType;
	decompose: (goal: goal, type: GoalType, role: string) => void;
	delete: (role:string, name: string) => void;
	optionalButton: (goal: goal, role: string) => JSX.Element | null;
	add: (name: goal, role: string) => void;
	roles: string[];
}

export default class GoalList extends React.Component<GoalListProps, {}> {

	render() {
		let goals: JSX.Element[] = [];
		this.props.goals.forEach((value: goal[], key: string) => {
			goals.push(<div key={key}>
				<h2>{key}</h2>
				{value.length > 0 ?
					<ul className='goalList'>
						{value.map((goal: goal, index: number) => <li key={index} className="goal">
							<div className={'goalName'}> {goal.name}</div>
							<button onClick={() => {
								this.props.decompose(goal, this.props.type, key);
							}}><MdCallSplit/>
							</button>
							<button className="deleteButton" onClick={() => {
								this.props.delete(key, goal.name)
							}}><FiTrash/>
							</button>
							{this.props.optionalButton(goal, key)}
						</li>)}
					</ul>
					:
					<div className="noGoals">There are no goals for this role.</div>
				}
				<AddGoal add={this.props.add} role={key}/>
			</div>)
		});

		return (<div>
			{goals}
		</div>);
	}
};


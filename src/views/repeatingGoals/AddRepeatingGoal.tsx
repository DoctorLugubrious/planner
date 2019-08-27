import * as React from "react";
import {ChangeEvent} from "react";
import {GoalFrequency} from "../../goalData/GoalFrequency";
import EnumSelect from "../input/EnumSelect";
import RepeatingGoal from "../../goalData/RepeatingGoal";

interface TextAndButtonProps {
	submit: (goal: RepeatingGoal) => void;
	roles: string[];
}

interface TextAndButtonState {
	name: string;
	role: string;
}

export default class AddRepeatingGoal extends React.Component<TextAndButtonProps, TextAndButtonState> {

	static readonly inputID : string = "newContinuousName";

	constructor(props: TextAndButtonProps) {
		super(props);
		this.state = {
			name: "",
			role: props.roles[0],
		}
	}

	submit = () => {
		let frequency: GoalFrequency = (GoalFrequency as any)[this.enumResult];
		let newGoal : RepeatingGoal = {name: this.state.name, frequency:frequency};
		this.props.submit(newGoal);
		this.setState({name: ""});
	};

	enumResult: string = "";

	changeRole = (e: ChangeEvent<HTMLSelectElement>) => {
		this.setState({role: e.target.value});
	};

	render = () => {
		return (<div>
			<input type="text"
			       id={AddRepeatingGoal.inputID}
			       onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
			       value={this.state.name}/>
			<EnumSelect type={GoalFrequency} container={this}/>
			<select onChange={this.changeRole}>
				{this.props.roles.map((role: string) =>
					<option value={role} key={role}>{role}</option>
				)}
			</select>
			<button onClick={this.submit}>ADD</button>
		</div>);
	}
}
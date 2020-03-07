import * as React from "react";
import {ChangeEvent} from "react";
import {GoalFrequency} from "../../goalData/GoalFrequency";
import EnumSelect from "../input/EnumSelect";
import RepeatingGoal from "../../goalData/RepeatingGoal";
import {GoalType} from "../../goalData/GoalType";

interface TextAndButtonProps {
	submit: (goal: RepeatingGoal) => void;
	roles: string[];
}

interface TextAndButtonState {
	name: string;
	frequency: GoalFrequency;
}

export default class AddRepeatingGoal extends React.Component<TextAndButtonProps, TextAndButtonState> {

	static readonly inputID : string = "newContinuousName";

	constructor(props: TextAndButtonProps) {
		super(props);
		this.state = {
			name: "",
			frequency: GoalFrequency.WEEKLY,
		}
	}

	submit = () => {
		let frequency: GoalFrequency = (GoalFrequency as any)[this.enumResult];
		let newGoal : RepeatingGoal = {name: this.state.name, frequency:frequency};
		this.props.submit(newGoal);
		this.setState({name: ""});
	};

	get enumResult(): string {
		return GoalFrequency[this.state.frequency];
	};

	set enumResult(value: string) {
		let frequency = (GoalFrequency as any)[value];
		this.setState({frequency});
	};


	render = () => {
		return (<div>
			<input type="text"
			       id={AddRepeatingGoal.inputID}
			       onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
			       value={this.state.name}/>
			<EnumSelect type={GoalFrequency} container={this}/>
			<button onClick={this.submit}>ADD</button>
		</div>);
	}
}

import * as React from "react";
import {ChangeEvent} from "react";

interface InputListProps {
	onFinish: (result: string) => void;
	buttonName: string;
}

interface InputListState {
	current: string;
}

export default class StringInput extends React.Component<InputListProps, InputListState> {

	constructor(props: InputListProps) {
		super (props);
		this.state = {
			current: "",
		}
	}
	changeNew = (e : ChangeEvent<HTMLInputElement>) => {
		this.setState({current: e.currentTarget.value});
	};


	onFinish = () => {
		this.props.onFinish(this.state.current);
		this.setState({current: ""});
	};

	render() {
		return (<div>
			<input type="text" onChange={this.changeNew} value={this.state.current} id="newInput"/>
			<button onClick={this.onFinish}>
				{this.props.buttonName}
			</button>
		</div>)
	}
}
import * as React from "react";
import {ChangeEvent} from "react";
import './stringInput.css'

interface InputListProps {
	onFinish: (result: string) => void;
	buttonName: string|JSX.Element;
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
		return (<div className={'stringInput'}>
			<input type="text" onChange={this.changeNew} value={this.state.current} id="newInput"/>
			<button onClick={this.onFinish}>
				{this.props.buttonName}
			</button>
		</div>)
	}
}

import * as React from "react";
import {ChangeEvent} from "react";

interface InputListProps {
	onFinish: (result: string) => void;
	buttonName: string;
}

interface InputListState {
}

export default class StringInput extends React.Component<InputListProps, InputListState> {

	current: string = "";

	changeNew = (e : ChangeEvent<HTMLInputElement>) => {
		this.current = e.currentTarget.value;
	};


	onFinish = () => {
		this.props.onFinish(this.current);
	};

	render() {
		return (<div>
			<input type="text" onChange={this.changeNew} id="newInput"/>
			<button onClick={this.onFinish}>
				{this.props.buttonName}
			</button>
		</div>)
	}
}
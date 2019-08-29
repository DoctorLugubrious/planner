import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {viewState} from "../data/viewState";


export default class AddLongTermGoal extends React.Component<viewProps, viewState> {

	constructor(props: viewProps) {
		super(props);
		this.roleName = props.model.roles[0];
		this.listener = new Listener(this);
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		//maybe fix
		return false;
	}


	private roleName: string = "";
	private name :string = "";
	listener: Listener;

	onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.roleName = e.currentTarget.value;
	};


	onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.name = e.currentTarget.value;
	};

	addGoal = () => {
		this.state.model.addLongTermGoal({name: this.name}, this.roleName);
		this.state.model.changeView(ViewType.LONG_TERM_GOALS)
	};

	render = () => {
		return (<div>
			<p>Add a goal</p>
			<select onChange={this.onChangeSelect}>
				{this.state.model.roles.map((role: string, index: number) => (
					<option value={role} key={index}>{role}</option>
				))}
			</select>
			<h2>name</h2>
			<input type={"text"} onChange={this.onChangeName}/>
			<button onClick={this.addGoal}>done</button>
		</div>);
	}
}

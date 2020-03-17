import viewProps from "../data/viewProps";
import {viewState} from "../data/viewState";
import * as React from "react";
import {ChangeEvent} from "react";
import Listener from "../Listener";
import {ViewType} from "../ViewTypes";
import ChangeViewButton from "../buttons/ChangeViewButton";
import {FiHome} from "react-icons/all";

export default class ChangePasswordView extends React.Component<viewProps, viewState> {
	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}

	private listener: Listener;

	setNewPassword = (e: ChangeEvent<HTMLInputElement>) =>{
		this.password = e.target.value;
	};

	submit = () => {
		this.state.model.changePassword(this.password);
		this.state.model.changeView(ViewType.MAIN);
	};

	private password: string = "";

	render() {
		return (<div style={{'display': 'flex', 'flexDirection': 'column'}}>
			<ChangeViewButton model={this.state.model} view={ViewType.MAIN} text={<FiHome/>}/>
			<p>New Password: </p> <input type="password" onChange={this.setNewPassword}/>
			<button onClick={this.submit}>Change Password</button>
		</div>);
	}
}

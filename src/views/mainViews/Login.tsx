import React from 'react';
import viewProps from "../data/viewProps";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import {ViewType} from "../ViewTypes";


export default class LoginView extends React.Component<viewProps, viewState> {

	constructor(props:viewProps) {
		super(props);
		this.username = "";
		this.password = "";
		this.listener = new Listener(this);
	}

	username: string;
	password: string;


	listener: Listener;

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		if (this.state.model.username !== "") {
			this.state.model.changeView(ViewType.MAIN);
		}
		return true;
	}

	setPassword = (e: React.FormEvent<HTMLInputElement>) => {
		this.password = e.currentTarget.value;
	};

	setUsername = (e: React.FormEvent<HTMLInputElement>) => {
		this.username = e.currentTarget.value;
	};


	notifyLoginFail = () => {
		alert("LOGIN FAILED");
	};

	login = () => {
		this.state.model.login(this.username, this.password);
	};

	render = () => {
		return (<div>
			<p>Username: </p> <input type="text" onChange={this.setUsername}/>
			<p>Password: </p> <input type="password" onChange={this.setPassword}/>
			<br/>
			<button onClick={this.login}>Login</button>
			<button onClick={()=>this.state.model.register(this.username, this.password)}>Register</button>
		</div>);
	}
}

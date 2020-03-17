import React from 'react';
import viewProps from "../data/viewProps";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import {ViewType} from "../ViewTypes";

import './login.css';

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
			if (this.state.model.firstLogin) {
				this.state.model.changeView(ViewType.TUTORIAL);
			}
			else {
				this.state.model.changeView(ViewType.MAIN);
			}
		}
		return true;
	}

	setPassword = (e: React.FormEvent<HTMLInputElement>) => {
		this.password = e.currentTarget.value;
	};

	setUsername = (e: React.FormEvent<HTMLInputElement>) => {
		this.username = e.currentTarget.value;
	};


	login = () => {
		this.state.model.login(this.username, this.password);
	};

	render = () => {
		return (<div className={"login"}>
			<h2>Username: </h2> <input type="text" onChange={this.setUsername}/>
			<h2>Password: </h2> <input type="password" onChange={this.setPassword}/>
			<br/>
			<div className={"loginButtons"}>
				<button onClick={this.login}>Login</button>
				<button onClick={()=>this.state.model.register(this.username, this.password)}>Register</button>
			</div>
		</div>);
	}
}

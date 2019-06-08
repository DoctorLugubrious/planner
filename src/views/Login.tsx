import React from 'react'
import LoginPresenter from '../presenters/Login'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
export default class LoginView extends React.Component<viewProps, object> {

	constructor(props:viewProps) {
		super(props);
		this.presenter = new LoginPresenter(this, props.model);
		this.state = {};
		this.username = "";
		this.password = "";
	}

	private presenter: LoginPresenter;
	state: {};
	username: string;
	password: string;

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
		this.presenter.login(this.username, this.password);
	};

	render = () => {
		return (<div>
			<p>Username: </p> <input type="text" onChange={this.setUsername}/>
			<p>Password: </p> <input type="password" onChange={this.setPassword}/>
			<br/>
			<button onClick={this.login}>Login</button>
		</div>);
	}
}

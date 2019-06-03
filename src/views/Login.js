import React from 'react'
import LoginPresenter from '../presenters/Login.js'
export default class LoginView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new LoginPresenter(this, props.model);
		this.state = {};
		this.username = "";
		this.password = "";
	}

	setPassword = (e) => {
		this.password = e.target.value;
	}

	setUsername = (e) => {
		this.username = e.target.value;
	}

	notifyLoginFail = () => {
		alert("LOGIN FAILED");
	}

	login = () => {
		this.presenter.login(this.username, this.password);
	}	

	render = () => {
		return (<div>
			<p>Username: </p> <input type="text" onChange={this.setUsername}/>
			<p>Password: </p> <input type="password" onChange={this.setPassword}/>
			<br/>
			<button onClick={this.login}>Login</button>
		</div>);
	}
}

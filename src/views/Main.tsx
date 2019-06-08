import React from 'react'
import MainPresenter from '../presenters/Main'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
export default class MainView extends React.Component<viewProps, object> {

	constructor(props:viewProps) {
		super(props);
		this.presenter = new MainPresenter(props.model);
		this.state = { lastLogin: this.presenter.getLastLogin() };
	}

	state: {lastLogin:Date};
	presenter: MainPresenter;

	render = () => {
		const lastLogin = this.state.lastLogin;
		const today = new Date();
		const weeklyPlan = lastLogin.getMonth() !== today.getMonth() ? "YEARLY" : "MONTHLY";
		return (<div>
			<p>MAIN VIEW, last logged in {this.state.lastLogin + ""}</p>
			<ul>
				<li><button onClick={() => this.presenter.onChangeView("ROLES")}>Roles</button></li>
				<li><button onClick={() => this.presenter.onChangeView(weeklyPlan)}>Weekly plan (goes to {weeklyPlan} screen)</button></li>
				<li><button onClick={() => this.presenter.onChangeView("DAILY EVENTS")}>Daily Plan</button></li>
				<li><button onClick={() => this.presenter.onChangeView("DAILY SCHEDULE")}>Day</button></li>
				<li><button onClick={() => this.presenter.onChangeView("GOALS")}>Edit Long-Term Goals</button></li>
				<li><button onClick={() => this.presenter.onChangeView("WEEKLY EVENTS")}>Weekly Schedule</button></li>
			</ul>
		</div>);
	}
}

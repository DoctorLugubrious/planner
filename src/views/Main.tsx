import React from 'react';
import viewProps from "./data/viewProps";
import {ViewType} from "./ViewTypes";
import {viewState} from "./data/viewState";
import Listener from "./Listener";
import ChangeViewButton from "./buttons/ChangeViewButton";


export default class MainView extends React.Component<viewProps, viewState> {

	constructor(props:viewProps) {
		super(props);
		this.listener = new Listener(this);
	}


	listener: Listener;

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		//TODO check model
		return true;
	}

	render = () => {
		const lastLogin = this.state.model.lastLogin;
		const today = new Date();
		const weeklyPlan : ViewType = lastLogin.getMonth() !== today.getMonth() ? ViewType.YEARLY : ViewType.MONTHLY;
		return (<div>
			<p>MAIN VIEW, last logged in {this.state.model.lastLogin + ""}</p>
			<ul>
				<li><button onClick={() => this.state.model.changeView(ViewType.ROLES)}>Roles</button></li>
				<li><button onClick={() => this.state.model.changeView(weeklyPlan)}>Weekly plan (goes to {ViewType[weeklyPlan]} screen)</button></li>
				<li><button onClick={() => this.state.model.changeView(ViewType.DAILY_EVENTS)}>Daily Plan</button></li>
				<li><button onClick={() => {
					this.state.model.resetDate();
					this.state.model.changeView(ViewType.DAILY_SCHEDULE)
				}}>Day</button></li>
				<li><button onClick={() => this.state.model.changeView(ViewType.LONG_TERM_GOALS)}>Edit Long-Term Goals</button></li>
				<li><button onClick={() => this.state.model.changeView(ViewType.WEEKLY_EVENTS)}>Weekly Schedule</button></li>
				<li><ChangeViewButton model={this.state.model} view={ViewType.ADD_SCHEDULED_EVENT} text="Scheduled Events"/></li>
				<li><ChangeViewButton model={this.state.model} view={ViewType.CHANGE_PASSWORD} text="Change Password"/></li>
			</ul>
		</div>);
	};

}

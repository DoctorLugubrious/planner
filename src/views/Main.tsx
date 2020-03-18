import React from 'react';
import viewProps from "./data/viewProps";
import {ViewType} from "./ViewTypes";
import {viewState} from "./data/viewState";
import Listener from "./Listener";
import ChangeViewButton from "./buttons/ChangeViewButton";
import "./main.css";

export default class MainView extends React.Component<viewProps, viewState> {

	private originalLogin: Date;


	listener: Listener;

	constructor(props:viewProps) {
		super(props);
		this.listener = new Listener(this);
		this.originalLogin = new Date(props.model.lastLogin);
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let lastLogin = nextProps.model.lastLogin;
		if (lastLogin === this.originalLogin) {
			return false;
		}

		this.originalLogin = lastLogin;
		return true;
	}

	render = () => {
		const today = new Date();
		const weeklyPlan : ViewType = today.getDate() <= 7 ? ViewType.YEARLY : ViewType.MONTHLY;
		return (<div className="view">
			<ul className="mainList">
				<li><button onClick={() => this.state.model.changeView(ViewType.DAILY_PLAN)}>Daily Plan</button></li>
				<li><button onClick={() => {
					this.state.model.resetDate();
					this.state.model.changeView(ViewType.DAILY_SCHEDULE)
				}}>Day</button></li>
				<li><button onClick={() => this.state.model.changeView(weeklyPlan)}>Weekly Plan</button></li>
				<li><ChangeViewButton model={this.state.model} view={ViewType.ADD_SCHEDULED_EVENT} text="Add Scheduled Event"/></li>
				<li><button onClick={() => this.state.model.changeView(ViewType.WEEKLY_EVENTS)}>Weekly Schedule</button></li>
				<li><button onClick={() => this.state.model.changeView(ViewType.ROLES)}>Roles</button></li>
				<li><button onClick={() => this.state.model.changeView(ViewType.LONG_TERM_GOALS)}>Long-Term Goals</button></li>
				<li><ChangeViewButton model={this.state.model} view={ViewType.CHANGE_PASSWORD} text="Change Password"/></li>
			</ul>
		</div>);
	};

}

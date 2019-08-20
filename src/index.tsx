import React from 'react'
import ReactDOM from 'react-dom'

import CalendarView from './views/mainViews/Calendar'
import DailySchedule from './views/mainViews/DailySchedule'
import LongTermGoalsView from './views/mainViews/LongTermGoals'
import WeeklyEventsView from './views/mainViews/WeeklyEvents'
import AddLongTermGoal from './views/mainViews/AddLongTermGoal'
import RolesView from './views/mainViews/Roles'
import LoginView from './views/mainViews/Login'
import MainView from './views/mainViews/Main'
import YearlyView from './views/mainViews/Yearly'
import DecomposeView from './views/mainViews/Decompose'
import MonthlyView from './views/mainViews/Monthly'
import RepeatingGoalView from './views/mainViews/RepeatingGoalView'
import WeekyGoalsView from './views/mainViews/WeeklyGoals'
import DailyEvents from './views/mainViews/DailyEvents'
import Model from './model/Model'
import {ViewType} from "./views/ViewTypes";
import AddScheduledEventView from "./views/mainViews/AddScheduledEvent";
import ChangePasswordView from "./views/mainViews/ChangePassword";
import EditScheduledEvent from "./views/mainViews/EditScheduledEvent";

class App extends React.Component {
	constructor(props: any) {
		super(props);
		this.state =  {
			view: ViewType.LOGIN,
		};
		this.model = new Model(this.setView)
	}

	state: {view: ViewType};

	private readonly model :Model;

	render() {
		switch(this.state.view) {
			case ViewType.CALENDAR:
				return <CalendarView model={this.model}/>;
			case ViewType.DAILY_SCHEDULE:
				return <DailySchedule model={this.model}/>;
			case ViewType.DAILY_EVENTS:
				return <DailyEvents model={this.model}/>;
			case ViewType.LONG_TERM_GOALS:
				return <LongTermGoalsView model={this.model}/>;
			case ViewType.WEEKLY_EVENTS:
				return <WeeklyEventsView model={this.model}/>;
			case ViewType.ADD_GOAL:
				return <AddLongTermGoal model={this.model}/>;
			case ViewType.ROLES:
				return <RolesView model={this.model}/>;
			case ViewType.LOGIN:
				return <LoginView model={this.model}/>;
			case ViewType.MAIN:
				return <MainView model={this.model}/>;
			case ViewType.YEARLY:
				return <YearlyView model={this.model}/>;
			case ViewType.DECOMPOSE:
				return <DecomposeView model={this.model}/>;
			case ViewType.MONTHLY:
				return <MonthlyView model={this.model}/>;
			case ViewType.CONTINUOUS:
				return <RepeatingGoalView model={this.model}/>;
			case ViewType.WEEKLY_GOALS:
				return <WeekyGoalsView model={this.model}/>;
			case ViewType.ADD_SCHEDULED_EVENT:
				return <AddScheduledEventView model={this.model}/>;
			case ViewType.CHANGE_PASSWORD:
				return <ChangePasswordView model={this.model}/>;
			case ViewType.EDIT_SCHEDULED_EVENT:
				return <EditScheduledEvent model={this.model}/>;
			default:
				return <p>VIEW {this.state.view} NOT FOUND</p>
		}
	}

	setView = (view: ViewType) => {
		this.setState({view: view});
	}

}



ReactDOM.render(<App />, document.getElementById('root'));
	

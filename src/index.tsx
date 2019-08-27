import React from 'react'
import ReactDOM from 'react-dom'

import CalendarView from './views/calendar/Calendar'
import DailySchedule from './views/DailySchedule/DailySchedule'
import LongTermGoalsView from './views/longTermGoals/LongTermGoals'
import WeeklyEventsView from './views/weeklyEvents/WeeklyEvents'
import AddLongTermGoal from './views/longTermGoals/AddLongTermGoal'
import RolesView from './views/roles/Roles'
import LoginView from './views/user/Login'
import MainView from './views/Main'
import YearlyView from './views/goals/Yearly'
import DecomposeView from './views/decompose/Decompose'
import MonthlyView from './views/goals/Monthly'
import RepeatingGoalView from './views/repeatingGoals/RepeatingGoalView'
import WeekyGoalsView from './views/Week/WeeklyGoals'
import DailyEvents from './views/dailyPlan/DailyEvents'
import Model from './model/Model'
import {ViewType} from "./views/ViewTypes";
import AddScheduledEventView from "./views/scheduledEvents/AddScheduledEvent";
import ChangePasswordView from "./views/user/ChangePassword";
import EditScheduledEvent from "./views/scheduledEvents/EditScheduledEvent";
import Header from "./views/page/header/header";
import Footer from "./views/page/footer/footer";

class App extends React.Component {
	state: { view: ViewType };
	private readonly model: Model;

	constructor(props: any) {
		super(props);
		this.state = {
			view: ViewType.LOGIN,
		};
		this.model = new Model(this.setView)
	}

	getView() {
		switch (this.state.view) {
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

	render() {
		return <div>
			<Header username={this.model.username}/>
			{this.getView()}
			<Footer view={this.state.view}/>
		</div>
	}

	setView = (view: ViewType) => {
		this.setState({view: view});
	}

}


ReactDOM.render(<App/>, document.getElementById('root'));
	

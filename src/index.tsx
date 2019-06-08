import React from 'react'
import ReactDOM from 'react-dom'

import CalendarView from './views/Calendar'
import DailySchedule from './views/DailySchedule'
import GoalsView from './views/Goals'
import WeeklyEventsView from './views/WeeklyEvents'
import AddEventView from './views/AddEvent'
import AddGoalView from './views/AddGoal'
import RolesView from './views/Roles'
import LoginView from './views/Login'
import MainView from './views/Main'
import YearlyView from './views/Yearly'
import DecomposeView from './views/Decompose'
import MonthlyView from './views/Monthly'
import ContinuousView from './views/Continuous'
import WeekView from './views/Week'
import DailyEvents from './views/DailyEvents'

import Model from './model/Model'


class App extends React.Component {
	constructor(props: any) {
		super(props);
		this.state =  {
			//			view: "LOGIN",
			view: "MAIN",
		};
		this.model = new Model(this.setView);
	}

	state = {
		view: "MAIN",
	};

	private readonly model :Model;

	render() {
		switch(this.state.view) {
			case "CALENDAR":
				return <CalendarView model={this.model}/>;
			case "DAILY SCHEDULE":
				return <DailySchedule model={this.model}/>;
			case "DAILY EVENTS":
				return <DailyEvents model={this.model}/>;
			case "GOALS":
				return <GoalsView model={this.model}/>;
			case "WEEKLY EVENTS":
				return <WeeklyEventsView model={this.model}/>;
			case "ADD EVENT":
				return <AddEventView model={this.model}/>;
			case "ADD GOAL":
				return <AddGoalView model={this.model}/>;
			case "ROLES":
				return <RolesView model={this.model}/>;
			case "LOGIN":
				return <LoginView model={this.model}/>;
			case "MAIN":
				return <MainView model={this.model}/>;
			case "YEARLY":
				return <YearlyView model={this.model}/>;
			case "DECOMPOSE":
				return <DecomposeView model={this.model}/>;
			case "MONTHLY":
				return <MonthlyView model={this.model}/>;
			case "CONTINUOUS":
				return <ContinuousView model={this.model}/>;
			case "WEEK":
				return <WeekView model={this.model}/>;
			default:
				return <p>VIEW {this.state.view} NOT FOUND</p>
		}
	}

	setView = (view: string) => {
		this.setState({view: view});
	}

}



ReactDOM.render(<App />, document.getElementById('root'));
	

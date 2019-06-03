import React from 'react'
import ReactDOM from 'react-dom'

import CalendarView from './views/Calendar.js'
import DailySchedule from './views/DailySchedule.js'
import GoalsView from './views/Goals.js'
import WeeklyEventsView from './views/WeeklyEvents.js'
import AddEventView from './views/AddEvent.js'
import AddGoalView from './views/AddGoal.js'
import RolesView from './views/Roles.js'
import LoginView from './views/Login.js'
import MainView from './views/Main.js'
import YearlyView from './views/Yearly.js'
import DecomposeView from './views/Decompose.js'
import MonthlyView from './views/Monthly.js'
import ContinuousView from './views/Continuous.js'
import WeekView from './views/Week.js'
import DailyEvents from './views/DailyEvents.js'

import Model from './model/Model.js'


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state =  {
			//			view: "LOGIN",
			view: "MAIN",
		}
		this.model = new Model(this.setView);
	}

	render() {
		switch(this.state.view) {
			case "CALENDAR":
				return <CalendarView model={this.model}/>
			case "DAILY SCHEDULE":
				return <DailySchedule model={this.model}/>
			case "DAILY EVENTS":
				return <DailyEvents model={this.model}/>
			case "GOALS":
				return <GoalsView model={this.model}/>
			case "WEEKLY EVENTS":
				return <WeeklyEventsView model={this.model}/>
			case "ADD EVENT":
				return <AddEventView model={this.model}/>
			case "ADD GOAL":
				return <AddGoalView model={this.model}/>
			case "ROLES":
				return <RolesView model={this.model}/>
			case "LOGIN":
				return <LoginView model={this.model}/>
			case "MAIN":
				return <MainView model={this.model}/>
			case "YEARLY":
				return <YearlyView model={this.model}/>
			case "DECOMPOSE":
				return <DecomposeView model={this.model}/>
			case "MONTHLY":
				return <MonthlyView model={this.model}/>
			case "CONTINUOUS":
				return <ContinuousView model={this.model}/>
			case "WEEK":
				return <WeekView model={this.model}/>
			default:
				return <p>VIEW {this.state.view} NOT FOUND</p>
		}
	}

	setView = (view) => {
		this.setState({view: view});
	}

}



ReactDOM.render(<App />, document.getElementById('root'));
	

import React, {ChangeEvent} from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import DailyScheduleBody from "../schedule/DailyScheduleBody";
import EditDailyGoals from "./EditDailyGoals";


export default class DailyPlanView extends React.Component<viewProps, viewState> {
	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}


	listener: Listener;

	getUnassignedEvents() {
		return this.state.model.dailyGoals.filter((event :any) => (event.start === ""));
	}

	getAssignedEvents() {
		return this.state.model.dailyGoals.filter((event: any) => (event.start !== ""));
	}

	onItemClick = (name: string, start: string, len: number) => {
		//TODO fix this
		this.state.model.updateDailyGoal({name: name, start: start, len: len, completed: false}, name);
	};
	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		//TODO check model
		return true;
	}

	textChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.newGoalName = e.target.value;
	};

	newGoalName: string = "";


	render = () => {
		return (<div>
			<p>Daily Events</p>
				<h2>Unassigned Goals</h2>
				<EditDailyGoals
					events={this.getUnassignedEvents()}
					date={this.state.model.date}
					deleteGoal={this.state.model.deleteDailyGoal}
					onItemClick={this.onItemClick}/>

				<input type="text" onChange={this.textChange}/>
				<button onClick={() => {
					this.state.model.addDailyGoal({name: this.newGoalName, completed: false, start: ""});
				}}>+
				</button>

				<h2>Assigned Daily Goals</h2>
				<EditDailyGoals
					events={this.getAssignedEvents()}
					date={this.state.model.date}
					deleteGoal={this.state.model.deleteDailyGoal}
					onItemClick={this.onItemClick}/>
				<DailyScheduleBody
					detailed={false}
					model={this.props.model}/>

			<button onClick={() => this.state.model.changeView(ViewType.MAIN)}>Back to Main</button>
			<button onClick={() => this.state.model.changeView(ViewType.DAILY_SCHEDULE)}>Schedule</button>
			</div>
		);
	}
}

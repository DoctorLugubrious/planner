import React, {ChangeEvent} from 'react'
import GoalDisplay from '../goals/GoalDisplay'
import viewProps from "../data/viewProps";
import DailyGoal from "../../model/DailyGoal";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import ReoccurringWeeklyEvent from "../../model/ReoccurringWeeklyEvent";
import {ScheduledEvent} from "../../model/ScheduledEvent";



export default class DailyEventsView extends React.Component<viewProps, viewState> {
	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}


	listener: Listener;

	getValidEvents() {
		console.log(this.state.model.dailyGoals);
		return this.state.model.dailyGoals.filter((event :any) => (event.start === ""));
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
			<ul>
				{this.getValidEvents().map((event: DailyGoal|ScheduledEvent, index: number) => (
					<div key={index}>
						<GoalDisplay
							name={event.name} 
							assignGoal={this.onItemClick}
							deleteGoal={() => {
									if (event.hasOwnProperty("completed")) {
										let dailyEvent: DailyGoal = event as DailyGoal;
										this.state.model.deleteDailyGoal(dailyEvent);
									}
								}

							}
							date={this.state.model.date}/>
					</div>
				))}
			</ul>

			<input type="text" onChange={this.textChange}/>
			<button onClick={() => {
				this.state.model.addDailyGoal({name: this.newGoalName, completed: false, start: ""});
			}}>+</button>

			<button onClick={() => this.state.model.changeView(ViewType.MAIN)}>Back to Main</button>
			<button onClick={() => this.state.model.changeView(ViewType.DAILY_SCHEDULE)}>Schedule</button>
			</div>
		);
	}
}

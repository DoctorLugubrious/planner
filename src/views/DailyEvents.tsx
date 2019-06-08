import React from 'react'
import DailyEventsPresenter from '../presenters/DailyEvents'
import Goal from './Goal'
import Model from "../model/Model";
import {any} from "prop-types";
import viewProps from "./data/viewProps";
import dailyGoal from "../model/dailyGoal";

export default class DailyEventsView extends React.Component<viewProps, object> {
	private presenter: DailyEventsPresenter;

	constructor(props: viewProps) {
		super(props);
		this.presenter = new DailyEventsPresenter(this, props.model);
		this.state = {
			events: this.presenter.getEvents(),
		};
	}

	state: {events: dailyGoal[]};

	getValidEvents() {
		return this.state.events.filter((event :any) => (event.start === null));
	}

	onChange = () => {
		this.setState({events: this.presenter.getEvents()});
	};

	onItemClick = (name: string, start: string, end: string) => {
		this.presenter.assignEvent(name, start, end);
	};

	render = () => {
		return (<div>
			<p>Daily Events</p>
			<ul>
				{this.getValidEvents().map((event: dailyGoal, index: number) => (
					<div key={index}>
						<Goal 
							name={event.name} 
							handleClick={this.onItemClick}
						/>
					</div>
				))}
			</ul>
			<button onClick={() => this.presenter.onChangeView("MAIN")}>Back to Main</button>
			<button onClick={() => this.presenter.onChangeView("DAILY SCHEDULE")}>Schedule</button>
			</div>
		);
	}
}

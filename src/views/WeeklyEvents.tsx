import React from 'react'
import WeeklyEventsPresenter from '../presenters/WeeklyEvents'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
import reoccurringWeeklyGoal from "../model/reoccurringWeeklyGoal";
export default class WeeklyEventsView extends React.Component<viewProps, object> {

	constructor(props:viewProps) {
		super(props);
		this.presenter = new WeeklyEventsPresenter(this, props.model);
		this.state = {	
			events: this.presenter.events(),
		};
	}

	presenter:WeeklyEventsPresenter;
	state: {events:reoccurringWeeklyGoal[]};

	onChange = () => {
		this.setState({events: this.presenter.events()});
	};

	render = () => {
		return (<div>
			<p>Weekly Events</p>
			<ul>
				{this.state.events.map((event, index) => {
					let days = "";
					for(let day of event.days) {
						days += day;
					}
					return <li>{event.name} ({days} at {event.start})
						<button onClick={() => this.presenter.deleteEvent(event.name)}>Delete</button>
						</li>
				})}
			</ul>
			<button onClick={() => this.presenter.onChangeView("ADD EVENT")}>Add Event</button>
			<button onClick={() => this.presenter.onChangeView("MAIN")}>Back</button>
		</div>);
	}
}

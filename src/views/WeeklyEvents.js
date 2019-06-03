import React from 'react'
import WeeklyEventsPresenter from '../presenters/WeeklyEvents.js'
export default class WeeklyEventsView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new WeeklyEventsPresenter(this, props.model);
		this.state = {	
			events: this.presenter.events(),
		};
	}

	onChange = () => {
		this.setState({events: this.presenter.events()});
	}

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

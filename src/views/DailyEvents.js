import React from 'react'
import DailyEventsPresenter from '../presenters/DailyEvents.js'
import Goal from './Goal.js'

export default class DailyEventsView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new DailyEventsPresenter(this, props.model);
		this.state = {
			events: this.presenter.getEvents(),
		};
	}

	getValidEvents() {
		return this.state.events.filter(event => (event.start === null));
	}

	onChange = () => {
		this.setState({events: this.presenter.getEvents()});
	}

	onItemClick = (name, start, end) => {
		this.presenter.assignEvent(name, start, end);
	}

	render = () => {
		return (<div>
			<p>Daily Events</p>
			<ul>
				{this.getValidEvents().map((event, index) => (
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

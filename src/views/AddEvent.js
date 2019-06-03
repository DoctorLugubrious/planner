import React from 'react'
import AddEventPresenter from '../presenters/AddEvent.js'
export default class AddEventView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new AddEventPresenter(this, props.model);
		this.state = {};
	}

	render = () => {
		return (<div>
			<p>Add Event</p>
			<button onClick={() => this.presenter.onChangeView("WEEKLY EVENTS")}>Done</button>
		</div>);
	}
}

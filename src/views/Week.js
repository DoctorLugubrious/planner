import React from 'react'
import WeekPresenter from '../presenters/Week.js'
export default class WeekView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new WeekPresenter(this, props.model);
		this.state = {};
	}

	render = () => {
		return(<div>
			<p>Weekly Plan</p>
			<button onClick={() => this.presenter.onChangeView("MAIN")}>done</button>
		</div>);
	}
}

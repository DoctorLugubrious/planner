import React from 'react'
import GoalsPresenter from '../presenters/Goals.js'
export default class GoalsView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new GoalsPresenter(this, props.model);
		this.state = {};
	}

	render = () => {
		return (<div>
			<p>Goals</p>
			<button onClick={() => this.presenter.onChangeView("ADD GOAL")}>Add Goal</button>
			<button onClick={() => this.presenter.onChangeView("DECOMPOSE")}>Plan Goal</button>
			<button onClick={() => this.presenter.onChangeView("MAIN")}>done</button>
		</div>);
	}
}

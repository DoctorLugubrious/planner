import React from 'react'
import AddGoalPresenter from '../presenters/AddGoal.js'
export default class AddGoalView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new AddGoalPresenter(this, props.model);
		this.state = {};
	}

	render = () => {
		return (<div>
			<p>Add a goal</p>
			<button onClick={() => this.presenter.onChangeView("GOALS")}>done</button>
		</div>);
	}
}

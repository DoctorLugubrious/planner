import React from 'react'
import DecomposePresenter from '../presenters/Decompose.js'
export default class DecomposeView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new DecomposePresenter(this, props.model);
		this.state = {};
	}

	render = () => {
		return (<div>
			<p>Decompose a Goal</p>
			<button onClick={() => this.presenter.onChangeView("GOALS")}>done (goals)</button>
			<button onClick={() => this.presenter.onChangeView("YEARLY")}>done (year)</button>
			<button onClick={() => this.presenter.onChangeView("MONTHLY")}>done (month)</button>
		</div>);
	}
}

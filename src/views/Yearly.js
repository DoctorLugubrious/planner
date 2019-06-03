import React from 'react'
import YearlyPresenter from '../presenters/Yearly.js'
export default class YearlyView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new YearlyPresenter(this, props.model);
		this.state = {};
	}

	render = () => {
		return (<div>
			<p>Yearly Goals</p>
			<button onClick={() => this.presenter.onChangeView("DECOMPOSE")}>Select Goal</button>
			<button onClick={() => this.presenter.onChangeView("MONTHLY")}>done</button>
		</div>);
	}
}

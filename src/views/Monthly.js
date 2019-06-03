import React from 'react'
import MonthlyPresenter from '../presenters/Monthly.js'
export default class MonthlyView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new MonthlyPresenter(this, props.model);
		this.state = {};
	}

	render = () => {
		return(<div>
			<p>Monthly View</p>
			<button onClick={() => this.presenter.onChangeView("DECOMPOSE")}>Select goal</button>
			<button onClick={() => this.presenter.onChangeView("CONTINUOUS")}>done</button>
		</div>);
	}
}

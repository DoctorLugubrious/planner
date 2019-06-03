import React from 'react'
import ContinuousPresenter from '../presenters/Continuous.js'
export default class ContinuousView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new ContinuousPresenter(this, props.model);
		this.state = {};
	}

	render = () => {
		return (<div>
			<p>Edit Continuous Goals</p>
			<button onClick={() => this.presenter.onChangeView("WEEK")}>done</button>
		</div>);
	}
	
}

import React from 'react'
import ContinuousPresenter from '../presenters/Continuous'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
export default class ContinuousView extends React.Component<viewProps, object> {
	private presenter: ContinuousPresenter;

	constructor(props: viewProps) {
		super(props);
		this.presenter = new ContinuousPresenter(props.model);
		this.state = {};
	}

	render = () => {
		return (<div>
			<p>Edit Continuous Goals</p>
			<button onClick={() => this.presenter.onChangeView("WEEK")}>done</button>
		</div>);
	}
	
}

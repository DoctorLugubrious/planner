import React from 'react'
import DecomposePresenter from '../presenters/Decompose'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
export default class DecomposeView extends React.Component<viewProps, object> {

	constructor(props: viewProps) {
		super(props);
		this.presenter = new DecomposePresenter(props.model);
		this.state = {};
	}

	presenter: DecomposePresenter;

	render = () => {
		return (<div>
			<p>Decompose a Goal</p>
			<button onClick={() => this.presenter.onChangeView("GOALS")}>done (goals)</button>
			<button onClick={() => this.presenter.onChangeView("YEARLY")}>done (year)</button>
			<button onClick={() => this.presenter.onChangeView("MONTHLY")}>done (month)</button>
		</div>);
	}
}

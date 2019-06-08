import React from 'react';
import GoalsPresenter from '../presenters/Goals';
import viewProps from "./data/viewProps";
export default class GoalsView extends React.Component<viewProps, object> {

	constructor(props: viewProps) {
		super(props);
		this.presenter = new GoalsPresenter(props.model);
		this.state = {};
	}
	presenter: GoalsPresenter;

	render = () => {
		return (<div>
			<p>Goals</p>
			<button onClick={() => this.presenter.onChangeView("ADD GOAL")}>Add Goal</button>
			<button onClick={() => this.presenter.onChangeView("DECOMPOSE")}>Plan Goal</button>
			<button onClick={() => this.presenter.onChangeView("MAIN")}>done</button>
		</div>);
	}
}

import React from 'react'
import AddGoalPresenter from '../presenters/AddGoal'
import Presenter from "../presenters/Presenter";
import viewProps from "./data/viewProps";
export default class AddGoalView extends React.Component<viewProps, object> {

	constructor(props: viewProps) {
		super(props);
		this.presenter = new AddGoalPresenter(props.model);
		this.state = {};
	}

	private presenter: Presenter;

	render = () => {
		return (<div>
			<p>Add a goal</p>
			<button onClick={() => this.presenter.onChangeView("GOALS")}>done</button>
		</div>);
	}
}

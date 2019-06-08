import React from 'react'
import WeekPresenter from '../presenters/Week'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
export default class WeekView extends React.Component<viewProps, object> {

	constructor(props: viewProps) {
		super(props);
		this.presenter = new WeekPresenter(props.model);
		this.state = {};
	}

	presenter: WeekPresenter;

	render = () => {
		return(<div>
			<p>Weekly Plan</p>
			<button onClick={() => this.presenter.onChangeView("MAIN")}>done</button>
		</div>);
	}
}

import React from 'react'
import YearlyPresenter from '../presenters/Yearly'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
export default class YearlyView extends React.Component<viewProps, object> {

	constructor(props:viewProps) {
		super(props);
		this.presenter = new YearlyPresenter(props.model);
		this.state = {};
	}

	presenter: YearlyPresenter;

	render = () => {
		return (<div>
			<p>Yearly Goals</p>
			<button onClick={() => this.presenter.onChangeView("DECOMPOSE")}>Select Goal</button>
			<button onClick={() => this.presenter.onChangeView("MONTHLY")}>done</button>
		</div>);
	}
}

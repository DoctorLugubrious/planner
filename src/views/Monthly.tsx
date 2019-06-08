import React from 'react'
import MonthlyPresenter from '../presenters/Monthly'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
export default class MonthlyView extends React.Component<viewProps, object> {

	constructor(props:viewProps) {
		super(props);
		this.presenter = new MonthlyPresenter(props.model);
		this.state = {};
	}

	presenter: MonthlyPresenter;

	render = () => {
		return(<div>
			<p>Monthly View</p>
			<button onClick={() => this.presenter.onChangeView("DECOMPOSE")}>Select goal</button>
			<button onClick={() => this.presenter.onChangeView("CONTINUOUS")}>done</button>
		</div>);
	}
}

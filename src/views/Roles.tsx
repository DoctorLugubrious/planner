import React from 'react'
import RolesPresenter from '../presenters/Roles'
import Model from "../model/Model";
import viewProps from "./data/viewProps";
export default class RolesView extends React.Component<viewProps, object> {

	constructor(props:viewProps) {
		super(props);
		this.presenter = new RolesPresenter(props.model);
		this.state = {};
	}

	presenter: RolesPresenter;

	render = () => {
		return (<div>
			<p>Roles</p>
			<button onClick={() => this.presenter.onChangeView("MAIN")}>Back to Main</button>
		</div>);
	}
}

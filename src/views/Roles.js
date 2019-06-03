import React from 'react'
import RolesPresenter from '../presenters/Roles.js'
export default class RolesView extends React.Component {

	constructor(props) {
		super(props);
		this.presenter = new RolesPresenter(this, props.model);
		this.state = {};
	}

	render = () => {
		return (<div>
			<p>Roles</p>
			<button onClick={() => this.presenter.onChangeView("MAIN")}>Back to Main</button>
		</div>);
	}
}

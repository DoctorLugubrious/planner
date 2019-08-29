import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import StringInput from "../input/StringInput";


export default class RolesView extends React.Component<viewProps, viewState> {

	private originalSize: number;

	constructor(props:viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalSize = props.model.roles.length;
	}

	addRoles = (newRole: string) => {
		this.props.model.addRole(newRole);
	};

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let newSize = nextProps.model.roles.length;
		if (newSize === this.originalSize) {
			return false;
		}

		this.originalSize = newSize;
		return true;
	}

	listener: Listener;

	render = () => {
		return (<div>
			<p>Roles</p>
			<ol>
			{this.props.model.roles.map((role: string, index: number) => (
				<li key ={index}>
					{role}
					<button onClick={() => this.props.model.deleteRole(role)}>DELETE</button>
				</li>
			))}
			</ol>
			<StringInput onFinish={this.addRoles} buttonName="Add Role"/>
			<button onClick={() => this.state.model.changeView(ViewType.MAIN)}>Back to Main</button>
		</div>);
	}
}

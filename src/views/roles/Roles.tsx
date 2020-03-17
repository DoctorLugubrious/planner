import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import StringInput from "../input/StringInput";
import {FiHome, FiPlus, FiTrash} from "react-icons/all";
import './roles.css'


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

			<button style={{'margin': '16px'}} onClick={() => this.state.model.changeView(ViewType.MAIN)}><FiHome/></button>
			<h1>Roles</h1>

			<ol className={'roles'}>
			{this.props.model.roles.map((role: string, index: number) => (
				<li key={index} className={'role'}>
					{role}
					<button onClick={() => this.props.model.deleteRole(role)} className={'deleteButton'}><FiTrash/></button>
				</li>
			))}
			</ol>
			<StringInput onFinish={this.addRoles} buttonName={<FiPlus/>}/>
		</div>);
	}
}

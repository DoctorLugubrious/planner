import React from 'react'
import viewProps from "../data/viewProps";
import Listener from "../Listener";
import {viewState} from "../data/viewState";

interface ErrorViewState {
	message: string;
}


export default class ErrorView extends React.Component<viewProps, ErrorViewState> {
	constructor(props: viewProps) {
		super(props);
		props.model.errorMessageChanged = this.setMessage;
		this.state = {
			message: "",
		}
	}

	setMessage = () => {
		this.setState({message: this.props.model.errorMessage});
	};

	render() {
		let message = this.state.message;
		if (message !== "") {
			return (<div>
				ERROR: {message}
			</div>)
		}
		return null;
	}
}

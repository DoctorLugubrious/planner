import React from 'react'

interface ErrorViewProps {
	message: string;
}

interface ErrorViewState {
}

export default class ErrorView extends React.Component<ErrorViewProps, ErrorViewState> {
	render() {
		let message = this.props.message;
		if (message !== "") {
			return (<div>
				ERROR: {message}
			</div>)
		}
		return null;
	}
}
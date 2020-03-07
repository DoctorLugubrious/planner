import React from 'react'
import ChangeViewButton from "./buttons/ChangeViewButton";
import {ViewType} from "./ViewTypes";
import viewProps from "./data/viewProps";
import {viewState} from "./data/viewState";
import Listener from "./Listener";



export default class TutorialView extends React.Component<viewProps, viewState> {
	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}

	private listener: Listener;

	render() {
		return (<div>
			<h1>Welcome to Rubidium!</h1>
			<p>At any time, you can press the button with the bird down in the bottom right and she will explain
			the current screen. Happy planning!</p>
			<ChangeViewButton model={this.state.model} view={ViewType.MAIN} text="PROCEED"/>
		</div>)
	}
}
import viewProps from "../data/viewProps";
import {viewState} from "../data/viewState";
import * as React from "react";
import Listener from "../Listener";
import EditScheduledEventComponent from "./EditScheduledEventComponent";
import {ViewType} from "../ViewTypes";

export default class EditScheduledEvent extends React.Component<viewProps, viewState> {
	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}

	private listener: Listener;

	render() {
		return (<div>
			<h2>Edit Scheduled Event</h2>
			<EditScheduledEventComponent
				post={(event, oldName) => {
					this.state.model.updateScheduledEvent(event, oldName);
					this.state.model.changeView(ViewType.DAILY_SCHEDULE);
				}}
				text="EDIT"
			event={this.state.model.currentEvent}/>
		</div>)
	}

}
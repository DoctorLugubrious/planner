import {viewState} from "../data/viewState";
import viewProps from "../data/viewProps";
import * as React from "react";
import {ScheduledEvent} from "../../model/ScheduledEvent";
import EditScheduledEventComponent from "../schedule/EditScheduledEventComponent";
import ChangeViewButton from "../buttons/ChangeViewButton";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";

interface ScheduledEventsState extends viewState{
	editing: ScheduledEvent|null;
}

export default class AddScheduledEventView extends React.Component<viewProps, ScheduledEventsState> {

	constructor(props: viewProps) {
		super(props);
		this.state = {
			model: props.model,
			editing: null,
		};
		this.listener = new Listener(this);
	}

	private listener: Listener;

	add = () => {
		this.state.model.addScheduledEvent({
			name: this.name,
			date: new Date(this.date + "T" + this.time),
			len: Number(this.len),
		})
	};

	beginEdit = (event: ScheduledEvent|null) => {
		this.setState({editing: event});
	};


	private name: string = "";
	private date: string = "";
	private time: string = "";
	private len: string = "";



	render() {
		let model = this.state.model;
		return (<div>
			<h1>Add Scheduled Event</h1>

			<h2>add new:</h2>
			<EditScheduledEventComponent
				post={model.addScheduledEvent}
				text="ADD"/>
			<ChangeViewButton model={this.state.model} view={ViewType.MAIN} text="Back to main"/>

		</div>);
	}
}
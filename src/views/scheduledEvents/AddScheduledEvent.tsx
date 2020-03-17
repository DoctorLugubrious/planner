import {viewState} from "../data/viewState";
import viewProps from "../data/viewProps";
import * as React from "react";
import {ScheduledEvent} from "../../goalData/ScheduledEvent";
import EditScheduledEventComponent from "./EditScheduledEventComponent";
import ChangeViewButton from "../buttons/ChangeViewButton";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {FiHome} from "react-icons/all";

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


	private name: string = "";
	private date: string = "";
	private time: string = "";
	private len: string = "";



	render() {
		let model = this.state.model;
		return (<div className={'addScheduledEvent'}>
			<ChangeViewButton model={this.state.model} view={ViewType.MAIN} text={<FiHome/>}/>
			<h1>Add Scheduled Event</h1>
			<EditScheduledEventComponent
				post={model.addScheduledEvent}
				text="ADD"/>

		</div>);
	}
}

import * as React from "react";
import {ChangeEvent} from "react";
import {ScheduledEvent} from "../../goalData/ScheduledEvent";
import FormatDate from "../../utility/datesAndTimes/FormatDate";
import {FormatTime} from "../../utility/datesAndTimes/FormatTime";

import './scheduledEventEdit.css'

interface ScheduledEventProps {
	post: (event: ScheduledEvent, oldName: string) => void;
	text: string;
	event?:ScheduledEvent;
	onSubmit?: () => void;
}

interface ScheduledEventState {
	name: string
	date: string
	time: string;
	len: string;
}

export default class EditScheduledEventComponent extends React.Component<ScheduledEventProps, ScheduledEventState> {

	constructor(props: ScheduledEventProps) {
		super(props);
		this.state = {
			name: "",
			date: "",
			time: "",
			len: ""
		};
		if (props.event) {
			let event = props.event;
			this.state = {
				name: event.name,
				date: FormatDate(event.date),
				time: FormatTime(event.date, false),
				len: event.len.toString()
			}
		}
	}


	changeName = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({name: e.target.value});
	};

	changeDate = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({date: e.target.value});
	};

	changeTime = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({time: e.target.value});
	};

	changeLength = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({len: e.target.value});
	};



	post = () => {
		if (!this.props.event) {
			this.setState({
				name: "",
				date: "",
				time: "",
				len: ""
			});
		}

		if (this.props.onSubmit) {
			this.props.onSubmit();
		}

		let event = {
			name: this.state.name,
			date: new Date((this.state.date + " " + this.state.time).replace(/-/g, '/')),
			len: Number(this.state.len),
		};
		if (this.props.event != undefined) {
			this.props.post(event, this.props.event.name);
		}
		else {
			this.props.post(event, "");
		}
	};

	render() {
		return (<div className={'scheduledEventEdit'}>
			<h3>name</h3>
			<input type="text" onChange={this.changeName} value={this.state.name}/>
			<h3>date</h3>
			<input type="date" onChange={this.changeDate} value={this.state.date}/>
			<h3>time</h3>
			<div className={'timeInput'}>
				At <input type="time"  step="300" onChange={this.changeTime} value={this.state.time}/>
				for
				<input type="number" onChange={this.changeLength} value={this.state.len}/>
				minutes
			</div>
			<button onClick={this.post}>{this.props.text}</button>


		</div>);
	}
}

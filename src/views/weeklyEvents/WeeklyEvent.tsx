import React, {ChangeEvent} from 'react'
import viewProps from "../data/viewProps";
import ReoccurringWeeklyEvent from "../../goalData/ReoccurringWeeklyEvent";
import FormatDate from "../../utility/datesAndTimes/FormatDate";
import {FormatTimeFromString} from "../../utility/datesAndTimes/FormatTime";

interface WeeklyEventViewProps extends viewProps {
	onSubmit ?: () => void;
	event ?: ReoccurringWeeklyEvent;
}

interface WeeklyEventViewState {
	name: string;
	days: string[];
	len: number;
	start: string;
}

export default class WeeklyEventView extends React.Component<WeeklyEventViewProps, WeeklyEventViewState> {

	static dayOptions = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

	constructor(props: WeeklyEventViewProps) {
		super(props);
		if (props.event !== undefined) {
			this.state = {
				name: props.event.name,
				days: props.event.days,
				len: props.event.len,
				start: props.event.start,
			}
		}
		else {
			this.state = {
				name: "",
				days: [],
				len: 0,
				start: "",
			};
		}
	}

	changeName = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({name: e.target.value});
	};

	changeDays = (e: ChangeEvent<HTMLSelectElement>) => {
		let options = e.target.options;
		let days = [];
		for (let i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				days.push(options[i].value);
			}
		}
		this.setState({days: days});
	};

	changeStart = (e: ChangeEvent<HTMLInputElement>) => {

		console.log(e.target.value);
		this.setState({start: e.target.value});
	};

	changeLength = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({len: Number(e.target.value)});
	};


	get add() {
		return this.props.event === undefined;
	}


	post = () => {
		let result: ReoccurringWeeklyEvent = {
			name: this.state.name,
			days: this.state.days,
			len: this.state.len,
			start: FormatTimeFromString(this.state.start, true)
		};



		if (this.add) {
			this.props.model.addWeeklyEvent(result);
			this.setState({
				name: "",
				days: [],
				start: "",
				len: 0
			});
		}
		else {
			// @ts-ignore
			this.props.model.updateWeeklyEvent(result, this.props.event.name);
		}

		if (this.props.onSubmit) {
			this.props.onSubmit();
		}
	};

	render() {
		let buttonText = "";

		if (this.add) {
			buttonText = "ADD";
		}
		else {
			buttonText = "SAVE";
		}

		return (<div>
			<h3>name</h3>
			<input type="text" onChange={this.changeName} value={this.state.name}/>
			<h3>days</h3>
			<select onChange={this.changeDays} multiple={true} value={this.state.days}>
				{WeeklyEventView.dayOptions.map(value => <option key={value}>{value}</option>)}
			</select>
			<h3>start</h3>
			<input type="time" onChange={this.changeStart} value={this.state.start}/>
			<h3>length</h3>
			<input type="number" onChange={this.changeLength} value={this.state.len}/>
			<button onClick={this.post}>{buttonText}</button>

		</div>);
	}
}

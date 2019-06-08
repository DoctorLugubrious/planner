import Calendar from 'react-calendar/dist/entry.nostyle'
import React from 'react'
import CalendarPresenter from '../presenters/Calendar'
import Model from "../model/Model";
import Presenter from "../presenters/Presenter";
import {type} from "os";
import viewProps from "./data/viewProps";

export default class CalendarView extends React.Component<viewProps, object> {
	constructor(props: viewProps) {
		super(props);
		this.state = {
			date: props.model.date,
		};
		this.presenter = new CalendarPresenter(this, props.model);
	}

	private presenter: CalendarPresenter;
	state: {date: Date};

	onChangeDate = (date: Date) => {
		this.setState({
			date: date,
		});
		this.presenter.onChangeView("DAILY SCHEDULE");
	};

	changeDate = (date: Date | Date[]) => {
		const presenter = this.presenter;
		if (date instanceof Date) {
			presenter.onChangeDate(date);
		}
	};

	render() {
		let date = this.state.date;
		return (
			<div>
				<Calendar
					onChange={(date) => this.changeDate(date)}
					value={date}
				/>
			</div>
		);
	}
}

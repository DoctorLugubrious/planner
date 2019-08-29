import Calendar from 'react-calendar/dist/entry.nostyle'
import React from 'react'
import viewProps from "../data/viewProps";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import {ViewType} from "../ViewTypes";


export default class CalendarView extends React.Component<viewProps, viewState> {
	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}


	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		//MAY NOT WORK...?
		return false;
	}

	listener: Listener;

	changeDate = (date: Date | Date[]) => {
		if (date instanceof Date) {
			this.state.model.date = date;
			this.state.model.changeView(ViewType.DAILY_SCHEDULE);
		}
	};

	render() {
		let date = this.state.model.date;
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

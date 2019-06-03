import Calendar from 'react-calendar/dist/entry.nostyle'
import React from 'react'
import CalendarPresenter from '../presenters/Calendar.js'

export default class CalendarView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: props.model.date,
		}
		this.presenter = new CalendarPresenter(this, props.model);
	}

	onChangeDate = (date) => {
		this.setState({
			date: date,
		});
		this.presenter.onChangeView("DAILY SCHEDULE");
	}

	changeDate = (date) => {
		const presenter = this.presenter;
		presenter.onChangeDate(date);
	}

	render() {
		let date = this.state.date;
		return (
			<div>
				<Calendar
					onChange={this.changeDate}
					value={date}
				/>
			</div>
		);
	}
}

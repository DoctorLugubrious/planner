import React from 'react'
import Model from "../../model/Model";
import Goal from "../../goalData/Goal";
import FormatDate from "../../utility/datesAndTimes/FormatDate";
import GetDay from "../../utility/datesAndTimes/GetDay";

interface WeeklyAssignedDaysProps {
	model: Model;
}

interface WeeklyAssignedDaysState {
}

export default class WeeklyAssignedDays extends React.Component<WeeklyAssignedDaysProps, WeeklyAssignedDaysState> {
	private get weeklyGoalNumbers() : Map<string, number> {
		let result = new Map<string, number>();

		WeeklyAssignedDays.dates.forEach(date => {
			let goals = this.props.model.getDailyGoalsForDate(date);
			let count = 0;
			if (goals !== undefined) {
				count = goals.length;
			}

			let day = GetDay(date);

			result.set(day, count);
		});

		return result;
	}

	private static get dates() :Date[] {
		let day = new Date();
		day.setDate(day.getDate() + 1);
		const numDaysInWeek = 7;

		let result: Date[] = [];

		for (let i = 0; i < numDaysInWeek; ++i) {
			result.push(day);

			day = new Date(day);
			day.setDate(day.getDate() + 1);
		}

		return result;
	}

	render() {
		let result : JSX.Element[] = [];

		this.weeklyGoalNumbers.forEach((value, key) => {
			result.push(<div key={key} className="weeklyDay">
		            <div className={"day"}>{key}:</div><div className={"dayCount"}>{value}</div>
			</div>);
		});

		return (<div className="weeklyAssignedDays">
			<h2>Number of goals per day</h2>
			{result}
		</div>);
	}
}

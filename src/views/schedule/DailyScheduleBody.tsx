import DailyGoal from "../../model/DailyGoal";
import React from "react";
import range from "../../utility/Range";
import {ScheduledEvent} from "../../model/ScheduledEvent";
import ReoccurringWeeklyEvent from "../../model/ReoccurringWeeklyEvent";
import {viewState} from "../data/viewState";
import DailyGoalView from "./DailyGoalView";
import FormatTime from "../../utility/FormatTime";
import pad from "../../utility/Pad";
import ScheduledEventInfo from "./ScheduledEventInfo";
import Model from "../../model/Model";


const minOffset = 5;

function addAllMinutes(dst:any[], hour:number, suffix:string) {
	for(const minute of range(0, 60, minOffset)) {
		let minName = pad(minute, 2);
		let hourName = pad(hour, 2);
		let key = hourName + ":" + minName + suffix;
		dst.push(key);
	}
}

let generateGridStyle = (name: string, index: number) => {
	let area: string = name + index;
	return {gridArea: area};
};


interface DailyScheduleBodyProps {
	goals: DailyGoal[];
	events: ScheduledEvent[];
	reoccurringEvents: ReoccurringWeeklyEvent[];
	completeGoal: (goal: DailyGoal, oldName: string) => void;
	model: Model;
}

export default class DailyScheduleBody extends React.Component<DailyScheduleBodyProps, viewState> {

	addItem = (time: string,
		item: DailyGoal|ScheduledEvent|ReoccurringWeeklyEvent,
		array: (string|DailyGoal|ScheduledEvent|ReoccurringWeeklyEvent|null)[]) => {

		let index = array.findIndex(value => typeof(value) == "string" && value === time);
		if (index !== -1) {
			array.splice(index + 1, 0, item);
		}
		else if (time !== "") {
			console.log("TIME NOT FURNd: " + time, array);
		}
	};


	timeIndex: number = 0;
	eventIndex: number = 0;
	gridString: string = "";
	lastEventName: string|null = null;
	lastEventTime: number|undefined = undefined;

	generateGridElements = (schedule: (string|DailyGoal|ScheduledEvent|ReoccurringWeeklyEvent|null)[],
						 result: JSX.Element[]) => {

		schedule.forEach((event) => {

			if (typeof (event) == 'string') {
				let timeStyle = generateGridStyle("time", this.timeIndex);
				result.push(<div style={timeStyle} key={timeStyle.gridArea}>{event}</div>);

				this.gridString += '"';
				this.gridString += timeStyle.gridArea;
				this.gridString += ' ';

				++this.timeIndex;
			}
			else if (event === null) {
				if (this.lastEventName === null || this.lastEventTime === undefined) {
					this.gridString += '."';
				}
				else {
					this.gridString += this.lastEventName + '"';

					this.lastEventTime -= minOffset;
					if (this.lastEventTime <= 0) {
						this.lastEventTime = undefined;
						this.lastEventName = null;
					}
				}
			}
			else if (event.hasOwnProperty("completed")) {
				let itemStyle = generateGridStyle("event", this.eventIndex);
				result.push(<div style={itemStyle}><DailyGoalView event={event as DailyGoal}/></div>);

				this.updateGridItem(itemStyle, event);
			}
			else if (event.hasOwnProperty("date")) {
				let event2: ScheduledEvent = event as ScheduledEvent;
				let itemStyle = generateGridStyle("event", this.eventIndex);
				result.push(<div style={itemStyle} key={itemStyle.gridArea}>
					<ScheduledEventInfo model={this.props.model} event={event2}/>
				</div>);

				this.updateGridItem(itemStyle, event);
			}
			else if (event.hasOwnProperty("date")) {
				let itemStyle = generateGridStyle("event", this.eventIndex);
				result.push(<div style={itemStyle} key={itemStyle.gridArea}>
					{event.name}
				</div>);

				this.updateGridItem(itemStyle, event);
			}
		});
	};

	private updateGridItem(itemStyle:{gridArea: string}, event: DailyGoal|ScheduledEvent|ReoccurringWeeklyEvent) {
		this.gridString += itemStyle.gridArea + '"';
		this.lastEventName = itemStyle.gridArea;
		this.lastEventTime = event.len;
		if (this.lastEventTime != null) {
			this.lastEventTime -= minOffset;
			if (this.lastEventTime <= 0) {
				this.lastEventTime = undefined;
				this.lastEventName = null;
			}
		}
		++this.eventIndex;
	}

	cleanupArray = (array: (string|DailyGoal|ScheduledEvent|ReoccurringWeeklyEvent|null)[]) => {
		for(let i = 0; i < array.length; ++i) {
			let item = array[i];
			if (typeof(item) == "string") {
				if (i === array.length - 1 || typeof(array[i+1]) === 'string') {
					array.splice(i + 1, 0, null);
				}
			}
			else {
				if(i !== array.length - 1 && typeof(array[i+1]) !== 'string') {
					array.splice(i + 1, 1);
					--i;
				}
			}
		}
	};

	generateSchedule = () => {
		let schedule: (string|DailyGoal|ScheduledEvent|ReoccurringWeeklyEvent|null)[] = [];
		for(const hour of range(5, 12)) {
			addAllMinutes(schedule, hour, 'am');
		}
		addAllMinutes(schedule, 12, 'pm');
		for(const hour of range(1, 9)) {
			addAllMinutes(schedule, hour, 'pm');
		}

		this.props.goals.forEach(value => {
			this.addItem(value.start, value, schedule);
		});

		this.props.events.forEach(value => {
			this.addItem(FormatTime(value.date, true), value, schedule);
		});

		this.props.reoccurringEvents.forEach(value => {
			this.addItem(value.start, value, schedule);
		});

		this.cleanupArray(schedule);

		return schedule;
	};

	render() {
		let schedule = this.generateSchedule();
		let result: JSX.Element[] = [];

		this.generateGridElements(schedule, result);

		let mainStyle = {
			display: 'grid',
			gridTemplateAreas: this.gridString,
		};
		return (<div style={mainStyle}>
			{result}
		</div>);
	}
};

import DailyGoal from "../../goalData/DailyGoal";
import React from "react";
import range from "../../utility/numbers/Range";
import {ScheduledEvent} from "../../goalData/ScheduledEvent";
import ReoccurringWeeklyEvent from "../../goalData/ReoccurringWeeklyEvent";
import {viewState} from "../data/viewState";
import DailyGoalView from "./DailyGoalView";
import {FormatTime} from "../../utility/datesAndTimes/FormatTime";
import pad from "../../utility/numbers/Pad";
import ScheduledEventInfo from "../scheduledEvents/ScheduledEventInfo";
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
	model: Model;
	detailed: boolean;
}

export default class DailyScheduleBody extends React.Component<DailyScheduleBodyProps, viewState> {

	timeIndex: number = 0;
	eventIndex: number = 0;
	gridString: string = "";
	lastEventName: string | null = null;
	lastEventTime: number | undefined = undefined;
	lastTime: string = "";

	addItem = (time: string,
		item: DailyGoal|ScheduledEvent|ReoccurringWeeklyEvent,
		array: (string|DailyGoal|ScheduledEvent|ReoccurringWeeklyEvent|null)[]) => {

		let index = array.findIndex(value => typeof(value) == "string" && value === time);
		if (index !== -1) {
			array.splice(index + 1, 0, item);
		}
		else if (time !== "") {
			console.log("TIME NOT FURNd: " + time, item);
		}
	};

	generateGridElements = (schedule: (string|DailyGoal|ScheduledEvent|ReoccurringWeeklyEvent|null)[],
						 result: JSX.Element[]) => {

		schedule.forEach((event) => {

			if (typeof (event) == 'string') {
				if (this.props.detailed) {
					//this.AddTimeDetailed(result, event);
					this.AddTimeShort(result, event, 15);
				}
				else {
					this.AddTimeShort(result, event, 60);
				}
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
			else {
				if (this.props.detailed) {
					this.addEventDetailed(event, result);
				}
				else {
					this.addEventBlock(result, event.len);
				}
			}
		});
	};

	generateSchedule = () => {
		let schedule: (string | DailyGoal | ScheduledEvent | ReoccurringWeeklyEvent | null)[] = [];
		for (const hour of range(5, 12)) {
			addAllMinutes(schedule, hour, 'am');
		}
		addAllMinutes(schedule, 12, 'pm');
		for (const hour of range(1, 9)) {
			addAllMinutes(schedule, hour, 'pm');
		}



		this.props.model.scheduledEvents.forEach(value => {
			this.addItem(FormatTime(value.date, true), value, schedule);
		});

		this.props.model.getWeeklyEventsForDate().forEach(value => {
			this.addItem(value.start, value, schedule);
		});

		this.props.model.dailyGoals.forEach(value => {
			this.addItem(value.start, value, schedule);
		});

		this.cleanupArray(schedule);

		return schedule;
	};

	private AddTimeDetailed(result: JSX.Element[], event: string) {
		let timeStyle = generateGridStyle("time", this.timeIndex);
		result.push(<div style={timeStyle} key={timeStyle.gridArea} className='time'>{event}</div>);

		this.gridString += '"';
		this.gridString += timeStyle.gridArea;
		this.gridString += ' ';

		++this.timeIndex;
	}

	private AddTimeShort(result: JSX.Element[], event: string, gap: number) {
		const offset = gap / minOffset;

		if (this.timeIndex % offset == 0) {
			let timeStyle = generateGridStyle("time", this.timeIndex);
			this.lastTime = timeStyle.gridArea;

			result.push(<div style={timeStyle} key={timeStyle.gridArea} className={'time'}>{event}</div>);
		}

		this.gridString += '"';
		this.gridString += this.lastTime;
		this.gridString += ' ';
		++this.timeIndex;
	}

	private addEventBlock(result: JSX.Element[], len: number | undefined) {
		let itemStyle = generateGridStyle("event", this.eventIndex);
		result.push(<div style={itemStyle} className="block" key={this.eventIndex}><p></p></div>);
		this.updateGridItem(itemStyle, {len});
	}

	private addEventDetailed(event: DailyGoal | ScheduledEvent | ReoccurringWeeklyEvent, result: JSX.Element[]) {
		if (event.hasOwnProperty("completed")) {
			let itemStyle = generateGridStyle("event", this.eventIndex);
			result.push(<div style={itemStyle} key={this.eventIndex} className='scheduleGoal'><DailyGoalView
				event={event as DailyGoal}
				complete={this.props.model.updateDailyGoal}
			/></div>);

			this.updateGridItem(itemStyle, event);
		}
		else if (event.hasOwnProperty("date")) {
			let event2: ScheduledEvent = event as ScheduledEvent;
			let itemStyle = generateGridStyle("event", this.eventIndex);
			result.push(<div style={itemStyle} key={itemStyle.gridArea} className='scheduledEvent'>
				<ScheduledEventInfo model={this.props.model} event={event2}/>
			</div>);

			this.updateGridItem(itemStyle, event);
		}
		else {
			let itemStyle = generateGridStyle("event", this.eventIndex);
			result.push(<div style={itemStyle} key={itemStyle.gridArea} className={'event'}>
				{event.name}
			</div>);

			this.updateGridItem(itemStyle, event);
		}
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

	private updateGridItem(itemStyle: { gridArea: string }, event: { len?: number }) {
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

	render() {
		let schedule = this.generateSchedule();
		let result: JSX.Element[] = [];

		this.timeIndex = 0;
		this.eventIndex = 0;
		this.gridString = "";
		this.lastEventName = null;
		this.lastEventTime = undefined;
		this.lastTime = "";

		this.generateGridElements(schedule, result);
		let mainStyle = {
			display: 'grid',
			gridTemplateAreas: this.gridString,
		};
		return (<div style={mainStyle} className={'scheduleBody'}>
			{result}
		</div>);
	}
};

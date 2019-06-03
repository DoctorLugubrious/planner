import React from 'react'
import range from '../utility/Range.js'
import './DailySchedule.css'
import Pos from '../utility/Pos.js'

function addAllMinutes(dst, hour, suffix) {
	let key = hour + suffix;
	dst.set(key, new Map());
	for(const minute of range(0, 60, 10)) {
		let minName = ("00" + minute).slice(-2);
		let val = "";
		dst.get(key).set(minName, val); 
	}
}

let generateSchedule = () => {
	let schedule = new Map();

	for(const hour of range(5, 12)) {
		addAllMinutes(schedule, hour, 'am');
	}
	addAllMinutes(schedule, 12, 'pm');
	for(const hour of range(1, 9)) {
		addAllMinutes(schedule, hour, 'pm');
	}
	return schedule;
}

let getTime = (x, y) => {
	let rowHeight = Pos("row0").height;
	let baseY = Pos("dailyCalendar").y;
	let yOffset = y - baseY;
	console.log(yOffset / rowHeight);
	return {hour: '6am', minute: '00'};
}

class DailySchedule extends React.Component {

	constructor(props) {
		super(props);
		console.log(props.schedule);
	}

	generateHeader = () => {
		let res = [];
		for(const minute of range(0, 60, 10)) {
			let minName = ("00" + minute).slice(-2);
			res.push(minName);
		}
		return (
			<thead>
				<tr>
				<th></th>
				{res.map((item, index) => (
					<th key={index}>{item}</th>	
				))}
				</tr>
			</thead>
		);
	}

	generateBody = () => {
		let items = [];
		this.props.schedule.forEach((hourInfo, hourName) => {
			items.push([]);
			let last = items[items.length - 1];
			last.push(hourName);
			hourInfo.forEach((task, minute) => {
				last.push(task);
			});
		});
		return (<tbody>{
			items.map((row, i) => (
				<tr key={i} id={"row" + i}>
					{row.map((item, j) => (
						<td key={j} className={"column" + j}>
							{item}
						</td>
					))}
				</tr>
			))
		}</tbody>)
	}

	render = () => {
		let i = 0;
		let j = 0;
		return (
			<table className="dailyCalendar" id="dailyCalendar">
				{this.generateHeader()}
				{this.generateBody()}
			</table>
		);
	}
}

export {DailySchedule, generateSchedule, getTime};

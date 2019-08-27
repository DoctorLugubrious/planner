import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import DailyScheduleBody from "../schedule/DailyScheduleBody";


export default class DailyScheduleView extends React.Component<viewProps, viewState> {

	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}
	
	listener: Listener;

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		return true;
	}

	render = () => {
		let model = this.state.model;
		return (<div>
			<p>Daily Schedule</p>
			<div>
				<DailyScheduleBody
					model={model}
					detailed={true}
				/>
			</div>
			<button onClick={() => this.state.model.changeView(ViewType.MAIN)}>Back to Main</button>
			<button onClick={() => this.state.model.changeView(ViewType.DAILY_EVENTS)}>Plan</button>
			<button onClick={() => this.state.model.changeView(ViewType.CALENDAR)}>Calendar</button>
		</div>
		);
	}
}

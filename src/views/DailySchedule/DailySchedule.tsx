import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import DailyScheduleBody from "./DailyScheduleBody";
import ChangeDayButton from "./ChangeDayButton";
import FormatDate from "../../utility/datesAndTimes/FormatDate";
import '../dailyPlan/dailyPlan.css'
import {
	FiMinimize2
} from "react-icons/all";
import Model from "../../model/Model";
import DailyButtons from "./DailyButtons";



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
		return (<div className='planBox'>
				<div className='calendarBox'>
					<DailyButtons model={model} otherView={ViewType.DAILY_PLAN} otherViewIcon={<FiMinimize2/>}/>
					<h1 className="date">{FormatDate(model.date)}</h1>
					<div className="fullSchedule">
						<DailyScheduleBody
							model={model}
							detailed={true}
						/>
					</div>
					<h3 className="date">{FormatDate(model.date)}</h3>
					<DailyButtons model={model} otherView={ViewType.DAILY_PLAN} otherViewIcon={<FiMinimize2/>}/>
				</div>
			</div>
		);
	}
}

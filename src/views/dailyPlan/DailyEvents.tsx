import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import DailyScheduleBody from "../DailySchedule/DailyScheduleBody";
import EditDailyGoals from "./EditDailyGoals";
import './dailyPlan.css';
import {FiMaximize2} from "react-icons/all";
import DailyButtons from "../DailySchedule/DailyButtons";
import FormatDateHuman from "../../utility/datesAndTimes/FormatDateHuman";
import AddDailyGoal from "./AddDailyGoal";

export default class DailyPlanView extends React.Component<viewProps, viewState> {
	private originalUnassigned: number;


	listener: Listener;
	private originalAssigned: number;
	private originalDate: Date;

	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalUnassigned = this.getUnassignedEvents().length;
		this.originalAssigned = this.getAssignedEvents().length;
		this.originalDate = new Date(this.state.model.date);
	}

	getUnassignedEvents() {
		return this.state.model.dailyGoals.filter((event :any) => (event.start === ""));
	}

	getAssignedEvents() {
		return this.state.model.dailyGoals.filter((event: any) => (event.start !== ""));
	}

	onItemClick = (name: string, start: string, len: number) => {
		this.state.model.updateDailyGoal({name: name, start: start, len: len, completed: false}, name);
	};

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let newAssigned = this.getAssignedEvents().length;
		let newUnassigned = this.getUnassignedEvents().length;
		let newDate = this.state.model.date;
		if (newDate === this.originalDate && newAssigned === this.originalAssigned && newUnassigned === this.originalUnassigned) {
			return false;
		}

		this.originalUnassigned = newUnassigned;
		this.originalAssigned = newAssigned;
		this.originalDate = new Date(newDate);
		return true;
	}


	render = () => {
		let model = this.state.model;
		return (<div className="view">

			<div className="planBox">
				<div className="planSection">
					<DailyButtons model={this.props.model} otherView={ViewType.DAILY_SCHEDULE} otherViewIcon={<FiMaximize2/>}/>
					<h1 className="date">{FormatDateHuman(model.date)}</h1>
					<h2>Unassigned Goals</h2>
					<EditDailyGoals
						events={this.getUnassignedEvents()}
						date={this.state.model.date}
						deleteGoal={this.state.model.deleteDailyGoal}
						onItemClick={this.onItemClick}/>

					<AddDailyGoal onSubmit={model.addDailyGoal}/>

					<h2>Assigned Daily Goals</h2>
					<EditDailyGoals
						events={this.getAssignedEvents()}
						date={this.state.model.date}
						deleteGoal={this.state.model.deleteDailyGoal}
						onItemClick={this.onItemClick}/>
					<DailyScheduleBody
						detailed={false}
						model={this.props.model}/>
					<h3 className="date">{FormatDateHuman(model.date)}</h3>
					<DailyButtons model={this.props.model} otherView={ViewType.DAILY_SCHEDULE} otherViewIcon={<FiMaximize2/>}/>
				</div>


			</div>
		</div>
		);
	}
}

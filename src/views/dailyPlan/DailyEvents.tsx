import React, {ChangeEvent} from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import DailyScheduleBody from "../DailySchedule/DailyScheduleBody";
import EditDailyGoals from "./EditDailyGoals";
import FormatDate from "../../utility/datesAndTimes/FormatDate";
import './dailyPlan.css';
import {FiMaximize2} from "react-icons/all";
import DailyButtons from "../DailySchedule/DailyButtons";


export default class DailyPlanView extends React.Component<viewProps, viewState> {
	private originalUnassigned: number;


	listener: Listener;
	private originalAssigned: number;

	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalUnassigned = this.getUnassignedEvents().length;
		this.originalAssigned = this.getAssignedEvents().length;
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
		if (newAssigned === this.originalAssigned && newUnassigned === this.originalUnassigned) {
			return false;
		}

		this.originalUnassigned = newUnassigned;
		this.originalAssigned = newAssigned;
		return true;
	}

	textChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.newGoalName = e.target.value;
	};

	newGoalName: string = "";


	render = () => {
		let model = this.state.model;
		return (<div className="view">

			<div className="planBox">
				<div className="planSection">
					<DailyButtons model={this.props.model} otherView={ViewType.DAILY_SCHEDULE} otherViewIcon={<FiMaximize2/>}/>
					<h1 className="date">{FormatDate(model.date)}</h1>
					<h2>Unassigned Goals</h2>
					<EditDailyGoals
						events={this.getUnassignedEvents()}
						date={this.state.model.date}
						deleteGoal={this.state.model.deleteDailyGoal}
						onItemClick={this.onItemClick}/>
					<div className="addDailyGoal">
						<h2>Add New Daily Goal</h2>
						<div className={"hbox"}>
							<input type="text" onChange={this.textChange}/>
							<button className="add" onClick={() => {
								this.state.model.addDailyGoal({name: this.newGoalName, completed: false, start: ""});
							}}>+
							</button>
						</div>
					</div>

					<h2>Assigned Daily Goals</h2>
					<EditDailyGoals
						events={this.getAssignedEvents()}
						date={this.state.model.date}
						deleteGoal={this.state.model.deleteDailyGoal}
						onItemClick={this.onItemClick}/>
					<DailyScheduleBody
						detailed={false}
						model={this.props.model}/>
					<h3 className="date">{FormatDate(model.date)}</h3>
					<DailyButtons model={this.props.model} otherView={ViewType.DAILY_SCHEDULE} otherViewIcon={<FiMaximize2/>}/>
				</div>


			</div>
		</div>
		);
	}
}

import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import ReoccurringEvent from "./ReoccurringEvent";
import WeeklyEventView from "./WeeklyEvent";
import './weeklyEvents.css'
import {FiHome, FiEdit} from "react-icons/all";

interface WeeklyEventsViewState extends viewState {
	editingName: string;
}

export default class WeeklyEventsView extends React.Component<viewProps, WeeklyEventsViewState> {

	listener: Listener;

	constructor(props:viewProps) {
		super(props);
		this.listener = new Listener(this);
		this.state = {
			model: props.model,
			editingName: "",
		};
	}


	render = () => {
		return (<div>
			<button style={{'margin': '16px'}} onClick={() => this.state.model.changeView(ViewType.MAIN)}><FiHome/></button>
			<h1>Weekly Events</h1>
			<ul>
				{this.state.model.weeklyEvents.map((event, index) => {
					let result: JSX.Element[] = [];
					result.push(<ReoccurringEvent
						key={"event" + index}
						event={event}
						index={index}
						deleteEvent={this.state.model.deleteWeeklyEvent}/>);
					if (this.state.editingName === event.name) {
						result.push(<WeeklyEventView
							key={"EDIT" + index}
							model={this.state.model}
							onSubmit={() => this.setState({editingName: ""})}
							event={event}/>);
					}
					else {
						result.push(<div key={"button" + index}>
							<button
							        onClick={() => this.setState({editingName: event.name})}><FiEdit/></button>
						</div>);
					}

					return <li key={"item" + index} className={'eventItem'}>
						{result}
					</li>
				})}
			</ul>

			<h2>Add</h2>
			<WeeklyEventView model={this.state.model}/>
		</div>);
	}
}



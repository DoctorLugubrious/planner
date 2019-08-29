import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import ReoccurringEvent from "./ReoccurringEvent";
import WeeklyEventView from "./WeeklyEvent";

interface WeeklyEventsViewState extends viewState {
	editingName: string;
}

export default class WeeklyEventsView extends React.Component<viewProps, WeeklyEventsViewState> {

	private originalSize: number;


	listener: Listener;

	constructor(props:viewProps) {
		super(props);
		this.listener = new Listener(this);
		this.state = {
			model: props.model,
			editingName: "",
		};
		this.originalSize = props.model.weeklyEvents.length;
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let newSize = nextProps.model.weeklyEvents.length;
		if (newSize === this.originalSize) {
			return false;
		}

		this.originalSize = newSize;
		return true;
	}


	render = () => {
		return (<div>
			<p>Weekly Events</p>
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
						result.push(<div>
							<button key={"button" + index}
												 onClick={() => this.setState({editingName: event.name})}>EDIT</button>

						</div>);
					}

					return <li key={index}>
						{result}
					</li>
				})}
			</ul>
			<WeeklyEventView model={this.state.model}/>
			<button onClick={() => this.state.model.changeView(ViewType.MAIN)}>Back</button>
		</div>);
	}
}



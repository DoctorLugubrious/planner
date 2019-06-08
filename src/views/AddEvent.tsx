import React from 'react'
import AddEventPresenter from '../presenters/AddEvent'
import Presenter from "../presenters/Presenter";
import Model from "../model/Model";
import viewProps from "./data/viewProps";
export default class AddEventView extends React.Component<viewProps, object> {

	constructor(props: viewProps) {
		super(props);
		this.presenter = new AddEventPresenter(props.model);
		this.state = {};
		this.name = "";
		this.days = [];
	}

	presenter : AddEventPresenter;
	name : string;
	days : string[];

	setName = (e: React.FormEvent<HTMLInputElement>) => {
		this.name = e.currentTarget.value;
	};

	setDay = (newDay: string) => {
		let done = false;
		let i = -1;

		this.days.forEach((element, index) => {
			if (!done && element === newDay) {
				i = index;
				done = true;
			}
		});

		if (!done) {
			this.days.push(newDay);
		} else {
			this.days.splice(i, 1);
		}
	};

	render = () => {
		return (<div>
			<h2>Add Event</h2>
			<input type="text" onChange={this.setName}/>
			<input type="checkbox" onChange={() => this.setDay('M')}/>
			<button onClick={() => this.presenter.onChangeView("WEEKLY EVENTS")}>Done</button>
		</div>);
	}
}
	
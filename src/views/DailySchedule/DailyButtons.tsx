import React from 'react'
import Model from "../../model/Model";
import {ViewType} from "../ViewTypes";
import ChangeDayButton from "./ChangeDayButton";
import {FiCalendar, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiHome} from "react-icons/all";

export default class DailyButtons extends React.Component<{model: Model, otherView: ViewType, otherViewIcon: JSX.Element}, {}> {
	render () {
		let model = this.props.model;
		return <div className='linkButtons'>
			<ChangeDayButton model={model} text={<FiChevronsLeft/>} offset={-7}/>
			<ChangeDayButton model={model} text={<FiChevronLeft/>} offset={-1}/>
			<button onClick={() => this.props.model.changeView(this.props.otherView)}>{this.props.otherViewIcon}</button>
			<button onClick={() => {
				this.props.model.resetDate();
				this.props.model.changeView(ViewType.MAIN)
			}}><FiHome/></button>
			<button onClick={() => this.props.model.changeView(ViewType.CALENDAR)}><FiCalendar/></button>
			<ChangeDayButton model={model} text={<FiChevronRight/>} offset={1}/>
			<ChangeDayButton model={model} text={<FiChevronsRight/>} offset={7}/>
		</div>;
	}
}

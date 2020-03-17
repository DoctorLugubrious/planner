import * as React from "react";
import Model from "../../model/Model";
import {ScheduledEvent} from "../../goalData/ScheduledEvent";
import {ViewType} from "../ViewTypes";
import {FiEdit, FiTrash} from "react-icons/all";

interface ScheduledEventInfoProps {
	model: Model,
	event: ScheduledEvent,
}

let ScheduledEventInfo = (props: ScheduledEventInfoProps) => {
	return (<div className={'scheduleItem'}>
		{props.event.name}
		<button onClick={() => {
			props.model.currentEvent = props.event;
			props.model.changeView(ViewType.EDIT_SCHEDULED_EVENT)
		}}><FiEdit/></button>
		<button onClick={() => {
			props.model.deleteScheduledEvent(props.event)
		}} className={'deleteButton'}><FiTrash/></button>
	</div>);
};

export default ScheduledEventInfo;

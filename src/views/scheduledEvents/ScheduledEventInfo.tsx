import * as React from "react";
import Model from "../../model/Model";
import {ScheduledEvent} from "../../goalData/ScheduledEvent";
import {ViewType} from "../ViewTypes";

interface ScheduledEventInfoProps {
	model: Model,
	event: ScheduledEvent,
}

let ScheduledEventInfo = (props: ScheduledEventInfoProps) => {
	return (<div>
		{props.event.name}
		<button onClick={() => {
			props.model.currentEvent = props.event;
			props.model.changeView(ViewType.EDIT_SCHEDULED_EVENT)
		}}>EDIT</button>
		<button onClick={() => {
			props.model.deleteScheduledEvent(props.event)
		}}>DELETE</button>
	</div>);
};

export default ScheduledEventInfo;
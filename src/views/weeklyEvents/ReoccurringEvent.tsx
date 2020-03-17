import React from "react";
import ReoccurringWeeklyEvent from "../../goalData/ReoccurringWeeklyEvent";
import {FiTrash} from "react-icons/all";

interface reoccurringEventProps {
	event: ReoccurringWeeklyEvent;
	index: number;
	deleteEvent: (event: ReoccurringWeeklyEvent) => void;
}

let ReoccurringEvent = (props: reoccurringEventProps) => {
	let event = props.event;

	return <div key={props.index} className={'reoccurringEvent'}>{event.name} ({event.start})
		<button onClick={() => props.deleteEvent(event)} className={'deleteButton'}><FiTrash/></button>
	</div>
};

export default ReoccurringEvent;

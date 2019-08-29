import React from "react";
import ReoccurringWeeklyEvent from "../../goalData/ReoccurringWeeklyEvent";

interface reoccurringEventProps {
	event: ReoccurringWeeklyEvent;
	index: number;
	deleteEvent: (event: ReoccurringWeeklyEvent) => void;
}

let ReoccurringEvent = (props: reoccurringEventProps) => {
	let days = "";
	let event = props.event;

	for(let day of event.days) {
		days += day;
	}
	return <div key={props.index}>{event.name} ({days} at {event.start})
		<button onClick={() => props.deleteEvent(event)}>Delete</button>
	</div>
};

export default ReoccurringEvent;
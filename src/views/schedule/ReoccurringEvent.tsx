import React from "react";
import ReoccurringWeeklyEvent from "../../model/ReoccurringWeeklyEvent";

interface reoccuringEventProps {
	event: ReoccurringWeeklyEvent;
	index: number;
	deleteEvent: (event: ReoccurringWeeklyEvent) => void;
}

let ReoccurringEvent =(props: reoccuringEventProps) => {
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
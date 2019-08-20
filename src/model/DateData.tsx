import {ScheduledEvent} from "./ScheduledEvent";
import DailyGoal from "./DailyGoal";

export default interface DateData {
	events: ScheduledEvent[];
	goals: DailyGoal[];
}
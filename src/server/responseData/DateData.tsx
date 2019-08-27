import {ScheduledEvent} from "../../goalData/ScheduledEvent";
import DailyGoal from "../../goalData/DailyGoal";

export default interface DateData {
	events: ScheduledEvent[];
	goals: DailyGoal[];
}
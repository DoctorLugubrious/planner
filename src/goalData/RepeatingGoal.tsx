import {GoalFrequency} from "./GoalFrequency";
import Goal from "./Goal";


export default interface RepeatingGoal extends Goal {
	name: string;
	frequency: GoalFrequency;
}

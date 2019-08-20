import Goal from "./Goal";
import {GoalType} from "./GoalType";

export interface GoalWithType extends Goal{
	type: GoalType;
}
import Goal from "../../goalData/Goal";
import RepeatingGoal from "../../goalData/RepeatingGoal";

export default interface DecomposeResult {
	longTerm: Map<string, Goal[]>;
	yearly: Map<string, Goal[]>;
	monthly: Map<string, Goal[]>;
	weekly: Map<string, Goal[]>;
	continuous: RepeatingGoal[];
}
import Goal from "../../goalData/Goal";
import RepeatingGoal from "../../goalData/RepeatingGoal";
import DailyGoal from "../../goalData/DailyGoal";

export default interface DecomposeResult {
	longTerm: string;
	yearly: string;
	monthly: string;
	weekly: string;
	continuous: RepeatingGoal[];
}

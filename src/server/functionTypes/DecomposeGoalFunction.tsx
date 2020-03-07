import {Auth} from "../Auth";
import Goal from "../../goalData/Goal";
import {GoalWithType} from "../../goalData/GoalWithType";
import ServerResponse from "../responseData/ServerResponse";
import DecomposeResult from "../responseData/DecomposeResult";

export type decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[], keep: boolean)
	=> Promise<ServerResponse<DecomposeResult>>;


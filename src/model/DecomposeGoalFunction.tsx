import {Auth} from "./Auth";
import Goal from "./Goal";
import {GoalWithType} from "./GoalWithType";
import ServerResponse from "./ServerResponse";
import DecomposeResult from "./DecomposeResult";

export type decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[])
	=> Promise<ServerResponse<DecomposeResult>>;


import {Auth} from "./Auth";
import Goal from "./Goal";
import ServerResponse from "./ServerResponse";

export type addGoalFunction = (auth: Auth, goal: Goal, role: string) => Promise<ServerResponse<Map<string, Goal[]>>>;
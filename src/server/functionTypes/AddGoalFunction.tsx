import {Auth} from "../Auth";
import Goal from "../../goalData/Goal";
import ServerResponse from "../responseData/ServerResponse";

export type addGoalFunction = (auth: Auth, goal: Goal, role: string) => Promise<ServerResponse<Map<string, Goal[]>>>;
import {Auth} from "../Auth";
import ServerResponse from "../responseData/ServerResponse";
import Goal from "../../goalData/Goal";

export type deleteGoalFunction = (auth: Auth, role: string, name: string) => Promise<ServerResponse<Map<string, Goal[]>>>;


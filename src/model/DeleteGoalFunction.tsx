import {Auth} from "./Auth";
import ServerResponse from "./ServerResponse";
import Goal from "./Goal";

export type deleteGoalFunction = (auth: Auth, role: string, name: string) => Promise<ServerResponse<Map<string, Goal[]>>>;


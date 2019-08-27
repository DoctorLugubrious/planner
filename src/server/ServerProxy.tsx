import DailyGoal from "../goalData/DailyGoal";
import {ServerInterface} from "./ServerInterface";
import {Auth} from "./Auth";
import ServerResponse from "./responseData/ServerResponse";
import RepeatingGoal from "../goalData/RepeatingGoal";
import {ScheduledEvent} from "../goalData/ScheduledEvent";
import User from "../model/User";
import {addGoalFunction} from "./functionTypes/AddGoalFunction";
import {decomposeGoalFunction} from "./functionTypes/DecomposeGoalFunction";
import {deleteGoalFunction} from "./functionTypes/DeleteGoalFunction";
import Goal from "../goalData/Goal";
import {GoalWithType} from "../goalData/GoalWithType";
import {DatabaseProxy} from "./DatabaseProxy";
import ReoccurringWeeklyEvent from "../goalData/ReoccurringWeeklyEvent";
import DateData from "./responseData/DateData";

export default class ServerProxy implements ServerInterface {

	private database : DatabaseProxy = new DatabaseProxy();

	addDailyGoal: (date: Date, goal: DailyGoal, auth: Auth) => Promise<ServerResponse<Map<string, DailyGoal[]>>>
		= (date: Date, goal: DailyGoal, auth: Auth) => {
		return this.database.addDailyGoal(date, goal, auth);
	};
	addLongTermGoal: addGoalFunction = (auth: Auth, goal: Goal, role: string) => {
		return this.database.addLongTermGoal(auth, goal, role);
	};

	addMonthlyGoal: addGoalFunction= (auth: Auth, goal: Goal, role: string) => {
		return this.database.addMonthlyGoal(auth, goal, role);
	};
	addRepeatingGoal: (event: RepeatingGoal, auth: Auth) => Promise<ServerResponse<RepeatingGoal[]>>
		= (event: RepeatingGoal, auth: Auth) => {
		return this.database.addRepeatingGoal(event, auth);
	};
	addRole: (role: string, auth: Auth) => Promise<ServerResponse<string[]>>
		= (role: string, auth: Auth) => {
		return this.database.addRole(role, auth);
	};
	addScheduledEvent: (event: ScheduledEvent, auth: Auth) => Promise<ServerResponse<Map<string, ScheduledEvent[]>>>
		= (event: ScheduledEvent, auth: Auth) => {
		return this.database.addScheduledEvent(event, auth);
	};
	addWeeklyEvent: (event: ReoccurringWeeklyEvent, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>
		= (event: ReoccurringWeeklyEvent, auth: Auth) => {
		return this.database.addWeeklyEvent(event, auth);
	};
	addWeeklyGoal: addGoalFunction= (auth: Auth, goal: Goal, role: string) => {
		return this.database.addWeeklyGoal(auth, goal, role);
	};
	addYearlyGoal: addGoalFunction= (auth: Auth, goal: Goal, role: string) => {
		return this.database.addYearlyGoal(auth, goal, role);
	};
	changePassword: (username: string, auth: Auth, newPassword: string) => Promise<ServerResponse<User>>
		= (username: string, auth: Auth, newPassword: string) => {
		return this.database.changePassword(username, auth, newPassword);
	};
	decomposeDailyGoal: (date: Date, goal: DailyGoal, oldName: string, auth: Auth) => Promise<ServerResponse<Map<string, DailyGoal[]>>>
		= (date: Date, goal: DailyGoal, oldName: string,  auth: Auth) => {
		return this.database.decomposeDailyGoal(date, goal, oldName, auth);
	};
	decomposeLongTermGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[]) => {
		return this.database.decomposeLongTermGoal(auth, role, goal, goals);
	};
	decomposeMonthlyGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[]) => {
		return this.database.decomposeMonthlyGoal(auth, role, goal, goals);
	};
	decomposeWeeklyGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[]) => {
		return this.database.decomposeWeeklyGoal(auth, role, goal, goals);
	};
	decomposeYearlyGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[]) => {
		return this.database.decomposeYearlyGoal(auth, role, goal, goals);
	};
	deleteDailyGoal: (date: Date, goal: DailyGoal, auth: Auth) => Promise<ServerResponse<Map<string, DailyGoal[]>>>
		= (date: Date, goal: DailyGoal, auth: Auth) => {
		return this.database.deleteDailyGoal(date, goal, auth);
	};
	deleteLongTermGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.database.deleteLongTermGoal(auth, role, name);
	};
	deleteMonthlyGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.database.deleteMonthlyGoal(auth, role, name);
	};
	deleteRepeatingGoal: (event: RepeatingGoal, auth: Auth) => Promise<ServerResponse<RepeatingGoal[]>>
		= (event: RepeatingGoal, auth: Auth) => {
		return this.database.deleteRepeatingGoal(event, auth);
	};
	deleteRole: (role: string, auth: Auth) => Promise<ServerResponse<string[]>>
		= (role: string, auth: Auth) => {
		return this.database.deleteRole(role, auth);
	};
	deleteScheduledEvent: (event: ScheduledEvent, auth: Auth) => Promise<ServerResponse<Map<string, ScheduledEvent[]>>>
		= (event: ScheduledEvent, auth: Auth) => {
		return this.database.deleteScheduledEvent(event, auth);
	};
	deleteWeeklyEvent: (event: ReoccurringWeeklyEvent, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>
		= (event: ReoccurringWeeklyEvent, auth: Auth) => {
		return this.database.deleteWeeklyEvent(event, auth);
	};
	deleteWeeklyGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.database.deleteWeeklyGoal(auth, role, name);
	};
	deleteYearlyGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.deleteYearlyGoal(auth, role, name);
	};
	login: (username: string, password: string) => Promise<ServerResponse<User>>
		= (username: string, password: string) => {
		return this.database.login(username, password);
	};
	register: (username: string, password: string) => Promise<ServerResponse<User>>
		= (username: string, password: string) => {
		return this.database.register(username, password);
	};
	updateScheduledEvent: (event: ScheduledEvent, oldName: string, oldDate: Date, auth: Auth) => Promise<ServerResponse<Map<string, ScheduledEvent[]>>>
		= (event: ScheduledEvent,oldName: string, oldDate: Date, auth: Auth) => {
		return this.database.updateScheduledEvent(event, oldName, oldDate, auth);
	};
	updateWeeklyEvent: (event: ReoccurringWeeklyEvent, oldName: string,auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>
		= (event: ReoccurringWeeklyEvent, oldName: string,auth: Auth) => {
		return this.database.updateWeeklyEvent(event, oldName, auth);
	};
	sync: (auth: Auth) => Promise<ServerResponse<User>> = (auth: Auth) => {
		return this.database.sync(auth);
	};
	getDate: (auth: Auth, date: Date) => Promise<ServerResponse<DateData>> = (auth, date) => {
		return this.database.getDate(auth, date);
	};

}

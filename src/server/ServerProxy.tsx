import DailyGoal from "../goalData/DailyGoal";
import {Auth} from "./Auth";
import ServerResponse from "./responseData/ServerResponse";
import RepeatingGoal from "../goalData/RepeatingGoal";
import {ScheduledEvent} from "../goalData/ScheduledEvent";
import {addGoalFunction} from "./functionTypes/AddGoalFunction";
import {decomposeGoalFunction} from "./functionTypes/DecomposeGoalFunction";
import {deleteGoalFunction} from "./functionTypes/DeleteGoalFunction";
import Goal from "../goalData/Goal";
import {GoalWithType} from "../goalData/GoalWithType";
import ReoccurringWeeklyEvent from "../goalData/ReoccurringWeeklyEvent";
import DateData from "./responseData/DateData";

let request = require('request-promise');

export default class ServerProxy {

	async sendRequest(path: string, info: any) {
		return request({
			        "method":"POST",
			        "uri": /*"https://plan.averys.green:3001/" + path, //*/"http://localhost:3001/" + path,
			        "json": true,
			        "body": info
		        })
	};

	addDailyGoal: (date: Date, goal: DailyGoal, auth: Auth) => Promise<ServerResponse<string>>
		= (date: Date, goal: DailyGoal, auth: Auth) => {
		return this.sendRequest("add-daily-goal",  {date, goal, auth});
	};
	addLongTermGoal: addGoalFunction = (auth: Auth, goal: Goal, role: string) => {
		return this.sendRequest("add-long-term-goal",  {auth, goal, role});
	};

	addMonthlyGoal: addGoalFunction = (auth: Auth, goal: Goal, role: string) => {
		return this.sendRequest("add-monthly-goal",  {auth, goal, role});
	};
	addRepeatingGoal: (event: RepeatingGoal, auth: Auth) => Promise<ServerResponse<RepeatingGoal[]>>
		= (event: RepeatingGoal, auth: Auth) => {
		return this.sendRequest("add-repeating-goal",  {event, auth});
	};
	addRole: (role: string, auth: Auth) => Promise<ServerResponse<string[]>>
		= (role: string, auth: Auth) => {
		return this.sendRequest("add-role",  {role, auth});
	};
	addScheduledEvent: (event: ScheduledEvent, auth: Auth) => Promise<ServerResponse<string>>
		= (event: ScheduledEvent, auth: Auth) => {
		return this.sendRequest("add-scheduled-event",  {event, auth});
	};
	addWeeklyEvent: (event: ReoccurringWeeklyEvent, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>
		= (event: ReoccurringWeeklyEvent, auth: Auth) => {
		return this.sendRequest("add-weekly-event",  {event, auth});
	};
	addWeeklyGoal: addGoalFunction= (auth: Auth, goal: Goal, role: string) => {
		return this.sendRequest("add-weekly-goal",  {auth, goal, role});
	};
	addYearlyGoal: addGoalFunction= (auth: Auth, goal: Goal, role: string) => {
		return this.sendRequest("add-yearly-goal",  {auth, goal, role});
	};
	changePassword: (username: string, auth: Auth, newPassword: string) => Promise<ServerResponse<string>>
		= (username: string, auth: Auth, newPassword: string) => {
		return this.sendRequest("change-password",  {username, auth, newPassword});
	};
	decomposeDailyGoal: (date: Date, goal: DailyGoal, oldName: string, auth: Auth) => Promise<ServerResponse<string>>
		= (date: Date, goal: DailyGoal, oldName: string,  auth: Auth) => {
		return this.sendRequest("decompose-daily-goal",  {date, goal, oldName, auth});
	};
	decomposeLongTermGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[], keep: boolean) => {
		return this.sendRequest("decompose-long-term-goal",  {auth, role, goal, goals, keep});
	};
	decomposeMonthlyGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[], keep: boolean) => {
		return this.sendRequest("decompose-monthly-goal",  {auth, role, goal, goals, keep});
	};
	decomposeWeeklyGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[], keep: boolean) => {
		return this.sendRequest("decompose-weekly-goal",  {auth, role, goal, goals, keep});
	};
	decomposeYearlyGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[], keep: boolean) => {
		return this.sendRequest("decompose-yearly-goal",  {auth, role, goal, goals, keep});
	};
	deleteDailyGoal: (date: Date, goal: DailyGoal, auth: Auth) => Promise<ServerResponse<string>>
		= (date: Date, goal: DailyGoal, auth: Auth) => {
		return this.sendRequest("delete-daily-goal",  {date, goal, auth});
	};
	deleteLongTermGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.sendRequest("delete-long-term-goal",  {auth, role, name});
	};
	deleteMonthlyGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.sendRequest("delete-monthly-goal",  {auth, role, name});
	};
	deleteRepeatingGoal: (event: RepeatingGoal, auth: Auth) => Promise<ServerResponse<RepeatingGoal[]>>
		= (event: RepeatingGoal, auth: Auth) => {
		return this.sendRequest("delete-repeating-goal",  {event, auth});
	};
	deleteRole: (role: string, auth: Auth) => Promise<ServerResponse<string[]>>
		= (role: string, auth: Auth) => {
		return this.sendRequest("delete-role",  {role, auth});
	};
	deleteScheduledEvent: (event: ScheduledEvent, auth: Auth) => Promise<ServerResponse<string>>
		= (event: ScheduledEvent, auth: Auth) => {
		return this.sendRequest("delete-scheduled-event",  {event, auth});
	};
	deleteWeeklyEvent: (event: ReoccurringWeeklyEvent, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>
		= (event: ReoccurringWeeklyEvent, auth: Auth) => {
		return this.sendRequest("delete-weekly-event",  {event, auth});
	};
	deleteWeeklyGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.sendRequest("delete-weekly-goal",  {auth, role, name});
	};
	deleteYearlyGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.sendRequest("delete-yearly-goal", {auth, role, name});
	};
	login: (username: string, password: string) => Promise<ServerResponse<string>>
		= (username: string, password: string) => {
		return this.sendRequest("login",  {username, password});
	};
	register: (username: string, password: string) => Promise<ServerResponse<string>>
		= (username: string, password: string) => {
		return this.sendRequest("register",  {username, password});
	};
	updateScheduledEvent: (event: ScheduledEvent, oldName: string, oldDate: Date, auth: Auth) => Promise<ServerResponse<string>>
		= (event: ScheduledEvent,oldName: string, oldDate: Date, auth: Auth) => {
		return this.sendRequest("update-scheduled-event",  {event, oldName, oldDate, auth});
	};
	updateWeeklyEvent: (event: ReoccurringWeeklyEvent, oldName: string,auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>
		= (event: ReoccurringWeeklyEvent, oldName: string,auth: Auth) => {
		return this.sendRequest("update-weekly-event",  {event, oldName, auth});
	};
	sync: (auth: Auth) => Promise<ServerResponse<string>> = (auth: Auth) => {
		return this.sendRequest("sync",  {auth});
	};
	getDate: (auth: Auth, date: Date) => Promise<ServerResponse<DateData>> = (auth, date) => {
		return this.sendRequest("get-date",  {auth, date});
	};
	assignWeeklyGoal = (auth: Auth, goal: Goal, role: string, day: Date) => {
		return this.sendRequest("assign-weekly-goal", {auth, goal, role, day});
	}

}

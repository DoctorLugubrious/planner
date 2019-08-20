import Goal from "./Goal";
import {Auth} from "./Auth";
import ServerResponse from "./ServerResponse";
import {GoalWithType} from "./GoalWithType";
import DailyGoal from "./DailyGoal";
import {ScheduledEvent} from "./ScheduledEvent";
import RepeatingGoal from "./RepeatingGoal";
import User from "./User";
import {decomposeGoalFunction} from "./DecomposeGoalFunction";
import {addGoalFunction} from "./AddGoalFunction";
import {deleteGoalFunction} from "./DeleteGoalFunction";
import ReoccurringWeeklyEvent from "./ReoccurringWeeklyEvent";
import DateData from "./DateData";


export interface ServerInterface {
	/*ADD LONG TERM GOAL*/
	addLongTermGoal: addGoalFunction;
	/*DELETE LONG TERM GOAL*/
	deleteLongTermGoal: deleteGoalFunction;
	/*LONG TERM -> (REPEATING | YEARLY | LONG TERM)*/
	decomposeLongTermGoal: decomposeGoalFunction;

	/*ADD YEARLY GOAL*/
	addYearlyGoal: addGoalFunction;
	/*DELETE YEARLY GOAL*/
	deleteYearlyGoal: deleteGoalFunction;
	/*YEARLY -> (REPEATING | MONTHLY | YEARLY)*/
	decomposeYearlyGoal: decomposeGoalFunction;

	/*ADD MONTHLY GOAL*/
	addMonthlyGoal: addGoalFunction;
	/*DELETE MONTHLY GOAL*/
	deleteMonthlyGoal: deleteGoalFunction;
	/*MONTHLY -> (REPEATING | MONTHLY | WEEKLY)*/
	decomposeMonthlyGoal: decomposeGoalFunction

	/*ADD WEEKLY GOAL*/
	addWeeklyGoal: addGoalFunction;
	/*DELETE WEEKLY GOAL*/
	deleteWeeklyGoal: deleteGoalFunction;
	/*WEEKLY -> (DAILY | WEEKLY)*/
	decomposeWeeklyGoal: decomposeGoalFunction

	/*ADD DAILY GOAL*/
	addDailyGoal: (date: Date, goal: DailyGoal, auth: Auth) => Promise<ServerResponse<Map<string, DailyGoal[]>>>;
	/*DELETE DAILY GOAL*/
	deleteDailyGoal: (date: Date, goal: DailyGoal, auth: Auth) => Promise<ServerResponse<Map<string, DailyGoal[]>>>;
	/*DAILY GOAL -> DAILY SCHEDULE*/
	decomposeDailyGoal: (date: Date, goal: DailyGoal, oldName: string,auth: Auth) => Promise<ServerResponse<Map<string, DailyGoal[]>>>;

	/*ADD REPEATING GOAL*/
	addRepeatingGoal: (event: RepeatingGoal, auth: Auth) => Promise<ServerResponse<RepeatingGoal[]>>;
	/*DELETE REPEATING GOAL*/
	deleteRepeatingGoal: (event: RepeatingGoal, auth: Auth) => Promise<ServerResponse<RepeatingGoal[]>>;

	/*ADD ONE-TIME EVENT*/
	addScheduledEvent: (event: ScheduledEvent, auth: Auth) => Promise<ServerResponse<Map<string, ScheduledEvent[]>>>;
	/*DELETE ONE-TIME EVENT*/
	deleteScheduledEvent: (event: ScheduledEvent, auth: Auth) => Promise<ServerResponse<Map<string, ScheduledEvent[]>>>;
	/*UPDATE ONE-TIME EVENT*/
	updateScheduledEvent: (event: ScheduledEvent, oldName: string, oldDate: Date, auth: Auth) => Promise<ServerResponse<Map<string, ScheduledEvent[]>>>;

	/*ADD WEEKLY EVENT*/
	addWeeklyEvent: (event: ReoccurringWeeklyEvent, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>;
	/*DELETE WEEKLY EVENT*/
	deleteWeeklyEvent: (event: ReoccurringWeeklyEvent, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>;
	/*UPDATE WEEKLY EVENT*/
	updateWeeklyEvent: (event: ReoccurringWeeklyEvent, oldName: string, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>;

	/*ADD ROLE*/
	addRole: (role: string, auth: Auth) => Promise<ServerResponse<string[]>>;
	/*DELETE ROLE*/
	deleteRole: (role: string, auth: Auth) => Promise<ServerResponse<string[]>>;

	/*LOGIN*/
	login: (username: string, password: string) => Promise<ServerResponse<User>>;
	/*REGISTER*/
	register: (username: string, password: string) => Promise<ServerResponse<User>>;
	/*CHANGE PASSWORD*/
	changePassword: (username: string, auth: Auth, newPassword: string) => Promise<ServerResponse<User>>;

	/*SYNC WHEN LOGGIN IN*/
	sync: (auth: Auth) => Promise<ServerResponse<User>>;

	getDate: (auth: Auth, date: Date)=>Promise<ServerResponse<DateData>>;
}

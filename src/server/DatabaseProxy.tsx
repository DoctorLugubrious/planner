import User from "../model/User";
import {ServerInterface} from "./ServerInterface";
import {Auth} from "./Auth";
import DailyGoal from "../goalData/DailyGoal";
import ServerResponse from "./responseData/ServerResponse";
import {addGoalFunction} from "./functionTypes/AddGoalFunction";
import RepeatingGoal from "../goalData/RepeatingGoal";
import {ScheduledEvent} from "../goalData/ScheduledEvent";
import {decomposeGoalFunction} from "./functionTypes/DecomposeGoalFunction";
import {deleteGoalFunction} from "./functionTypes/DeleteGoalFunction";
import Goal from "../goalData/Goal";
import {GoalWithType} from "../goalData/GoalWithType";
import ReoccurringWeeklyEvent from "../goalData/ReoccurringWeeklyEvent";
import {GoalType} from "../goalData/GoalType";
import {GoalFrequency} from "../goalData/GoalFrequency";
import FormatDate from "../utility/datesAndTimes/FormatDate";
import DateData from "./responseData/DateData";

export class DatabaseProxy implements ServerInterface{
	private users: Map<string, User> = new Map<string, User>();

	constructor() {
		let testUser = new User("test", "test");
		this.users.set("test", testUser);
		testUser.addRole("TEST ROLE");
		testUser.addWeeklyGoal("TEST ROLE", {name: "WEEKLY TEST"});
		testUser.addMonthlyGoal("TEST ROLE", {name: "MONTHLY TEST"});
		testUser.addYearlyGoal("TEST ROLE", {name: "YEARLY TEST"});
		testUser.addLongTermGoal("TEST ROLE", {name: "LONG TERM TEST"});
		testUser.addEvent({name: "RIGH' NAU", len: 60, date: new Date()});
		testUser.addContinuous({name: "DAILY GOLE", frequency: GoalFrequency.DAILY});
		testUser.addContinuous({name: "WEEKLY GOLE", frequency: GoalFrequency.WEEKLY});
		testUser.addDailyGoal(new Date(), {name: "DAILY GOAL TEST", completed: false, start: "05:00am"});
		testUser.addDailyGoal(new Date(), {name: "DAILY GOAL TEST ASSIGN", completed: false, start: ""});

		let date = new Date();
		let yesterdate = new Date(); yesterdate.setDate(yesterdate.getDate() - 1);

		testUser.addEvent({name: 'TODAY', date: date, len: 60});
		testUser.addEvent({name: 'YESTERDAY', date: yesterdate, len: 60});
		testUser.addDailyGoal(yesterdate, {name: "DAILY GOAL YESTERDAY", completed: false, start: ""});
	}

	private authenticate = (auth: Auth) :boolean => {
		let user =  this.users.get(auth.username);
		return user !== undefined && user.token === auth.token;
	};

	private getUser(auth: Auth): User {
		let result : User|undefined = this.users.get(auth.username);
		if (result === undefined) {
			result = new User("", "");
		}
		return result;
	}

	private getTimedPromise<T>(callback: () => T, auth: Auth) : Promise<ServerResponse<T>> {
		return new Promise<ServerResponse<T>>(((resolve: (value: ServerResponse<T>)=>void) => {

			let result: ServerResponse<T>= new ServerResponse<T>();
			if (this.authenticate(auth)) {
				result.setData(callback());
			}
			else {
				result.setError("SERVER COULD NOT AUTHENTICATE");
			}

			setTimeout(() => resolve(result), 500);
		}));
	}


	addDailyGoal: (date: Date, goal: DailyGoal, auth: Auth) => Promise<ServerResponse<Map<string, DailyGoal[]>>>
		= (date: Date, goal: DailyGoal, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.addDailyGoal(date, goal);
			return user.filterForDate(date).dailyGoals;
		}, auth);
	};
	addLongTermGoal: addGoalFunction = (auth: Auth, goal: Goal, role: string) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.addLongTermGoal(role, goal);
			return user.longTermGoals;
		}, auth);
	};

	addMonthlyGoal: addGoalFunction= (auth: Auth, goal: Goal, role: string) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.addMonthlyGoal(role, goal);
			return user.monthlyGoals;
		}, auth);
	};
	addRepeatingGoal: (event: RepeatingGoal, auth: Auth) => Promise<ServerResponse<RepeatingGoal[]>>
		= (event: RepeatingGoal, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.addContinuous(event);
			return user.continuousGoals;
		}, auth);
	};
	addRole: (role: string, auth: Auth) => Promise<ServerResponse<string[]>>
		= (role: string, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.addRole(role);
			return user.roles;
		}, auth);
	};
	addScheduledEvent: (event: ScheduledEvent, auth: Auth) => Promise<ServerResponse<Map<string, ScheduledEvent[]>>>
		= (event: ScheduledEvent, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.addEvent(event);
			return user.events;
		}, auth);
	};
	addWeeklyEvent: (event: ReoccurringWeeklyEvent, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>
		= (event: ReoccurringWeeklyEvent, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.addWeeklyEvent(event);
			return user.weeklyEvents;
		}, auth);
	};
	addWeeklyGoal: addGoalFunction= (auth: Auth, goal: Goal, role: string) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.addWeeklyGoal(role, goal);
			return user.weeklyGoals;
		}, auth);
	};
	addYearlyGoal: addGoalFunction= (auth: Auth, goal: Goal, role: string) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.addYearlyGoal(role, goal);
			return user.yearlyGoals;
		}, auth);
	};
	changePassword: (username: string, auth: Auth, newPassword: string) => Promise<ServerResponse<User>>
		= (username: string, auth: Auth, newPassword: string) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.changeHash(newPassword);
			return user.filterForDate(new Date());
		}, auth);
	};
	decomposeDailyGoal: (date: Date, goal: DailyGoal,  oldName: string,  auth: Auth) => Promise<ServerResponse<Map<string, DailyGoal[]>>>
		= (date: Date, goal: DailyGoal,  oldName: string,  auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.updateDailyGoal(date, goal, oldName);
			return user.filterForDate(date).dailyGoals;
		}, auth);
	};

	private addGoals(role: string, goals: GoalWithType[], user: User) {
		goals.forEach(value => {
			switch (value.type) {
				case GoalType.LONG_TERM:
					user.addLongTermGoal(role, value);
					break;
				case GoalType.MONTHLY:
					user.addMonthlyGoal(role, value);
					break;
				case GoalType.WEEKLY:
					user.addWeeklyGoal(role, value);
					break;
				case GoalType.YEARLY:
					user.addWeeklyGoal(role, value);
					break;
				case GoalType.EVERY_WEEK:
					user.addContinuous({name: value.name, frequency: GoalFrequency.WEEKLY});
					break;
				case GoalType.EVERY_DAY:
					user.addContinuous({name: value.name, frequency: GoalFrequency.DAILY});
					break;
			}
		});
	}

	decomposeLongTermGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[]) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteLongTermGoal(role, goal.name);
			this.addGoals(role, goals, user);
			return {
				continuous: user.continuousGoals,
				longTerm: user.longTermGoals,
				monthly: user.monthlyGoals,
				weekly: user.weeklyGoals,
				yearly: user.yearlyGoals
			}
		}, auth);
	};
	decomposeMonthlyGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[]) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteMonthlyGoal(role, goal.name);
			this.addGoals(role, goals, user);
			return {
				continuous: user.continuousGoals,
				longTerm: user.longTermGoals,
				monthly: user.monthlyGoals,
				weekly: user.weeklyGoals,
				yearly: user.yearlyGoals
			}
		}, auth);
	};
	decomposeWeeklyGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[]) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteWeeklyGoal(role, goal.name);
			this.addGoals(role, goals, user);
			return {
				continuous: user.continuousGoals,
				longTerm: user.longTermGoals,
				monthly: user.monthlyGoals,
				weekly: user.weeklyGoals,
				yearly: user.yearlyGoals
			}
		}, auth);
	};
	decomposeYearlyGoal: decomposeGoalFunction = (auth: Auth, role: string, goal: Goal, goals: GoalWithType[]) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteYearlyGoal(role, goal.name);
			this.addGoals(role, goals, user);
			return {
				continuous: user.continuousGoals,
				longTerm: user.longTermGoals,
				monthly: user.monthlyGoals,
				weekly: user.weeklyGoals,
				yearly: user.yearlyGoals
			}
		}, auth);
	};

	deleteDailyGoal: (date: Date, goal: DailyGoal, auth: Auth) => Promise<ServerResponse<Map<string, DailyGoal[]>>>
		= (date: Date, goal: DailyGoal, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteDailyGoal(date, goal.name);
			return user.filterForDate(date).dailyGoals;
		}, auth);
	};
	deleteLongTermGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteLongTermGoal(role, name);
			return user.longTermGoals;
		}, auth);
	};
	deleteMonthlyGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteMonthlyGoal(role, name);
			return user.monthlyGoals;
		}, auth);
	};
	deleteRepeatingGoal: (event: RepeatingGoal, auth: Auth) => Promise<ServerResponse<RepeatingGoal[]>>
		= (event: RepeatingGoal, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteContinuous(event);
			return user.continuousGoals;
		}, auth);
	};
	deleteRole: (role: string, auth: Auth) => Promise<ServerResponse<string[]>>
		= (role: string, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteRole(role);
			return user.roles;
		}, auth);
	};
	deleteScheduledEvent: (event: ScheduledEvent, auth: Auth) => Promise<ServerResponse<Map<string, ScheduledEvent[]>>>
		= (event: ScheduledEvent, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteEvent(event.date, event.name);
			return user.events;
		}, auth);
	};
	deleteWeeklyEvent: (event: ReoccurringWeeklyEvent, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>
		= (event: ReoccurringWeeklyEvent, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteWeeklyEvent(event.name);
			return user.weeklyEvents;
		}, auth);
	};
	deleteWeeklyGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteWeeklyGoal(role, name);
			return user.weeklyGoals;
		}, auth);
	};
	deleteYearlyGoal: deleteGoalFunction = (auth: Auth, role: string, name: string) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.deleteYearlyGoal(role, name);
			return user.yearlyGoals;
		}, auth);
	};
	login: (username: string, password: string) => Promise<ServerResponse<User>>
		= (username: string, password: string) => {
		return new Promise<ServerResponse<User>>((resolve) => {
			let auth = {username: username, token: ""};
			let user = this.getUser(auth).filterForDate(new Date());
			let response = new ServerResponse<User>();

			if (user.checkHash(password)) {
				response.setData(user);
			}
			else {
				response.setError("INCORRECT PASSWORD");
			}
			resolve(response);
		})
	};
	register: (username: string, password: string) => Promise<ServerResponse<User>>
		= (username: string, password: string) => {
		return new Promise<ServerResponse<User>>((resolve) => {
			let user = this.users.get(username);
			let response = new ServerResponse<User>();

			if (user === undefined) {
				let user = new User(username, password);
				this.users.set(username, user);
				response.setData(user);
			}
			else {
				response.setError("USER ALREADY EXIS");
			}
			resolve(response);
		})
	};
	updateScheduledEvent: (event: ScheduledEvent, oldName: string, oldDate: Date, auth: Auth) => Promise<ServerResponse<Map<string, ScheduledEvent[]>>>
		= (event: ScheduledEvent, oldName: string, oldDate: Date, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.updateEvent(event, oldName, oldDate);
			let data: ScheduledEvent[] = [];
			let temp = user.events.get(FormatDate(event.date));
			if (temp !== undefined) {
				data = temp;
			}
			return new Map<string, ScheduledEvent[]>([[FormatDate(event.date), data]]);
		}, auth);
	};
	updateWeeklyEvent: (event: ReoccurringWeeklyEvent, oldName: string, auth: Auth) => Promise<ServerResponse<ReoccurringWeeklyEvent[]>>
		= (event: ReoccurringWeeklyEvent, oldName: string, auth: Auth) => {
		return this.getTimedPromise(() => {
			let user = this.getUser(auth);
			user.updateWeeklyEvent(event, oldName);
			return user.weeklyEvents;
		}, auth);
	};

	sync: (auth: Auth) => Promise<ServerResponse<User>> = (auth: Auth) => {
		return new Promise<ServerResponse<User>>((resolve) => {
			let user = this.getUser(auth);
			let response = new ServerResponse<User>();

			if (user.Auth.token == auth.token) {
				response.setData(user.filterForDate(new Date()));
			}
			else {
				response.setError("INCORRECT TOKEN");
			}
			resolve(response);
		})
	};

	getDate: (auth: Auth, date: Date) => Promise<ServerResponse<DateData>> = (auth: Auth, date: Date) => {
		return new Promise<ServerResponse<DateData>>((resolve) => {
			let response = new ServerResponse<DateData>();
			if (this.authenticate(auth)) {
				let userInfo = this.getUser(auth).filterForDate(date);
				let events = userInfo.events.get(FormatDate(date));
				let goals = userInfo.dailyGoals.get(FormatDate(date));
				if (events == undefined) {
					events = [];
				}
				if (goals == undefined) {
					goals = [];
				}

				let data: DateData = {
					events: events,
					goals: goals,
				};
				response.setData(data);
			}
			else {
				response.setError("INCORRECT TOKEN FOR GETTING DATE");
			}
			resolve(response);
		})
	}


}
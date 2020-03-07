import ReoccurringWeeklyEvent from "../goalData/ReoccurringWeeklyEvent";
import Goal from "../goalData/Goal";
import DailyGoal from "../goalData/DailyGoal";
import {ScheduledEvent} from "../goalData/ScheduledEvent";
import FormatDate from "../utility/datesAndTimes/FormatDate";
import RepeatingGoal from "../goalData/RepeatingGoal";
import {Auth} from "../server/Auth";
import {deserializeMap, serializeMap} from "../utility/mapSerialization/maps";
import {GoalFrequency} from "../goalData/GoalFrequency";
import GetDay from "../utility/datesAndTimes/GetDay";

export default class User {
	readonly username: string;
	private hash: string;
	lastLogin: Date;

	token: string;

	weeklyEvents: ReoccurringWeeklyEvent[];
	roles: string[];

	longTermGoals: Map<string, Goal[]>;
	yearlyGoals: Map<string, Goal[]>;
	monthlyGoals: Map<string, Goal[]>;
	weeklyGoals: Map<string, Goal[]>;

	dailyGoals: Map<string, DailyGoal[]>;
	events: Map<string, ScheduledEvent[]>;

	continuousGoals: RepeatingGoal[];

	constructor(username: string, hash: string) {
		this.username = username;
		this.hash = hash;

		this.lastLogin = new Date();
		this.token = "TOKEN";

		this.weeklyEvents = [];
		this.roles = [];

		this.longTermGoals = new Map<string, Goal[]>();
		this.yearlyGoals  = new Map<string, Goal[]>();
		this.monthlyGoals = new Map<string, Goal[]>();
		this.weeklyGoals = new Map<string, Goal[]>();

		this.dailyGoals = new Map<string, DailyGoal[]>();
		this.events = new Map<string, ScheduledEvent[]>();

		this.continuousGoals = [];
	}


	static addEmptyArray<T>(map: Map<string, T[]>, key: string) {
		if (map.get(key) === undefined) {
			map.set(key, []);
		}
	}

	//DELETE
	private static deleteFromArray(array: any[], testFunc: (item: any) => boolean) {
		let index = array.findIndex(testFunc);
		if (index != -1) {
			array.splice(index, 1);
			return true;
		}
		return false;
	};

	private addToArray<T>(array: T[], item: T, duplicate: (dupe: T) => boolean): boolean {
		if (array.findIndex(duplicate) === -1) {
			array.push(item);
			return true;
		}
		return false;
	}

	deleteWeeklyEvent = (name: string) => {
		return User.deleteFromArray(this.weeklyEvents, (item: ReoccurringWeeklyEvent) => {
			return item.name == name;
		});
	};

	deleteLongTermGoal = (role: string, name: string) => {
		return this.deleteFromMap(this.longTermGoals, role, (item: Goal) => {
			return item.name == name;
		})
	};

	deleteYearlyGoal = (role: string, name: string) => {
		return this.deleteFromMap(this.yearlyGoals, role, (item: Goal) => {
			return item.name == name;
		})
	};

	deleteMonthlyGoal = (role: string, name: string) => {
		return this.deleteFromMap(this.monthlyGoals, role, (item: Goal) => {
			return item.name == name;
		})
	};

	deleteWeeklyGoal = (role: string, name: string) => {
		let result = this.deleteFromMap(this.weeklyGoals, role, (item: Goal) => {
			return item.name == name;
		});
		result = this.deleteContinuous({name, frequency: GoalFrequency.WEEKLY}) || result;
		return result;
	};

	deleteDailyGoal = (date: Date, name: string) => {
		let dateFormat = FormatDate(date);
		let result = this.deleteFromMap(this.dailyGoals, dateFormat, (item: DailyGoal) => {
			return item.name === name;
		});
		result = this.deleteContinuous({name, frequency: GoalFrequency.DAILY}) || result;
		return result;
	};

	deleteEvent = (date: Date, name: string) => {
		let dateFormat = FormatDate(date);
		return this.deleteFromMap(this.events, dateFormat, (item: ScheduledEvent) => {
			return item.name === name;
		})
	};

	deleteRole = (role: string) => {
		if (User.deleteFromArray(this.roles, (item: string) => {
			return item === role;
		}) ) {
			this.longTermGoals.delete(role);
			this.monthlyGoals.delete(role);
			this.weeklyGoals.delete(role);
			this.yearlyGoals.delete(role);
			this.setJsonVariables();
			return true;
		}
		return false;
	};

	deleteContinuous = (goal: RepeatingGoal)  => {
		let result = User.deleteFromArray(this.continuousGoals, item => item.name == goal.name);
		if (result) {
			this.dailyGoals.forEach((goals: DailyGoal[]) => {
				User.deleteFromArray(goals, item => item.name == goal.name);
			});
		}
		return result;
	};

	addWeeklyEvent = (event: ReoccurringWeeklyEvent) => {
		return this.addToArray(this.weeklyEvents, event, (item: ReoccurringWeeklyEvent) => {
			return item.name === event.name;
		})
	};

	addRole = (role: string) => {
		User.addEmptyArray(this.longTermGoals, role);
		User.addEmptyArray(this.monthlyGoals, role);
		User.addEmptyArray(this.yearlyGoals, role);
		User.addEmptyArray(this.weeklyGoals, role);

		this.setJsonVariables();

		return this.addToArray(this.roles, role, (item: string) => {
			return item === role;
		});
	};

	addDailyGoal = (date: Date, goal: DailyGoal) => {
		let formatDate = FormatDate(date);
		User.addEmptyArray(this.dailyGoals, formatDate);
		let result = this.addToMap(this.dailyGoals, formatDate, goal, (item: DailyGoal) => goal.name === item.name);
		return result;
	};

	addEvent = (goal: ScheduledEvent) => {
		let formatDate = FormatDate(goal.date);
		User.addEmptyArray(this.events, formatDate);
		let res = this.addToMap(this.events, formatDate, goal, (item: ScheduledEvent) => item.name === goal.name);
		return res;
	};

	addLongTermGoal = (role: string, goal: Goal) => {
		return this.addToMap(this.longTermGoals, role, goal, (item: Goal) => goal.name === item.name);
	};

	addYearlyGoal = (role: string, goal: Goal) => {
		return this.addToMap(this.yearlyGoals, role, goal, (item: Goal) => goal.name === item.name);
	};

	addMonthlyGoal = (role: string, goal: Goal) => {
		return this.addToMap(this.monthlyGoals, role, goal, (item: Goal) => goal.name === item.name);
	};

	addWeeklyGoal = (role: string, goal: Goal) => {
		let result = this.addToMap(this.weeklyGoals, role, goal, (item: Goal) => goal.name === item.name);
		return result;
	};

	addContinuous = (goal: RepeatingGoal) => {
		return this.addToArray(this.continuousGoals, goal, dupe => goal.name == dupe.name);
	};

	updateDailyGoal = (date: Date, goal: DailyGoal, oldName: string) => {
		let dateFormat = FormatDate(date);
		this.deleteDailyGoal(date, oldName);
		User.addEmptyArray(this.dailyGoals, dateFormat);
		return this.addDailyGoal(date, goal);
	};

	updateEvent = (event: ScheduledEvent, oldName: string, oldDate: Date) => {
		let newDateFormat = FormatDate(event.date);
		let oldDateFormat = FormatDate(oldDate);
		let deleted = this.deleteFromMap(this.events, oldDateFormat, item => item.name === oldName);
		User.addEmptyArray(this.events, newDateFormat);
		return deleted && this.addToMap(this.events, newDateFormat, event, dupe => dupe.name === event.name);
	};

	//UPDATE

	private deleteFromMap(map: Map<string, any[]>, key: string, testFunc: (item: any) => boolean) {
		let array = map.get(key);
		if (array != undefined) {
			User.deleteFromArray(array, testFunc);
			this.setJsonVariables();
			return true;
		}
		return false;
	}

	private UpdateMap<T>(map: Map<string, T[]>, key: string, item: T, duplicate: (dupe: T) => boolean): boolean {
		this.deleteFromMap(map, key, duplicate);
		return this.addToMap(map, key, item, duplicate);
	}

	updateWeeklyEvent = (event: ReoccurringWeeklyEvent, oldName: string) => {
		return this.UpdateArray(this.weeklyEvents, event, (dupe: ReoccurringWeeklyEvent) => oldName === dupe.name);
	};

	private addToMap<T>(map: Map<string, T[]>, key: string, item: T, duplicate: (dupe: T) => boolean): boolean {
		let array = map.get(key);
		if (array === undefined) {
			return false;
		}
		let result =  this.addToArray(array, item, duplicate);
		this.setJsonVariables();
		return result;
	};

	private UpdateArray<T>(array: T[], item: T, duplicate: (dupe: T) => boolean): boolean {
		User.deleteFromArray(array, duplicate);
		return this.addToArray(array, item, duplicate);
	}

	filterForDate = (date: Date) :User => {
		let that: User = new User(this.username, this.hash);

		that.lastLogin = this.lastLogin;
		that.token = this.token;

		that.weeklyEvents = this.weeklyEvents;
		that.roles = this.roles;
		that.continuousGoals = this.continuousGoals;

		that.longTermGoals = this.longTermGoals;
		that.yearlyGoals  = this.yearlyGoals;
		that.monthlyGoals = this.monthlyGoals;
		that.weeklyGoals = this.weeklyGoals;


		let formatDate = FormatDate(date);

		let dailyGoals: DailyGoal[] | undefined = this.dailyGoals.get(formatDate);
		if (dailyGoals !== undefined) {
			that.dailyGoals = new Map<string, DailyGoal[]>(
				[[formatDate, dailyGoals]]
			);
		}
		else {
			that.dailyGoals = new Map<string, DailyGoal[]>([[formatDate, []]]);
		}

		let day = FormatDate(date);
		let weekday = GetDay(date);
		let otherDailyGoals = that.dailyGoals.get(formatDate) as DailyGoal[];
		this.continuousGoals.forEach((goal: RepeatingGoal) => {
			if (goal.frequency == GoalFrequency.DAILY) {
				if (weekday != "Su" && !that.hasDailyGoal(day, goal.name)) {
					otherDailyGoals.push({completed: false, name: goal.name, start: ""});
				}
			}
		});

		let events = this.events.get(formatDate);
		if (events !== undefined) {
			that.events = new Map<string, ScheduledEvent[]>(
				[[formatDate, events]]
			);
		}
		else {
			that.events = new Map<string, ScheduledEvent[]>();
		}

		return that;
	};

	private hasDailyGoal(formatDate: string, name: string) {
		let otherDailyGoals = this.dailyGoals.get(formatDate);
		if (otherDailyGoals == undefined) {
			return false;
		}
		return otherDailyGoals.find((goal) => goal.name == name) != undefined;
	}

	private hasGoalInWeek(date: Date, name: string) {

		let found: boolean = false;

		this.weeklyGoals.forEach((value: Goal[]) => {
			found = found || value.find((goal) => goal.name == name) != undefined;
		});
		if (found) {
			return true;
		}

		let day = new Date(date);
		day.setDate(day.getDate() - day.getDay());


		for (let i = 0; i < 7; ++i) {
			day.setDate(day.getDate() + 1);
			found = found || this.hasDailyGoal(FormatDate(day), name);
		}
	}

	changeHash(hash: string) {
		this.hash = hash;
		return true;
	}

	get Auth(): Auth {
		return {username: this.username, token: this.token};
	};

	static createMap<T>(obj: any): Map<string, T[]> {
		const res = new Map<string, T[]>();
		Object.keys(obj).forEach(k => res.set(k, obj[k]));
		return res;
	}
	
	static fromUser(userObject: User): User {
		let res = new User(userObject.username, userObject.hash);

		res.lastLogin = new Date(userObject.lastLogin);
		res.token = userObject.token;
		res.weeklyEvents = userObject.weeklyEvents;
		res.roles = userObject.roles;
		res.continuousGoals = userObject.continuousGoals;
		res.jsonExtras = userObject.jsonExtras;

		res.getJsonVariables();

		return res;
	}

	getHash: () => string = () => {
		return this.hash;
	};

	toJson = () => {
		this.setJsonVariables();
		return JSON.stringify(this);
	};

	private setJsonVariables() {
		this.jsonExtras.longTermGoals = serializeMap(this.longTermGoals);
		this.jsonExtras.yearlyGoals = serializeMap(this.yearlyGoals);
		this.jsonExtras.monthlyGoals = serializeMap(this.monthlyGoals);
		this.jsonExtras.weeklyGoals = serializeMap(this.weeklyGoals);
		this.jsonExtras.dailyGoals = serializeMap(this.dailyGoals);
		this.jsonExtras.events = serializeMap(this.events);
	}

	static fromJson = (json: string) => {
		let user: User = User.fromUser(JSON.parse(json));
		user.getJsonVariables();
		return user;
	};

	private getJsonVariables() {
		this.longTermGoals = deserializeMap(this.jsonExtras.longTermGoals);
		this.yearlyGoals = deserializeMap(this.jsonExtras.yearlyGoals);
		this.monthlyGoals = deserializeMap(this.jsonExtras.monthlyGoals);
		this.weeklyGoals = deserializeMap(this.jsonExtras.weeklyGoals);
		this.dailyGoals = deserializeMap(this.jsonExtras.dailyGoals);
		this.events = deserializeMap(this.jsonExtras.events);
		this.events.forEach(eventArray => {
			eventArray.forEach(event => {
				event.date = new Date(event.date);
			})
		});
	}

	private jsonExtras = {
		longTermGoals: "",
		yearlyGoals: "",
		monthlyGoals: "",
		weeklyGoals: "",
		dailyGoals: "",
		events: ""
	};
}

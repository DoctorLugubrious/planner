import ReoccurringWeeklyEvent from "../goalData/ReoccurringWeeklyEvent";
import Goal from "../goalData/Goal";
import DailyGoal from "../goalData/DailyGoal";
import {ScheduledEvent} from "../goalData/ScheduledEvent";
import FormatDate from "../utility/datesAndTimes/FormatDate";
import RepeatingGoal from "../goalData/RepeatingGoal";
import {Auth} from "../server/Auth";

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


	checkHash(hash: string) : boolean {
		return hash === this.hash;
	}

	static addEmptyArray<T>(map: Map<string, T[]>, key: string) {
		if (map.get(key) === undefined) {
			map.set(key, []);
		}
	}

	//DELETE
	private static deleteFromArray(array: any[], testFunc: (item: any) => boolean) {
		let index = array.findIndex(testFunc);
		console.log(index, array);
		if (index != -1) {
			array.splice(index, 1);
		}
	};

	private static addToArray<T>(array: T[], item: T, duplicate: (dupe: T) => boolean): boolean {
		if (array.findIndex(duplicate) === -1) {
			array.push(item);
			return true;
		}
		return false;
	}

	deleteWeeklyEvent = (name: string) => {
		User.deleteFromArray(this.weeklyEvents, (item: ReoccurringWeeklyEvent) => {
			return item.name == name;
		});
	};

	deleteLongTermGoal = (role: string, name: string) => {
		this.deleteFromMap(this.longTermGoals, role, (item: Goal) => {
			return item.name == name;
		})
	};

	deleteYearlyGoal = (role: string, name: string) => {
		this.deleteFromMap(this.yearlyGoals, role, (item: Goal) => {
			return item.name == name;
		})
	};

	deleteMonthlyGoal = (role: string, name: string) => {
		this.deleteFromMap(this.monthlyGoals, role, (item: Goal) => {
			return item.name == name;
		})
	};

	deleteWeeklyGoal = (role: string, name: string) => {
		this.deleteFromMap(this.weeklyGoals, role, (item: Goal) => {
			return item.name == name;
		})
	};

	deleteDailyGoal = (date: Date, name: string) => {
		let dateFormat = FormatDate(date);
		this.deleteFromMap(this.dailyGoals, dateFormat, (item: DailyGoal) => {
			return item.name === name;
		})
	};

	deleteEvent = (date: Date, name: string) => {
		let dateFormat = FormatDate(date);
		this.deleteFromMap(this.events, dateFormat, (item: ScheduledEvent) => {
			return item.name === name;
		})
	};

	deleteRole = (role: string) => {
		User.deleteFromArray(this.roles, (item: string) => {
			return item === role;
		})
	};

	deleteContinuous = (goal: RepeatingGoal)  => {
		User.deleteFromArray(this.continuousGoals, item => item.name == goal.name);
	};

	addWeeklyEvent = (event: ReoccurringWeeklyEvent) => {
		return User.addToArray(this.weeklyEvents, event, (item: ReoccurringWeeklyEvent) => {
			return item.name === event.name;
		})
	};

	addRole = (role: string) => {
		User.addEmptyArray(this.longTermGoals, role);
		User.addEmptyArray(this.monthlyGoals, role);
		User.addEmptyArray(this.yearlyGoals, role);
		User.addEmptyArray(this.weeklyGoals, role);

		return User.addToArray(this.roles, role, (item: string) => {
			return item === role;
		});
	};

	addDailyGoal = (date: Date, goal: DailyGoal) => {
		let formatDate = FormatDate(date);
		User.addEmptyArray(this.dailyGoals, formatDate);
		return this.addToMap(this.dailyGoals, formatDate, goal, (item: DailyGoal) => goal.name === item.name);
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
		return this.addToMap(this.weeklyGoals, role, goal, (item: Goal) => goal.name === item.name);
	};

	addContinuous = (goal: RepeatingGoal) => {
		return User.addToArray(this.continuousGoals, goal, dupe => goal.name == dupe.name);
	};

	updateDailyGoal = (date: Date, goal: DailyGoal, oldName: string) => {
		let dateFormat = FormatDate(date);
		this.deleteDailyGoal(date, oldName);
		User.addEmptyArray(this.dailyGoals, dateFormat);
		this.addDailyGoal(date, goal);
	};

	updateEvent = (event: ScheduledEvent, oldName: string, oldDate: Date) => {
		let newDateFormat = FormatDate(event.date);
		let oldDateFormat = FormatDate(oldDate);
		this.deleteFromMap(this.events, oldDateFormat, item => item.name === oldName);
		User.addEmptyArray(this.events, newDateFormat);
		this.addToMap(this.events, newDateFormat, event, dupe => dupe.name === event.name);
	};

	//UPDATE

	private deleteFromMap(map: Map<string, any[]>, key: string, testFunc: (item: any) => boolean) {
		let array = map.get(key);

		if (array != undefined) {
			User.deleteFromArray(array, testFunc);
		}
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
		return User.addToArray(array, item, duplicate);
	};

	private UpdateArray<T>(array: T[], item: T, duplicate: (dupe: T) => boolean): boolean {
		User.deleteFromArray(array, duplicate);
		return User.addToArray(array, item, duplicate);
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
			that.dailyGoals = new Map<string, DailyGoal[]>();
		}

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

	changeHash(hash: string) {
		this.hash = hash;
	}

	get Auth(): Auth {
		return {username: this.username, token: this.token};
	};
}
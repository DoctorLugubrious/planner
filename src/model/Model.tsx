import ServerProxy from '../server/ServerProxy';
import DailyGoal from "../goalData/DailyGoal";
import ReoccurringWeeklyEvent from "../goalData/ReoccurringWeeklyEvent";
import Goal from "../goalData/Goal";
import goal from "../goalData/Goal";
import {GoalType} from "../goalData/GoalType";
import {ViewType} from "../views/ViewTypes";

import Listener from "../views/Listener";
import RepeatingGoal from "../goalData/RepeatingGoal";
import FormatDate from '../utility/datesAndTimes/FormatDate';
import {Auth} from "../server/Auth";
import ServerResponse from "../server/responseData/ServerResponse";
import {ScheduledEvent} from "../goalData/ScheduledEvent";
import User from "./User";
import {GoalWithType} from "../goalData/GoalWithType";

import Cookies from 'universal-cookie';
import WeeklyEventView from "../views/weeklyEvents/WeeklyEvent";
import DecomposeResult from "../server/responseData/DecomposeResult";

export default class Model {
	get date(): Date {
		return this._date;
	}

	set date(value: Date) {
		this._date = value;
		this.server.getDate(this.auth, value).then(value1 => {
			if (value1.data !== null) {
				this.user.dailyGoals.set(FormatDate(value), value1.data.goals);
				this.user.events.set(FormatDate(value), value1.data.events);
				this.emitEvent();
			}
			else {
				console.log(value1.error);
			}
		});

	}

	resetDate() {
		this._date = new Date();
	}

	startDecomposeGoal = (goal: goal, type: GoalType, role: string) => {
		this.currentlyWorking = type;
		this.currentGoal = goal;
		this.currentRole = role;
		this.changeView(ViewType.DECOMPOSE);
		this.changeView(ViewType.DECOMPOSE);
	};


	 private _date :Date = new Date();
	 
	 currentlyWorking: GoalType = GoalType.LONG_TERM;
	 currentGoal: goal = {name:""};
	 currentRole: string = "";

	 currentEvent: ScheduledEvent = {
		 date: new Date(),
		 len: 0,
		 name: "",
	 };

	 private get auth(): Auth {
	 	return {username: this.user.username, token: this.user.token};
	 }

	changeView: (name: ViewType) => void;
	private server : ServerProxy;

	view: Listener | null = null;

	private user : User;

	private readonly cookies: Cookies;

	private static readonly usernameKey : string = 'username';
	private static readonly authKey : string = 'token';

	private emitEvent = () => {
		if (this.view) {
			this.view.event(this);
		}
	};

	constructor(changeView: (name: ViewType) => void) {
		this.changeView = changeView;
		this.server = new ServerProxy();

		this.cookies = new Cookies();

		let username: string = this.cookies.get(Model.usernameKey);
		let token: string = this.cookies.get(Model.authKey);

		this.user = new User("", "");
		if (username != "" && token != "") {
			this.server.sync({username: username, token: token}).then((res: ServerResponse<User>) => {
				if (res.isError || res.data === null) {
					console.log("server did not accept token");
				}
				else {
					this.user = res.data;
					this.emitEvent();
				}
			});
		}
	}

	private updateAfterServer<T>(promise: Promise<ServerResponse<T>>,
								 //callback: (item: T) => void,
								 key: string,
								 errorMessage: string) {
		promise.then((value => this.processResult(value, errorMessage, key)));
	}

	private updateAfterDecompose(promise: Promise<ServerResponse<DecomposeResult>>) {
		promise.then(value => {
			if (value.data != null) {
				this.user.weeklyGoals = value.data.weekly;
				this.user.monthlyGoals = value.data.monthly;
				this.user.yearlyGoals = value.data.yearly;
				this.user.longTermGoals = value.data.longTerm;
				this.user.continuousGoals = value.data.continuous;
			}
			else {
				console.log(value.error);
			}
		});
	}

	private processResult<T>(res: ServerResponse<T>, errorMessage: string, key: string) {

		if (!res.isError && res.data !== null) {
			if (this.user.hasOwnProperty(key)) {
				(this.user as any)[key] = res.data;
			}
			else {
			}
			this.emitEvent();
		} else {
			//TODO show this on the UI
			console.log(res.error);
		}
	}


////////////////////////	LONG TERM
	addLongTermGoal = (goal: Goal, role: string) => {
		this.updateAfterServer(this.server.addLongTermGoal(this.auth, goal, role),
				"longTermGoals",
			"ADDING A LONG TERM GOAL FALED");
	};
	decomposeLongTermGoal = (goals: GoalWithType[]) => {
		this.updateAfterDecompose(this.server.decomposeLongTermGoal(this.auth, this.currentRole, this.currentGoal, goals));
	};
	deleteLongTermGoal = (role: string, name: string) => {
		this.updateAfterServer(this.server.deleteLongTermGoal(this.auth, role, name),
			"longTermGoals",
			"DELORTING A LONG TERM GOAL FALED");
	};
	get longTermGoals(): Map<string, Goal[]> {
		return this.user.longTermGoals;
	}
////////////////////////	YEARLY
	addYearlyGoal= (goal: Goal, role: string) => {
		this.updateAfterServer(this.server.addYearlyGoal(this.auth, goal, role),
			"yearlyGoals",
			"ADDING A YEARLY GOAL FALED");
	};
	deleteYearlyGoal = (role: string, name: string) => {
		this.updateAfterServer(this.server.deleteYearlyGoal(this.auth, role, name),
			"yearlyGoals",
			"DELETING A YEARLY GOAL FALED");
	};
	decomposeYearlyGoal = (goals: GoalWithType[]) => {
		this.updateAfterDecompose(this.server.decomposeYearlyGoal(this.auth, this.currentRole, this.currentGoal, goals));
	};
	get yearlyGoals(): Map<string, Goal[]> {
		return this.user.yearlyGoals;
	}
////////////////////////	MONTHLY
	addMonthlyGoal= (goal: Goal, role: string) => {
		this.updateAfterServer(this.server.addMonthlyGoal(this.auth, goal, role),
			'monthlyGoals',
			"ADDING A MONTHLY FALED");
	};
	decomposeMonthlyGoal = (goals: GoalWithType[]) => {
		this.updateAfterDecompose(this.server.decomposeMonthlyGoal(this.auth, this.currentRole, this.currentGoal, goals));
	};
	deleteMonthlyGoal = (role: string, name: string) => {
		this.updateAfterServer(this.server.deleteMonthlyGoal(this.auth, role, name),
			'monthlyGoals',
			"DECOMPOSING A MONTHLY GOAL FALED");
	};
	get monthlyGoals(): Map<string, Goal[]> {
		return this.user.monthlyGoals;
	}
////////////////////////	WEEKLY
	addWeeklyGoal= (goal: Goal, role: string) => {
		this.updateAfterServer(this.server.addWeeklyGoal(this.auth, goal, role),
			'weeklyGoals',
			"ADDING A WEEKLY GOAL FALED");
	};
	decomposeWeeklyGoal = (goals: GoalWithType[]) => {
		this.updateAfterDecompose(this.server.decomposeWeeklyGoal(this.auth, this.currentRole, this.currentGoal, goals));
	};
	deleteWeeklyGoal = (role: string, name: string) => {
		this.updateAfterServer(this.server.deleteWeeklyGoal(this.auth, role, name),
			'weeklyGoals',
			"DELETING A WEEKLY GOAL FALED");
	};
	get weeklyGoals(): Map<string, Goal[]> {
		return this.user.weeklyGoals;
	}
////////////////////////	DAILY
	updateAfterDailyGoal = (result: Promise<ServerResponse<Map<string, DailyGoal[]>>>) => {
		result.then(value => {
			if (value.data != null) {
				value.data.forEach((value: DailyGoal[], key:string) => {
					this.user.dailyGoals.set(key, value);
				});
				this.emitEvent();
			}
			else {
				console.log(value.error);
			}
		})
	};

	addDailyGoal= (goal: DailyGoal) => {
		this.updateAfterDailyGoal(this.server.addDailyGoal(this.date, goal, this.auth));
	};
	addDailyGoalForDate = (date: Date, goal: DailyGoal) => {
		this.updateAfterDailyGoal(this.server.addDailyGoal(date, goal, this.auth));
	};
	updateDailyGoal = (goal: DailyGoal, oldName: string) => {
		this.updateAfterDailyGoal(this.server.decomposeDailyGoal(this.date, goal, oldName, this.auth));
	};
	deleteDailyGoal = (goal: DailyGoal) => {
		this.updateAfterDailyGoal(this.server.deleteDailyGoal(this.date, goal, this.auth));
	};
	get dailyGoals(): DailyGoal[] {
		let res: DailyGoal[] = [];

		console.log();
		let temp :DailyGoal[]|undefined = this.user.dailyGoals.get(FormatDate(this._date));
		if (temp !== undefined) {
			res = temp;
		}


		return res;
	}

////////////////////////	REPEATING
	addRepeatingGoal= (event: RepeatingGoal) => {
		this.updateAfterServer(this.server.addRepeatingGoal(event, this.auth),
			'continuousGoals',
			'ADDING A REPEATING GOAL FALED');
	};
	deleteRepeatingGoal = (event: RepeatingGoal) => {
		this.updateAfterServer(this.server.deleteRepeatingGoal(event, this.auth),
			'continuousGoals',
			'DELETING REPEATING GOAL FALED');
	};
	get repeatingGoals(): RepeatingGoal[] {
		return this.user.continuousGoals;
	};

////////////////////////	SCHEDULED

	addScheduledEvent = (event: ScheduledEvent) => {
		this.server.addScheduledEvent(event, this.auth).then(value => {
			if (value.data != null) {
				value.data.forEach((value: ScheduledEvent[], key:string) => {
					this.user.events.set(key, value);
				});
			}
			else {
				console.log(value.error);
			}
		})
	};

	deleteScheduledEvent = (event: ScheduledEvent) => {
		this.server.deleteScheduledEvent(event, this.auth).then(value => {
			if (value.data != null) {
				value.data.forEach((value: ScheduledEvent[], key:string) => {
					this.user.events.set(key, value);
				});
			}
			else {
				console.log(value.error);
			}
		})
	};
	updateScheduledEvent = (event: ScheduledEvent, oldName: string) => {
		this.server.updateScheduledEvent(event, oldName, this.date, this.auth).then(value => {
			if (value.data != null) {
				value.data.forEach((value: ScheduledEvent[], key:string) => {
					this.user.events.set(key, value);
				});
			}
			else {
				console.log(value.error);
			}
		})
	};
	get scheduledEvents(): ScheduledEvent[] {
		let res = this.user.events.get(FormatDate(this._date));
		if (res === undefined) {
			return [];
		}
		return res;
	}

////////////////////////	SCHEDULED REPEATING
	addWeeklyEvent = (event: ReoccurringWeeklyEvent) => {
		this.updateAfterServer(this.server.addWeeklyEvent(event, this.auth),
			'weeklyEvents',
			'ADDING WEEKLY EVENT FALED');
	};
	deleteWeeklyEvent = (event: ReoccurringWeeklyEvent) => {
		this.updateAfterServer(this.server.deleteWeeklyEvent(event, this.auth),
			'weeklyEvents',
			'DELETING WEEKLY EVENT FALED');
	};
	updateWeeklyEvent = (event: ReoccurringWeeklyEvent, oldName: string) => {
		this.updateAfterServer(this.server.updateWeeklyEvent(event, oldName, this.auth),
			'weeklyEvents',
			'UPDATING WEEKLY EVENT FALED');
	};
	get weeklyEvents(): ReoccurringWeeklyEvent[] {
		return this.user.weeklyEvents;
	}
	getWeeklyEventsForDate() : ReoccurringWeeklyEvent[] {
		let dayIndex: number = this.date.getDay();
		let dayName = WeeklyEventView.dayOptions[dayIndex];
		return this.user.weeklyEvents.filter(value =>
			value.days.findIndex(item => item === dayName) != -1);
	}

////////////////////////	ROLES
	addRole = (role: string) => {
		this.updateAfterServer(this.server.addRole(role, this.auth),
			'roles',
			'ADDING ROLE FALED');
	};
	deleteRole = (role: string) => {
		this.updateAfterServer(this.server.deleteRole(role, this.auth),
			'roles',
			'DELETE ROLE FALED');
	};
	get roles(): string[] {
		return this.user.roles;
	}

////////////////////////	USER INFO
	changePassword = (newPassword: string) => {
		this.server.changePassword(this.username, this.auth, newPassword).then(() => {
			this.emitEvent();
			//TODO do something here
		})
	};
	login = (username: string, password: string) => {
		this.server.login(username, password).then((value: ServerResponse<User>) => {
			if (value.isError) {
				console.log("LOGIN FALED");
			}
			else {
				// @ts-ignore
				this.user = value.data;
				this.setCookie(this.user.Auth);
				this.emitEvent();
			}
		});
	};
	register = (username: string, password: string) => {
		this.server.register(username, password).then((value: ServerResponse<User>) => {
			if (value.isError) {
				console.log("REGISTER FALED");
			}
			else {
				// @ts-ignore
				this.user = value.data;
				this.setCookie(this.user.Auth);
				this.emitEvent();
			}
		});
	};
	get username() :string {
		return this.user.username;
	}
	get lastLogin() :Date {
		return this.user.lastLogin;
	}

	private setCookie(auth: Auth) {
		this.cookies.set(Model.usernameKey, auth.username);
		this.cookies.set(Model.authKey, auth.token);
	}

}

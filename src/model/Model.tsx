git import ServerProxy from '../server/ServerProxy';
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
import {deserializeMap} from "../utility/mapSerialization/maps";
import GetDay from "../utility/datesAndTimes/GetDay";
import {disconnect} from "cluster";
import AssignWeeklyResult from "../server/responseData/AssignWeeklyResult";

export default class Model {
	get date(): Date {
		return this._date;
	}

	errorMessage: string = "";

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

	 firstLogin :boolean = false;



	constructor(changeView: (name: ViewType) => void) {
		this.changeView = changeView;
		this.server = new ServerProxy();

		this.cookies = new Cookies();

		this.user = new User("", "");

		this.sync(false);
	}

	private sync(printError: boolean = true) {
		let username: string = this.cookies.get(Model.usernameKey);
		let token: string = this.cookies.get(Model.authKey);
		if (username != "" && token != "") {
			this.server.sync({username: username, token: token}).then((res: ServerResponse<string>) => {
				res = ServerResponse.fromObject(res);
				if (res.isError || res.data === null) {
					if (printError) {
						this.postError("server did not accept token");
					}
				}
				else {
					let oldDailyGoals = this.user.dailyGoals;
					this.user = User.fromJson(res.data);
					this.user.token = token;
					this.setOldDailyGoals(oldDailyGoals);
					this.emitEvent();
				}
			}).catch((error: string) => {
				if (printError) {
					this.postError(error);
				}
			});
		}
	}

	private setOldDailyGoals(oldDailyGoals: Map<string, DailyGoal[]>) {
		oldDailyGoals.forEach((value: DailyGoal[], date: string) => {
			if(this.user.dailyGoals.get(date) == undefined) {
				this.user.dailyGoals.set(date, value);
			}
		});
	}

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

	set date(value: Date) {
		this._date = value;
		this.server.getDate(this.auth, value).then(value1 => {
			value1 = ServerResponse.fromObject(value1);
			if (value1.data !== undefined) {
				if (value1.data !== null) {
					value1.data.events.forEach((event) => {
						event.date = new Date(event.date);
					});
					if(value1.data.goals != undefined) {
						this.user.dailyGoals.set(FormatDate(value), value1.data.goals);
					}
					else {
						this.user.dailyGoals.set(FormatDate(value), []);
					}
					this.user.events.set(FormatDate(value), value1.data.events);
					this.emitEvent();
				}
				else {
					this.postError(value1.error);
				}
			}
		});

	}

	private updateAfterServer<T>(promise: Promise<ServerResponse<T>>,
								 //callback: (item: T) => void,
								 key: string,
								 errorMessage: string) {
		promise.then((value => this.processResult(value, errorMessage, key)));
	}

	private updateAfterServerMap<T>(promise: Promise<ServerResponse<string>>,
	                             //callback: (item: T) => void,
	                             key: string,
	                             errorMessage: string) {
		promise.then((value => this.processResultMap<T>(value, errorMessage, key)));
	}

////////////////////////	DAILY
	updateAfterDailyGoal = (result: Promise<ServerResponse<string>>) => {
		result.then(value => {
			value = ServerResponse.fromObject(value);
			if (value.data != null) {
				let resultMap : Map<string, DailyGoal[]> = deserializeMap(value.data);
				resultMap.forEach((value: DailyGoal[], key: string) => {
					this.user.dailyGoals.set(key, value);
				});
				this.emitEvent();
				this.sync();
			}
			else {
				this.postError(value.error);
			}
		})
	};

	addScheduledEvent = (event: ScheduledEvent) => {
		this.server.addScheduledEvent(event, this.auth).then(value => {
			value = ServerResponse.fromObject(value);
			if (value.data != null) {
				let events: Map<string, ScheduledEvent[]> = deserializeMap(value.data);
				events.forEach((value: ScheduledEvent[], key: string) => {
					value.forEach((item) => {
						item.date = new Date(item.date);
					});
					this.user.events.set(key, value);
				});
			}
			else {
				this.postError(value.error);
			}
		})
	};

	deleteScheduledEvent = (event: ScheduledEvent) => {
		this.server.deleteScheduledEvent(event, this.auth).then(value => {
			value = ServerResponse.fromObject(value);
			if (value.data != null) {
				let result: Map<string, ScheduledEvent[]> = deserializeMap(value.data);
				result.forEach((value: ScheduledEvent[], key: string) => {
					value.forEach((item) => {
						item.date = new Date(item.date);
					});
					this.user.events.set(key, value);
				});
				this.emitEvent();
			}
			else {
				this.postError(value.error);
			}
		})
	};


////////////////////////	LONG TERM
	addLongTermGoal = (goal: Goal, role: string) => {
		this.updateAfterServerMap(this.server.addLongTermGoal(this.auth, goal, role),
				"longTermGoals",
			"ADDING A LONG TERM GOAL FALED");
	};
	decomposeLongTermGoal = (goals: GoalWithType[], keep: boolean) => {
		this.updateAfterDecompose(this.server.decomposeLongTermGoal(this.auth, this.currentRole, this.currentGoal, goals, keep));
	};
	deleteLongTermGoal = (role: string, name: string) => {
		this.updateAfterServerMap(this.server.deleteLongTermGoal(this.auth, role, name),
			"longTermGoals",
			"DELORTING A LONG TERM GOAL FALED");
	};
	get longTermGoals(): Map<string, Goal[]> {
		return this.user.longTermGoals;
	}
////////////////////////	YEARLY
	addYearlyGoal= (goal: Goal, role: string) => {
		this.updateAfterServerMap(this.server.addYearlyGoal(this.auth, goal, role),
			"yearlyGoals",
			"ADDING A YEARLY GOAL FALED");
	};
	deleteYearlyGoal = (role: string, name: string) => {
		this.updateAfterServerMap(this.server.deleteYearlyGoal(this.auth, role, name),
			"yearlyGoals",
			"DELETING A YEARLY GOAL FALED");
	};
	decomposeYearlyGoal = (goals: GoalWithType[], keep: boolean) => {
		this.updateAfterDecompose(this.server.decomposeYearlyGoal(this.auth, this.currentRole, this.currentGoal, goals, keep));
	};
	get yearlyGoals(): Map<string, Goal[]> {
		return this.user.yearlyGoals;
	}
////////////////////////	MONTHLY
	addMonthlyGoal= (goal: Goal, role: string) => {
		this.updateAfterServerMap(this.server.addMonthlyGoal(this.auth, goal, role),
			'monthlyGoals',
			"ADDING A MONTHLY FALED");
	};
	decomposeMonthlyGoal = (goals: GoalWithType[], keep: boolean) => {
		this.updateAfterDecompose(this.server.decomposeMonthlyGoal(this.auth, this.currentRole, this.currentGoal, goals, keep));
	};
	deleteMonthlyGoal = (role: string, name: string) => {
		this.updateAfterServerMap(this.server.deleteMonthlyGoal(this.auth, role, name),
			'monthlyGoals',
			"DECOMPOSING A MONTHLY GOAL FALED");
	};
	get monthlyGoals(): Map<string, Goal[]> {
		return this.user.monthlyGoals;
	}
////////////////////////	WEEKLY
	addWeeklyGoal= (goal: Goal, role: string) => {
		this.updateAfterServerMap(this.server.addWeeklyGoal(this.auth, goal, role),
			'weeklyGoals',
			"ADDING A WEEKLY GOAL FALED");
	};
	decomposeWeeklyGoal = (goals: GoalWithType[], keep: boolean) => {
		this.updateAfterDecompose(this.server.decomposeWeeklyGoal(this.auth, this.currentRole, this.currentGoal, goals, keep));
	};
	deleteWeeklyGoal = (role: string, name: string) => {
		this.updateAfterServerMap(this.server.deleteWeeklyGoal(this.auth, role, name),
			'weeklyGoals',
			"DELETING A WEEKLY GOAL FALED");
	};
	assignWeeklyGoal = ( role: string, goal: Goal, day: Date) => {
		this.server.assignWeeklyGoal(this.auth, goal, role, day).then((result :ServerResponse<AssignWeeklyResult>) => {
			result = ServerResponse.fromObject(result);
			if (result.data != null) {
				let newDailyGoals: Map<string, DailyGoal[]> = deserializeMap(result.data.daily);
				this.user.weeklyGoals = deserializeMap(result.data.weekly);
				newDailyGoals.forEach((value: DailyGoal[], key: string) => {
					this.user.dailyGoals.set(key, value);
				});
				this.emitEvent();
			}
			else {
				this.postError(result.error);
			}
		})
	};
	get weeklyGoals(): Map<string, Goal[]> {
		return this.user.weeklyGoals;
	}

	updateScheduledEvent = (event: ScheduledEvent, oldName: string) => {
		this.server.updateScheduledEvent(event, oldName, this.date, this.auth).then(value => {
			value = ServerResponse.fromObject(value);
			if (value.data != null) {
				let result : Map<string, ScheduledEvent[]> = deserializeMap(value.data);
				result.forEach((value: ScheduledEvent[], key: string) => {
					value.forEach((item) => {
						item.date = new Date(item.date);
					});
					this.user.events.set(key, value);
				});
				this.emitEvent();
			}
			else {
				this.postError(value.error);
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


		let temp :DailyGoal[]|undefined = this.user.dailyGoals.get(FormatDate(this._date));
		if (temp !== undefined) {
			res = temp;
		}

		return res;
	}
	getDailyGoalsForDate(date: Date): DailyGoal[]|undefined {
		let result = this.user.dailyGoals.get(FormatDate(date));
		if (result == undefined) {
			this.date = date;
		}
		return result;
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
		return this.user.continuousGoals.filter((goal) =>
            this.hiddenRepeating.findIndex(name => name == goal.name) == -1
		)
	};

	private hiddenRepeating: string[] = [];

	hideRepeating(name: string) {
		this.hiddenRepeating.push(name);
	}

////////////////////////	SCHEDULED

////////////////////////	USER INFO
	changePassword = (newPassword: string) => {
		this.server.changePassword(this.username, this.auth, newPassword).then(() => {
			this.emitEvent();
			alert("PASSWORD CHANGED");
		})
	};

	login = (username: string, password: string) => {
		this.server.login(username, password).then((value: ServerResponse<string>) => {
			value = ServerResponse.fromObject(value);
			if (value.isError) {
				this.postError("LOGIN FALED");
			}
			else {
				//@ts-ignore
				this.user = User.fromJson(value.data);
				this.setCookie(this.user.Auth);
				this.emitEvent();
			}
		});
	};

	register = (username: string, password: string) => {
		this.server.register(username, password).then((value: ServerResponse<string>) => {
			value = ServerResponse.fromObject(value);

			if (value.isError) {
				this.postError("REGISTER FALED");
			}
			else {
				//@ts-ignore
				this.user = User.fromJson(value.data);
				this.setCookie(this.user.Auth);
				this.firstLogin = true;
				this.emitEvent();
			}
		});
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

	private updateAfterDecompose(promise: Promise<ServerResponse<DecomposeResult>>) {
		promise.then((value: ServerResponse<DecomposeResult>) => {
			value = ServerResponse.fromObject(value);
			if (value.data != null) {
				this.user.weeklyGoals = deserializeMap(value.data.weekly);
				this.user.monthlyGoals = deserializeMap(value.data.monthly);
				this.user.yearlyGoals = deserializeMap(value.data.yearly);
				this.user.longTermGoals = deserializeMap(value.data.longTerm);
				this.user.continuousGoals = value.data.continuous;
				this.emitEvent();
				this.sync();
			}
			else {
				this.postError(value.error);
			}
		});
	}

	errorMessageChanged = () => {};

	private postError(message: string) {
		this.errorMessage = message.toString();
		this.errorMessageChanged();
		setTimeout(() => {
			this.errorMessage = "";
			this.errorMessageChanged();
		}, 4000);
	}

	private processResult<T>(res: ServerResponse<T>, errorMessage: string, key: string) {
		res = ServerResponse.fromObject(res);
		if (!res.isError && res.data !== null) {
			if (this.user.hasOwnProperty(key)) {
				(this.user as any)[key] = res.data;
			}
			this.emitEvent();
			if (key === 'roles' || key == 'continuousGoals') {
				this.sync();
			}
		}
		else {
			this.postError(errorMessage + " " + res.error);
		}
	}

	private processResultMap<T>(res: ServerResponse<string>, errorMessage: string, key: string) {
		res = ServerResponse.fromObject(res);
		if (!res.isError && res.data !== null) {
			let value: Map<string, T> = deserializeMap(res.data);
			if (this.user.hasOwnProperty(key)) {
				(this.user as any)[key] = value;
			}
			if (key === 'weeklyGoals') {
				this.sync();
			}
			this.emitEvent();
		}
		else {
			this.postError(errorMessage + " " + res.error);
		}
	}

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

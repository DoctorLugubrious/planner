import ServerProxy from './ServerProxy'
import Presenter from "../presenters/Presenter";
import dailyGoal from "./dailyGoal";
import reoccurringWeeklyGoal from "./reoccurringWeeklyGoal";

export default class Model {
	date :Date = new Date();
	token :string = "";
	username :string = "";
	lastLogin :Date = Math.random() > 0.5 ? new Date() : new Date('2011-09-09');
	 dailyGoals :dailyGoal[] = [
		{name: 'daily event 1', completed: false, start: "", end: ""},
		{name: 'daily event 2', completed: false, start: "", end: ""},
		{name: 'daily event 3', completed: false, start: '10:00am', len: 5},
		{name: 'daily event 4', completed: false, start: '10:10am', len: 10}
	];
	reoccurringWeekly: reoccurringWeeklyGoal[] = [
		{name: 'class1', days:['M','W'], start: '9:00am', len: 5},
		{name: 'class2', days:['T','Th'], start: '9:00am', len: 5},
		{name: 'temple', days:['F'], start: '8:00am', len: 5},
	];

	changeView: (name: string) => void;
	server : ServerProxy;
	listener: Presenter | null = null;

	constructor(changeView: (name: string) => void) {
		this.changeView = changeView;
		this.server = new ServerProxy();
	}

	setEventListener(listener: Presenter) {
		this.listener = listener;
	}

	changeDate = (date: Date) => {
		this.server.postDate(date).then((res: any) => {
			this.date = res;
			this.notifyChange();
		});
	};

	notifyChange = () => {
		if (this.listener !== null) {
			this.listener.notifyChange();
		}
	};

	login = (username:string, password:string) => {
		this.server.login(username, password).then((res :any) => {
			this.username = username;
			this.token = res;
			this.notifyChange();
		}).catch((res) => {
			this.token = "";
			this.username = "";
			this.notifyChange();
		});
	};

	completeGoal = (name: string) => {
		this.dailyGoals.forEach((goal, index) => {
			if (goal.name === name) {
				this.server.completeGoal(goal).then((res: any) => {
					if (res !== null) {
							this.dailyGoals[index] = res;
							this.notifyChange();
					}
				});
			}
		});
	};

	assignDailyGoal = (name :string, start :string, end :string) => {
		this.dailyGoals.forEach((goal, index) => {
			if (goal.name === name) {
				this.server.assignDailyGoal(goal, start, end).then((res: any) => {
					this.dailyGoals[index] = res;
					this.notifyChange();
				});
			}
		});
	};

	deleteReocurring = (name :string) => {
		this.reoccurringWeekly.forEach((goal, index) => {
			if (goal.name === name) {
				this.server.deleteReoccurring(name).then((res) => {
					if (res) {
						this.reoccurringWeekly.splice(index, 1);
						this.notifyChange();
					}
				});
			}
		});
	}

}

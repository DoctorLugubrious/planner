import ServerProxy from './ServerProxy.js'

export default class Model {
	date = new Date();
	token = null;
	username = null;
	lastLogin = Math.random() > 0.5 ? new Date() : new Date('2011-09-09');
	dailyGoals = [
		{name: 'daily event 1', completed: false, start: null, end: null},
		{name: 'daily event 2', completed: false, start: null, end: null},
		{name: 'daily event 3', completed: false, start: '10:00am', len: 5},
		{name: 'daily event 4', completed: false, start: '10:10am', len: 10}
	];
	reoccuringWeekly = [
		{name: 'class1', days:['M','W'], start: '9:00am', len: 5},
		{name: 'class2', days:['T','Th'], start: '9:00am', len: 5},
		{name: 'temple', days:['F'], start: '8:00am', len: 5},
	];

	constructor(changeView) {
		this.changeView = changeView;
		this.server = new ServerProxy();
	}

	setEventListener(listener) {
		this.listener = listener
	}

	changeDate = (date) => {
		this.server.postDate(date).then((res) => {
			this.date = res;
			console.log("MODEL UPDATE");
			this.listener.notifyChange();
		});
	}

	login = (username, password) => {
		this.server.login(username, password).then((res) => {
			this.username = username;
			this.token = res;
			this.listener.notifyChange();
		}).catch((res) => {
			this.token = null;
			this.username = null;
			this.listener.notifyChange();
		});
	}

	completeGoal = (name) => {
		this.dailyGoals.forEach((goal, index) => {
			if (goal.name === name) {
				this.server.completeGoal(goal).then((res) => {
					if (res !== null) {
							this.dailyGoals[index] = res;
							this.listener.notifyChange();
					}
				});
			}
		});
	}

	assignDailyGoal = (name, start, end) => {
		this.dailyGoals.forEach((goal, index) => {
			if (goal.name === name) {
				this.server.assignDailyGoal(goal, start, end).then((res) => {
					this.dailyGoals[index] = res;
					this.listener.notifyChange();
				});
			}
		});
	}

	deleteReocurring = (name) => {
		this.reoccuringWeekly.forEach((goal, index) => {
			if (goal.name === name) {
				this.server.deleteReocurring(name).then((res) => {
					if (res) {
						this.reoccuringWeekly.splice(index, 1);
						this.listener.notifyChange();
					}
				});
			}
		});
	}

}

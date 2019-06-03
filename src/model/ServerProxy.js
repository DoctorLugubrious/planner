export default class ServerProxy {
	postDate(date) {
		return new Promise((resolve, reject) => setTimeout(() => {resolve(date)}, 1000));
	}

	login(username, password) {
		return new Promise((resolve, reject) => setTimeout(() => {
			if (username !== "") {
				resolve("VALID TOKEN")
			}
			else {
				resolve("");
			}
		}, 1000));
	}

	completeGoal = (goal) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			goal.completed = true;
			resolve(goal);
		}, 500));
	}

	assignDailyGoal(goal, start, end) {
		return new Promise((resolve, reject) => setTimeout(() => {
			goal.start = start;
			goal.end = end;
			resolve(goal);
		}, 500));
	}

	deleteReocurring = (name) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			resolve(true);
		}, 500));
	}
}

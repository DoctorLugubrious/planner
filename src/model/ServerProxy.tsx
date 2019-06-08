import dailyGoal from "./dailyGoal";

export default class ServerProxy {
	postDate(date: Date) {
		return new Promise((resolve, reject) => setTimeout(() => {resolve(date)}, 1000));
	}

	login(username :string, password :string) {
		return new Promise((resolve, reject) => setTimeout(() => {
			if (username !== "") {
				resolve("VALID TOKEN")
			}
			else {
				resolve("");
			}
		}, 1000));
	}

	completeGoal = (goal :{completed: boolean}) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			goal.completed = true;
			resolve(goal);
		}, 500));
	};

	assignDailyGoal(goal : dailyGoal, start:string, end:string) {
		return new Promise((resolve, reject) => setTimeout(() => {
			goal.start = start;
			goal.end = end;
			resolve(goal);
		}, 500));
	}

	deleteReoccurring = (name :string) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			resolve(true);
		}, 500));
	}
}

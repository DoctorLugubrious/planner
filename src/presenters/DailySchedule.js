import Presenter from './Presenter.js'
export default class DailySchedulePresenter extends Presenter {
	notifyChange = () => {
		this.view.onChange();
	}

	complete = (name) => {
		this.model.completeGoal(name);
	}

	events = () => {
		let goals = this.model.dailyGoals;
		let events = goals.filter(goal => goal.start !== null );
		return events;
	}

}

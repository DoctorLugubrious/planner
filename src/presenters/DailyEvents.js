import Presenter from './Presenter.js'
export default class DailyEventsPresenter extends Presenter {
	notifyChange = () => {
		this.view.onChange();
	}

	getEvents = () => {
		return this.model.dailyGoals;
	}

	assignEvent = (name, start, end) => {
		this.model.assignDailyGoal(name, start, end);
	}
}

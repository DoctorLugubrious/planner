import Presenter from './Presenter.js'
export default class WeeklyEventsPresenter extends Presenter {
	notifyChange = () => {
		this.view.onChange();
	}

	events = () => {
		return this.model.reoccuringWeekly;
	}

	deleteEvent = (name) => {
		this.model.deleteReocurring(name);
	}
}

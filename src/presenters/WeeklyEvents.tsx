import Presenter from './Presenter'
import Model from "../model/Model";
import WeeklyEventsView from "../views/WeeklyEvents";
export default class WeeklyEventsPresenter extends Presenter {
	notifyChange = () => {
		this.view.onChange();
	};

	events = () => {
		return this.model.reoccurringWeekly;
	};

	deleteEvent = (name:string) => {
		this.model.deleteReocurring(name);
	};

	constructor(view: WeeklyEventsView, model: Model) {
		super(model);
		this.view = view;
	}

	view: WeeklyEventsView;
}

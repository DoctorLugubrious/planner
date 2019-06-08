import Presenter from './Presenter'
import dailyGoal from "../model/dailyGoal";
import DailyEventsView from "../views/DailyEvents";
import Model from "../model/Model";
export default class DailyEventsPresenter extends Presenter {
	notifyChange: ()=>void = () => {
		this.view.onChange();
	};

	getEvents :()=>dailyGoal[] = () => {
		return this.model.dailyGoals;
	};

	assignEvent = (name:string, start:string, end:string) => {
		this.model.assignDailyGoal(name, start, end);
	};

	constructor(view: DailyEventsView, model: Model) {
		super(model);
		this.view = view;
	}


	view: DailyEventsView;
}

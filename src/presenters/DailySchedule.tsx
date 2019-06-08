import Presenter from './Presenter'
import dailyGoal from "../model/dailyGoal";
import DailyScheduleView from "../views/DailySchedule";
import Model from "../model/Model";
export default class DailySchedulePresenter extends Presenter {
	notifyChange = () => {
		this.view.onChange();
	};

	complete = (name:string) => {
		this.model.completeGoal(name);
	};

	events: ()=>dailyGoal[] = () => {
		let goals = this.model.dailyGoals;
		let events = goals.filter(goal => goal.start !== null );
		return events;
	};

	constructor(view: DailyScheduleView, model: Model) {
		super(model);
		this.view = view;
	}

	view: DailyScheduleView;

}

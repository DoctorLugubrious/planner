import Presenter from './Presenter'
import CalendarView from "../views/Calendar";
import Model from "../model/Model";

export default class CalendarPresenter extends Presenter {
	onChangeDate = (date:Date) => {
		this.model.changeDate(date)
	};

	notifyChange = () => {
		this.view.onChangeDate(this.model.date)
	};

	constructor(view: CalendarView, model:Model) {
		super(model);
		this.view = view;
	};

	view: CalendarView;
}

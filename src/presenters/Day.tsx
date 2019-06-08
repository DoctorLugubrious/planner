import Presenter from './Presenter'
import Model from "../model/Model";
import DayView from "../trash/Day";

export default class DayPresenter extends Presenter {
	notifyChange = () => {
		this.view.onChange(this.model.date);
	}

	constructor(view: DayView, model: Model) {
		super(model);
		this.view = view;
	}

	view: DayView;
}

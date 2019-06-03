import Presenter from './Presenter.js'

export default class DayPresenter extends Presenter {
	notifyChange = () => {
		this.view.onChange(this.model.date);
	}
}

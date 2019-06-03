import Presenter from './Presenter.js'

export default class CalendarPresenter extends Presenter {
	onChangeDate = (date) => {
		this.model.changeDate(date)
	}

	notifyChange = () => {
		this.view.onChangeDate(this.model.date)
	}
}

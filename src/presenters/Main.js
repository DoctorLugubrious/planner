import Presenter from './Presenter.js'
export default class MainPresenter extends Presenter {
	notifyChange = () => {
	}

	getLastLogin = () => {
		return this.model.lastLogin;
	}
}

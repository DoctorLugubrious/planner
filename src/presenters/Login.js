import Presenter from './Presenter.js'
export default class LoginPresenter extends Presenter {
	notifyChange = () => {
		let token = this.model.token;
		if (token != null && token !== "") {
			this.onChangeView("MAIN");
		}
		else {
			this.view.notifyLoginFail();
		}
	}

	login = (username, password) => {
		this.model.login(username, password);
	}
}

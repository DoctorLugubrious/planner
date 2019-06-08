import Presenter from './Presenter'
import Model from "../model/Model";
import LoginView from "../views/Login";
export default class LoginPresenter extends Presenter {
	notifyChange = () => {
		let token = this.model.token;
		if (token != null && token !== "") {
			this.onChangeView("MAIN");
		}
		else {
			this.view.notifyLoginFail();
		}
	};

	login = (username :string, password :string) => {
		this.model.login(username, password);
	}

	constructor(view: LoginView, model: Model) {
		super(model);
		this.view = view;
	}

	view: LoginView;
}

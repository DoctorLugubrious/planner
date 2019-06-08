import Presenter from './Presenter'
export default class MainPresenter extends Presenter {
	notifyChange = () => {
	};

	getLastLogin: ()=> Date = () => {
		return this.model.lastLogin;
	}
}

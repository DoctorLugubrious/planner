
export default class Presenter {
	constructor(view, model) {
		this.model = model;
		this.view = view;
		model.setEventListener(this);
	}

	onChangeView = (viewName) => {
		this.model.changeView(viewName);
	}

	getAttribute(key) {
		return this.model[key];
	}

 	notifyChange = () => {
		console.log("A PRESENTER HAS NOT OVERRIDDEN THE notifyChange() METHOD");
	}
}


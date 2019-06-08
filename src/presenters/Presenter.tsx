import Model from "../model/Model";
import React from 'react';

export default class Presenter {
	constructor(model:Model) {
		this.model = model;
		model.setEventListener(this);
	}

	model: Model;

	onChangeView = (viewName: string) => {
		this.model.changeView(viewName);
	};

 	notifyChange = () => {
		console.log("A PRESENTER HAS NOT OVERRIDDEN THE notifyChange() METHOD");
	}
}


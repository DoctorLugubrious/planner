import * as React from "react";
import Model from "../model/Model";
import viewProps from "./data/viewProps";
import {viewState} from "./data/viewState";

export default class Listener {
	constructor(view: React.Component<viewProps, viewState>) {
		const model = view.props.model;
		this.view = view;

		if (!view.state) {
			view.state = {
				model,
			};
		}
		model.view = this;
	}

	view: React.Component<viewProps, viewState>;

	event(model: Model) {
		this.view.setState({model});
	}
}
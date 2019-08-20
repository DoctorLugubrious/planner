import Model from "../../model/Model";
import {ViewType} from "../ViewTypes";
import * as React from "react";

let ChangeViewButton = (props: {model: Model, view: ViewType, text:string}) => {
	return (<button onClick={() => props.model.changeView(props.view)}>
		{props.text}
	</button>)
};

export default ChangeViewButton;
import React from 'react'
import Model from "../../model/Model";

interface ChangeDayButtonProps {
	model: Model;
	text: string|JSX.Element;
	offset: number;
}

interface ChangeDayButtonState {
}

export default class ChangeDayButton extends React.Component<ChangeDayButtonProps, ChangeDayButtonState> {
	render() {
		return (<div>
			<button onClick={() => {
				let date = this.props.model.date;
				date.setDate(date.getDate() + this.props.offset);
				this.props.model.date = date;
			}}>
				{this.props.text}
			</button>
		</div>)
	}
}

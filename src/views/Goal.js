import React from 'react'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'

export default class Goal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: ['10:00', '11:00'],
		}
	}

	render = () => {
		const props = this.props;
		const state = this.state;
		return (
			<li>
				{props.name}
				<TimeRangePicker
					onChange={time => this.setState({ time })}
					value={state.time}
					disableClock={true}
				/>
				<button onClick={() => props.handleClick(props.name, state.time[0], state.time[1])}>
					assign
				</button>
			</li>
		);
	}
}

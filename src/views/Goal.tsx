import React, {ChangeEvent} from 'react'

interface GoalProps {
	name:string;
	handleClick:(name:string, time1:string, time2:string) => void;
}

export default class Goal extends React.Component<GoalProps, object> {
	constructor(props: GoalProps) {
		super(props);
		this.state = {
			time: ['10:00', '11:00'],
		}
	}

	state: {time: string[]};

	render = () => {
		const props = this.props;
		const state = this.state;
		return (
			<li>
				{props.name}
				<input type="time"
					onChange={(e :ChangeEvent<HTMLInputElement>) => this.setState({ time: e.target.value })}
				/>
				<button onClick={() => props.handleClick(props.name, state.time[0], state.time[1])}>
					assign
				</button>
			</li>
		);
	}
}


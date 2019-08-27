import * as React from "react";
import {ChangeEvent} from "react";
import DeepCopy from "../../utility/objects/DeepCopy";
import {GoalWithType} from "../../goalData/GoalWithType";
import {GoalType} from "../../goalData/GoalType";
import EnumSelect from "../input/EnumSelect";

interface GoalListProps {
	onFinish: (result: GoalWithType[]) => void;
}

interface GoalListState {
	items: GoalWithType[];
}

export default class GoalDecomposeList extends React.Component<GoalListProps, GoalListState> {
	constructor(props: GoalListProps) {
		super(props);
		this.state = {
			items: []
		}
	}

	current: GoalWithType = {name:"", type: GoalType.LONG_TERM};

	changeNewName = (e : ChangeEvent<HTMLInputElement>) => {
		this.current.name = e.currentTarget.value;
	};

	get enumResult(): string {
		return GoalType[this.current.type];
	};

	set enumResult(value: string) {
		//console.log(value);
		this.current.type = (GoalType as any)[value];
	};

	addItem = () => {
		let items = DeepCopy(this.state.items);
		items.push(this.current);
		this.current = {name:"", type: GoalType.LONG_TERM};

		let input :HTMLElement | null = document.getElementById('newInput');
		if (input != null && input instanceof HTMLInputElement) input.value = "";

		this.setState({
			items: items
		});
	};

	onFinish = () => {
		this.props.onFinish(this.state.items);
		this.setState({items: []});
	};

	render() {
		return (<div>
			<ol>
				{this.state.items.map((goal: GoalWithType, index: number) =>
					<li key={index}>{goal.name}: {GoalType[goal.type]}</li>
				)}
			</ol>
			<input type="text" onChange={this.changeNewName} id="newInput"/>
			<EnumSelect type={GoalType} container={this}/>
			<button onClick={this.addItem}>
				+
			</button>
			<button onClick={this.onFinish}>
				DECOMPOSE
			</button>
		</div>)
	}
}
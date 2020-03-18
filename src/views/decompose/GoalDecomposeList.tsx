import * as React from "react";
import {ChangeEvent} from "react";
import DeepCopy from "../../utility/objects/DeepCopy";
import {GoalWithType} from "../../goalData/GoalWithType";
import {GoalType} from "../../goalData/GoalType";
import EnumSelect from "../input/EnumSelect";
import {FiPlus, FiCheck} from "react-icons/all";

interface GoalListProps {
	onFinish: (result: GoalWithType[], keep: boolean) => void;
}

interface GoalListState {
	items: GoalWithType[];
	current: GoalWithType;
	keep: boolean;
}

export default class GoalDecomposeList extends React.Component<GoalListProps, GoalListState> {
	constructor(props: GoalListProps) {
		super(props);
		this.state = {
			items: [],
			keep: true,
			current: {name:"", type: GoalType.LONG_TERM},
		}
	}

	changeNewName = (e : ChangeEvent<HTMLInputElement>) => {
		let current = this.state.current;
		current.name = e.currentTarget.value;
		this.setState({current});
	};

	get enumResult(): string {
		return GoalType[this.state.current.type];
	};

	set enumResult(value: string) {
		let current = this.state.current;
		current.type = (GoalType as any)[value];
		this.setState({current});
	};

	addItem = () => {
		let items = DeepCopy(this.state.items);
		items.push(this.state.current);
		let current = {name:"", type: this.state.current.type};

		this.setState({
			items,
			current
		});
	};

	onFinish = () => {
		this.props.onFinish(this.state.items, this.state.keep);
		this.setState({items: []});
	};

	render() {
		return (<div className={'decomposeGoals'}>
			<ol className={'toCreateGoals'}>
				{this.state.items.map((goal: GoalWithType, index: number) =>
                      <li key={index}>
	                      <div className={'toCreateName'}>{goal.name}</div>
	                      <div className={'goalType'}>({GoalType[goal.type]})</div>
                      </li>
				)}
			</ol>
			<div className={'addDecompose'}>
				<input type="text" onChange={this.changeNewName} value={this.state.current.name}/>
				<EnumSelect type={GoalType} container={this}/>
				<button onClick={this.addItem}>
					<FiPlus/>
				</button>
			</div>

			<div className={'finish'}>
				Keep original goal?
				<input type="checkbox" checked={this.state.keep} onChange={(e) => {
					this.setState({
						keep: e.target.checked
					});
				}}/>

				<button onClick={this.onFinish}>
					DONE
				</button>
			</div>

		</div>)
	}
}

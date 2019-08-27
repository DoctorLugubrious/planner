import React from 'react'
import {ViewType} from "../../ViewTypes";
import HelpTextLibrary from "./HelpTextLibrary";
import RubySprite from "./RubySprite";
import HelpTextComponent from "./HelpTextComponent";

interface RubyViewProps {
	view: ViewType;
	complete: () => void;
}

interface RubyViewState {
	index: number
}

export default class RubyView extends React.Component <RubyViewProps, RubyViewState> {

	static textLibrary: HelpTextLibrary = new HelpTextLibrary();
	private readonly text: HelpTextComponent[];

	constructor(props: RubyViewProps) {
		super(props);

		this.text = RubyView.textLibrary.getText(props.view).data;

		this.state = {
			index: 0
		};
	}

	render() {
		let help = this.text[this.state.index];
		return (<div>
			<div>
				<p>{help.text}</p>
				<button onClick={this.increaseIndex}>-></button>
			</div>
			<RubySprite type={help.sprite}/>
		</div>)
	}

	private increaseIndex = () => {
		let newIndex = this.state.index + 1;
		if (newIndex >= this.text.length) {
			this.props.complete();
		}
		else {
			this.setState({index: newIndex});
		}
	};
}
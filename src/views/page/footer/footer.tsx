import {ViewType} from "../../ViewTypes";
import * as React from "react";
import RubyView from "./RubyView";

interface footerProps {
	view: ViewType;
}

interface footerState {
	showRuby: boolean;
}

export default class Footer extends React.Component<footerProps, footerState> {
	constructor(props: footerProps) {
		super(props);
		this.state = {
			showRuby: false,
		}
	}

	render() {
		let ruby: JSX.Element | null = null;
		if (this.state.showRuby) {
			ruby = <RubyView
				view={this.props.view}
				complete={() => this.setState({showRuby: false})}
			/>;
		}
		else {
			ruby = (<button onClick={() => this.setState({showRuby: true})}>
				Help button for {ViewType[this.props.view]}
			</button>);
		}

		return (<div>
			Copyright Avery Green 2019
			{ruby}
		</div>);
	}
};

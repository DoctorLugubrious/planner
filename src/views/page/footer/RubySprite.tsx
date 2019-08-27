import React from 'react'
import {RubySpriteType} from "./RubySpriteType";

interface RubySpriteProps {
	type: RubySpriteType;
}

interface RubySpriteState {
}

export default class RubySprite extends React.Component<RubySpriteProps, RubySpriteState> {
	render() {
		return (<div>
			{RubySpriteType[this.props.type]}
		</div>)
	}
}
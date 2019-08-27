import * as React from "react";
import {ChangeEvent} from "react";

type EnumType = { [s: number]: string };

interface SelectHolder {
	enumResult: string;
}

interface EnumSelectProps {
	type: EnumType;
	container: SelectHolder;
}

export default class EnumSelect extends React.Component<EnumSelectProps, {}> {
	mapEnum = (enumerable: EnumType, fn: Function) => {
		let enumMembers: any[] = Object.keys(enumerable).map(key => enumerable[key as any]);
		let enumValues: number[] = enumMembers.filter(v => typeof v === "string");
		return enumValues.map(m => fn(m));
	};

	onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		this.props.container.enumResult = e.target.value;
	};

	render = () => {
		return (<select onChange={this.onChange}>
			{this.mapEnum(this.props.type, (type: string) => {
				return (<option key={type}>
					{type}
				</option>);})}
		</select>);
	}
}
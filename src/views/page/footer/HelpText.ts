import HelpTextComponent from "./HelpTextComponent";

export default class HelpText {
	private readonly _data: HelpTextComponent[];

	constructor(...data: HelpTextComponent[]) {
		this._data = data;
	}

	get data() {
		return this._data;
	}

}
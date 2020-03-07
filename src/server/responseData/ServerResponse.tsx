

export default class ServerResponse<T> {
	private _error: string = "";

	setError(error: string) {
		this._error = error;
		this._data = null;
		this._isError = true;
	}

	static fromObject<T>(obj: ServerResponse<T>) {
		let result = new ServerResponse<T>();
		result._error = obj._error;
		result._data = obj._data;
		result._isError = obj._isError;

		return result;
	}

	get data(): T | null {
		return this._data;
	}

	get error(): string {
		return this._error;
	}

	get isError(): boolean  {
		return this._isError;
	}

	private _data: T|null = null;

	setData(data: T) {
		this._data = data;
		this._error = "";
		this._isError = false;
	}
	private _isError: boolean = false;
}

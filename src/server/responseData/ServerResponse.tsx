

export default class ServerResponse<T> {
	private _error: string = "";

	setError(error: string) {
		this._error = error;
		this._data = null;
		this._isError = true;
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


export default class ServerResponse<T> {
	setData(data: T) {
		this._data = data;
		this._error = null;
		this._isError = false;
	}

	setError(error: string) {
		this._error = error;
		this._data = null;
		this._isError = true;
	}

	get data(): T | null {
		return this._data;
	}

	get error(): string | null {
		return this._error;
	}

	get isError(): boolean  {
		return this._isError;
	}

	private _data: T|null = null;
	private _error: string|null = null;
	private _isError: boolean = false;
}
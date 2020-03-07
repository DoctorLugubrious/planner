
function serializeMap<T>(map: Map<string, T>) {
	let result: [string, T][] = [];
	map.forEach((value, key) => {
		result.push([key, value]);
	});
	return JSON.stringify(result);
}

function deserializeMap<T>(string: string): Map<string, T> {
	if (string == "") {
		return new Map<string, T>();
	}
	try {
		return JSON.parse(string).reduce((m: Map<string, T>, [key, val]: [string, T]) => m.set(key, val),
		                                 new Map<string, T>());
	}
	catch (e) {
		return new Map<string, T>();
	}
}

export {serializeMap, deserializeMap}

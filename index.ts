// TODO: get deeply nested JSON values
/*
const type = (obj: unknown) => Object.prototype.toString.call(obj);

const deepCheck = (object: object, keys: string[]) => {
	let currObject = object;
	for (let key of keys) {
		if (type(currObject) !== '[object Object]') break;
		if (key in currObject === false) break;

		currObject = currObject[key];
	}

	return {
		result: currObject,
		keys,
	}
}*/

type InputProxyOptions = {
	prevKey?: string;
}

export default (el: HTMLInputElement, options: InputProxyOptions = {}) => {
	let prevKey = options.prevKey || '__input_proxy_prev';
	el[prevKey] = {};
	let p = new Proxy(el, {
		set(el: HTMLInputElement, key: string, value: unknown) {

			const json = JSON.parse(el.value || '{}');

			if (key in json) el[prevKey][prevKey + '_' + key] = json[key];

			json[key] = value;
			el.value = JSON.stringify(json);

			return true;
		},
		get(el: HTMLInputElement, key: string) {
			if (key === '__value') return el.value;
			if (key === prevKey) return el[prevKey];

			const json = JSON.parse(el.value || '{}');

			if (key in json === false) {
				console.warn('Missing key in value, returning null.');
				return null;
			}

			return json[key];
		},
		deleteProperty(el, key) {
			const json = JSON.parse(el.value || '{}');

			if (key in json === false) {
				console.warn('Key was not in JSON, returning false.');
				return false;
			}

			Reflect.deleteProperty(json, key);

			if (key in json) throw Error('Key is still in JSON????');

			return true;
		}
	});

	return p;
}

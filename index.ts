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
const InputProxy = (el: HTMLInputElement) => {
	if (el.value === '') el.value = '{}'

	let p = new Proxy(el, {
		set(el: HTMLInputElement, key: string, value: unknown) {

			const json: object = JSON.parse(el.value);

			json[key] = value;
			el.value = JSON.stringify(json);

			return true;
		},
		get(el: HTMLInputElement, key: string) {
			if (key === '__value') return el.value;

			const json = JSON.parse(el.value);

			if (key in json === false) {
				console.warn('Missing key in value, returning null.');
				return null;
			}

			return json[key];
		},
		deleteProperty(el, key) {
			const json = JSON.parse(el.value);

			if (key in json === false) {
				console.warn('Missing key, returning false.');
				return false;
			}

			return Reflect.deleteProperty(json, key);
		}
	});

	return p;
}

export default InputProxy;

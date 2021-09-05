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
let _: object, v: string = 'value', p = JSON.parse, s = JSON.stringify,
	IP = (el: HTMLInputElement) => {
		el[v] = '{}';
		return new Proxy(el, {
			set(x: HTMLInputElement, k: string, u: unknown) {
				(_ = p(el[v]))[k] = u;
				el[v] = s(_);
				return !0;
			},
			get: (x: HTMLInputElement, key: string) => key === '__' + v ? el[v] : p(el[v])[key],
			deleteProperty(x: HTMLInputElement, key: string) {
				delete (_ = p(el[v]))[key];
				el[v] = s(_);
				return !0;
			}
		});
	}

export {
	IP
};

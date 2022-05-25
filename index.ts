/**
 * InputProxy: An Uncomfortably Minified Proxy That JSONifies Your Objects For You
 */
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

let _: object, val = 'value', par = JSON.parse, str = JSON.stringify,
	IP = (el: HTMLInputElement) => {
		el[val] = el[val] === '' ? '{}' : el[val];
		return new Proxy(el, {
			set(x: HTMLInputElement, k: string, u: unknown) {
				(_ = par(x[val]))[k] = u;
				x[val] = str(_);
				return !0;
			},
			get: (x: HTMLInputElement, key: string) => key === '__' + val ? x[val] : par(x[val])[key],
			deleteProperty(x: HTMLInputElement, key: string) {
				delete (_ = par(x[val]))[key];
				x[val] = str(_);
				return !0;
			},
			ownKeys(x: HTMLInputElement) {
				return Object.keys(par(x[val]));
			}
		});
	}

export {
	IP
};

export default (el: HTMLInputElement) => {
	let p = new Proxy(el, {
		get(el, key) {

		}
	})
}

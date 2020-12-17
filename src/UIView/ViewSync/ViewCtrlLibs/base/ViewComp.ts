
namespace flowui {

	export class ViewComp {
		host: ViewBase

		init(view: ViewBase) {
			this.host = view
			this.onInit()
			this._enabled = true
			return this
		}

		emit(key: string, data: any) {
			let fKey = `update${key[0].toUpperCase()}${key.substr(1)}`
			if (this[fKey]) {
				this[fKey](data)
			}
		}

		onInit() {
		}

		add() {
			this.onAdd()
			if (this._enabled) {
				this.onEnable()
			}
		}

		onAdd() {

		}

		remove() {
			this.onRemove()
			if (this._enabled) {
				this.onDisable()
			}
		}

		onRemove() {

		}

		onEnable() {

		}
		onDisable() {

		}

		destroy() {
			this.onDestory()
		}
		onDestory() {

		}

		protected _enabled: bool = false
		public get enabled(): bool {
			return this._enabled
		}
		public set enabled(value: bool) {
			if (this._enabled != value) {
				this._enabled = value
				if (this._enabled) {
					this.onEnable()
				} else {
					this.onDisable()
				}
			}
		}

		updateTransform(transform: Transform) {

		}

		getWebPagePosition() {
			return this.host.transform.getWebPagePosition()
		}

		getWorldPosition() {
			return this.host.transform.getWorldPosition()
		}

		getWorldScale() {
			return this.host.transform.getWorldScale()
		}
	}

}

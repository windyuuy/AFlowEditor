
namespace flowui {

	export class ViewComp {
		host: ViewBase

		init(view: ViewBase) {
			this.host = view
			this.onInit()
			this._enabled = true
			return this
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

	}

}

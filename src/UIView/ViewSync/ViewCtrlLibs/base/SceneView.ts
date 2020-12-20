
/// <reference path="ViewBase.ts" />

namespace flowui {

	export class SceneView extends ViewBase {

		protected onInit() {
		}

		protected get viewContainer(): ccs.Layer {
			return this._view as ccs.Layer
		}

		protected setupView() {
			const sceneView = new spritejs.Scene({
				container: this._container,
				width: 1000,
				height: 1000,
			})
			return sceneView
		}

		private initView() {
			let view = this.setupView()
			this.setView(view)

			this.onLoad()
		}

		private _container: HTMLElement
		public get container(): HTMLElement {
			return this._container
		}
		public set container(value: HTMLElement) {
			if (!this._container) {
				this._container = value

				this.initView()
			} else {
				throw new Error("one container only")
			}
		}

	}
}

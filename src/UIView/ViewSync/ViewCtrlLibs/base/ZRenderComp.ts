
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	export class RenderComp extends ViewComp {

		protected viewNode: ccs.Node

		protected setUpView() {
		}

		init(view: ViewBase) {
			this.host = view
			this._enabled = true

			this.setupStyleParams()

			this.onInit()

			this.setUpView()
			this.host.view.appendChild(this.viewNode)

			return this
		}

		onDestory() {
			this.viewNode.remove()
			this.viewNode = null
		}

		protected onEnable() {
			this.viewNode.show()
		}
		protected onDisable() {
			this.viewNode.hide()
		}

		protected setupStyleParams() {
			this._strokeWidth = 1
			this._strokeColor = ""
			this._fillColor = "black"
		}

		protected updateCommonStyleSettings() {
			this.viewNode.attr({
				lineWidth: this.strokeWidth,
				fillColor: this.fillColor,
				strokeColor: this.strokeColor,
			})
		}

		protected _strokeColor: string
		public get strokeColor(): string {
			return this._strokeColor
		}
		public set strokeColor(value: string) {
			this._strokeColor = value

			this.updateStokeColor()
		}

		protected updateStokeColor() {
			this.viewNode.attr({
				strokeColor: this._strokeColor,
			})
		}

		protected _fillColor: string
		public get fillColor(): string {
			return this._fillColor
		}
		public set fillColor(value: string) {
			this._fillColor = value

			this.updateFillColor()
		}

		protected updateFillColor() {
			this.viewNode.attr({
				fillColor: this._fillColor,
			})
		}

		protected _strokeWidth: number
		public get strokeWidth(): number {
			return this._strokeWidth
		}
		public set strokeWidth(value: number) {
			this._strokeWidth = value
		}

	}

}

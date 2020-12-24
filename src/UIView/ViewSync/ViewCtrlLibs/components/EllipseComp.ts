
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	/**
	 * 椭圆
	 */
	export class EllipseComp extends RenderComp {

		protected viewNode: ccs.Ellipse

		protected setupStyleParams() {
			this._strokeWidth = 1
			this._strokeColor = "black"
			this._fillColor = "white"
		}

		/**
		 * 半径
		 */
		public get radius(): number {
			return this._radiusX
		}
		public set radius(value: number) {
			this._radiusX = value
			this._radiusY = value
			this.updateRadius()
		}

		private _radiusX: number
		public get radiusX(): number {
			return this._radiusX
		}
		public set radiusX(value: number) {
			this._radiusX = value
			this.updateRadius()
		}
		private _radiusY: number
		public get radiusY(): number {
			return this._radiusY
		}
		public set radiusY(value: number) {
			this._radiusY = value
			this.updateRadius()
		}

		updateRadius() {
			this.viewNode.attr({
				radiusX: this._radiusX,
				radiusY: this._radiusY,
			})
		}

		onInit() {
			this._radiusX = 1
			this._radiusY = 1
		}

		protected setUpView() {
			const ellipse = new ccs.Ellipse({
				radiusX: this._radiusX,
				radiusY: this._radiusY,
				// startAngle: 0,
				// endAngle: 360,
			});

			this.viewNode = ellipse

			this.updateCommonStyleSettings()
		}

	}

}

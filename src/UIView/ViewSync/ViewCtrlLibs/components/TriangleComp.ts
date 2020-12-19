
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	/**
	 * 三角形
	 */
	export class TriangleComp extends RenderComp {

		onInit() {
			this._halfWidth = 1
		}

		protected viewNode: ccs.Path

		private _halfWidth: number;

		/**
		 * 顶点离垂点距离
		 */
		public get halfWidth(): number {
			return this._halfWidth;
		}
		public set halfWidth(value: number) {
			this._halfWidth = value;

			this.updateContentSize()
		}

		updateContentSize() {
			this.viewNode.attr({
				sides: [this.side1, this.side2],
				angle: toEulerAngle(this.angle),
			})
		}

		private _rotate: number;
		/**
		 * 旋转角度
		 */
		public get rotate(): number {
			return this._rotate;
		}
		public set rotate(value: number) {
			this._rotate = value;

			this.viewNode.attr({
				rotate: this.rotate,
			})
		}

		protected get side2(): number {
			return (this.host.contentSize.height ** 2 + this.halfWidth ** 2) ** 0.5
		}

		protected get side1(): number {
			return this.host.contentSize.width
		}

		protected get angle(): number {
			return Math.atan2(this.host.contentSize.height, this.halfWidth)
		}

		setUpView() {
			let position = this.host.position

			const traingle = new ccs.Triangle({
				pos: [position.x, position.y],
				sides: [this.side1, this.side2],
				angle: toEulerAngle(this.angle),
				fillColor: '#7cc',
			});

			this.viewNode = traingle
		}

	}

}

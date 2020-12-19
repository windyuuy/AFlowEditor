
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	export class ArrowLineComp extends RenderComp {

		protected viewNode: ccs.Path

		onInit() {
			this._beginPos = new Vector2()
			this._endPos = new Vector2()
			this._arrowLength = 2
			this._arrowWidth = 2
			this._lineWidth = 2
		}

		/**
		 * 起始位置
		 */
		private _beginPos: Vector2
		public get beginPos(): Vector2 {
			return this._beginPos
		}
		public set beginPos(value: Vector2) {
			this._beginPos = value

			this.updateShape()
		}
		/**
		 * 结束位置
		 */
		private _endPos: Vector2
		public get endPos(): Vector2 {
			return this._endPos
		}
		public set endPos(value: Vector2) {
			this._endPos = value

			this.updateShape()
		}

		/**
		 * 线宽度
		 */
		private _lineWidth: number = 1
		public get lineWidth(): number {
			return this._lineWidth
		}
		public set lineWidth(value: number) {
			this._lineWidth = value
			this.updateShape()
		}
		/**
		 * 箭头长度
		 */
		private _arrowLength: number = 1
		public get arrowLength(): number {
			return this._arrowLength
		}
		public set arrowLength(value: number) {
			this._arrowLength = value
			this.updateShape()
		}

		/**
		 * 箭头宽度
		 */
		private _arrowWidth: number
		public get arrowWidth(): number {
			return this._arrowWidth
		}
		public set arrowWidth(value: number) {
			this._arrowWidth = value
		}

		protected updateShape() {
			this.viewNode.attr({
				d: this.genRenderPath(),
			})
		}

		protected genRenderPath() {

			let bp = this.beginPos
			let ep2 = this.endPos
			let w2 = this._arrowLength
			let h1 = this._lineWidth
			let h2 = this._arrowWidth

			let dv = ep2.clone().subDown(bp)
			let angle = dv.getRotationZ2()

			// 计算出以原点为出发点,ep1为终点的图形
			let ep1 = dv.clone().rotateSelfByZero2(-angle)
			let bp1 = new Vector2(0, 0)
			let points: Vector2[] = _ShareArray()
			points.push(new Vector2(ep1.x - w2, h1 / 2))
			points.push(new Vector2(ep1.x - w2, h2 / 2))
			points.push(new Vector2(ep1.x, 0))
			points.push(new Vector2(ep1.x - w2, -h2 / 2))
			points.push(new Vector2(ep1.x - w2, -h1 / 2))
			points.push(new Vector2(bp1.x, -h1 / 2))
			points.push(new Vector2(bp1.x, h1 / 2))
			points.forEach(pt => {
				// 旋转回dv方向,并叠上bp起点
				pt.rotateSelfByZero2(angle).addUp(bp)
			})
			let p0 = points[points.length - 1]
			let line0 = `M${p0.x},${p0.y}`
			let line1 = points.map(pt => {
				return `L${pt.x},${pt.y}`
			}).join('')
			let line2 = line0 + line1
			return line2
		}

		setUpView() {
			const p1 = new ccs.Path();
			p1.attr({
				d: this.genRenderPath(),
			});

			this.viewNode = p1

			this.updateCommonStyleSettings()

		}

	}

}

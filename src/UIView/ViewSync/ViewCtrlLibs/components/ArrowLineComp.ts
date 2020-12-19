
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	export class ArrowLineComp extends RenderComp {

		protected viewNode: ccs.Path

		onInit() {
			this.beginPos = new Vector2()
			this.endPos = new Vector2()

			this.beginPos.x = -100
			this.endPos.x = -10
			this.endPos.y = 120
		}

		/**
		 * 起始位置
		 */
		beginPos: Vector2
		/**
		 * 结束位置
		 */
		endPos: Vector2

		protected genRenderPath() {

			let bp = this.beginPos
			let ep2 = this.endPos
			let w1 = 20
			let h1 = 10
			let h2 = 40

			let dv = ep2.clone().subDown(bp)
			let angle = dv.getRotationZ2()

			// 计算出以原点为出发点,ep1为终点的图形
			let ep1 = dv.clone().rotateSelfByZero2(-angle)
			let bp1 = new Vector2(0, 0)
			let points: Vector2[] = _ShareArray()
			points.push(new Vector2(ep1.x - w1, h1 / 2))
			points.push(new Vector2(ep1.x - w1, h2 / 2))
			points.push(new Vector2(ep1.x, 0))
			points.push(new Vector2(ep1.x - w1, -h2 / 2))
			points.push(new Vector2(ep1.x - w1, -h1 / 2))
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
				strokeColor: '#033',
				fillColor: '#839',
				lineWidth: 1,
				pos: [0, 0],
			});

			this.viewNode = p1
		}

	}

}

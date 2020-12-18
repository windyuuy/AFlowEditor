
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	export class LineComp extends RenderComp {

		protected viewNode: ccs.Path

		onInit() {
			this.beginPos = new Vector2()
			this.endPos = new Vector2()

			this.beginPos.x = -100
			this.endPos.x = 0
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
			let ep = this.endPos
			let w1 = 20
			let h1 = 10
			let h2 = 40

			return `M${bp.x},${h1 / 2}L${ep.x - w1},${h1 / 2}L${ep.x - w1},${h2 / 2}
					L${ep.x},${0}
					L${ep.x - w1},${-h2 / 2}L${ep.x - w1},${-h1 / 2}L${bp.x},${-h1 / 2}
					L${bp.x},${h1 / 2}
					`
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

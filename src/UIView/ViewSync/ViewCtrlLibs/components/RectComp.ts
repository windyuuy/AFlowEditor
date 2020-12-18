
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	export class RectComp extends RenderComp {

		protected viewNode: ccs.Path

		get contentSize() {
			return this.host.contentSize
		}

		get radius(): number {
			let size = this.contentSize
			let min = Math.min(size.width, size.height) / 4
			min = Math.min(20, min)
			return min
		}

		protected genRenderPath() {
			let size = this.contentSize

			let radius = this.radius || 0
			let halfWidth = size.width / 2
			let halfWidth2 = size.width / 2 - radius
			let halfH = size.height / 2
			let halfH2 = size.height / 2 - radius

			return `M${-halfWidth2},${halfH}
					L${halfWidth2},${halfH}A${radius},${radius},0,0,0,${halfWidth},${halfH2}
					L${halfWidth},${-halfH2}A${radius},${radius},90,0,0,${halfWidth2},${-halfH}
					L${-halfWidth2},${-halfH}A${radius},${radius},0,0,0,${-halfWidth},${-halfH2}
					L${-halfWidth},${halfH2}A${radius},${radius},90,0,0,${-halfWidth2},${halfH}
					`
		}

		protected updateContentSize() {
			this.viewNode.attr({
				d: this.genRenderPath(),
			})
		}

		setUpView() {

			const p1 = new ccs.Path();
			p1.attr({
				d: this.genRenderPath(),
				strokeColor: '#033',
				fillColor: '#839',
				lineWidth: 4,
				pos: [0, 0],
			});

			this.viewNode = p1
		}

	}

}


/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	/**
	 * 矩形
	 */
	export class RectComp extends RenderComp {

		protected viewNode: ccs.Rect

		onInit() {
		}

		protected setupStyleParams() {
			this._strokeWidth = 1
			this._strokeColor = "black"
			this._fillColor = "white"
		}

		updateContentSize() {
			let size = this.host.contentSize
			this.viewNode.attr({
				pos: [-size.width / 2, -size.height / 2,],
				size: [size.width, size.height,],
			})
		}

		protected setUpView() {
			let size = this.host.contentSize
			const viewNode = new ccs.Rect({
				pos: [-size.width / 2, -size.height / 2,],
				size: [size.width, size.height,],
			});

			this.viewNode = viewNode

			this.updateCommonStyleSettings()
		}

	}

}

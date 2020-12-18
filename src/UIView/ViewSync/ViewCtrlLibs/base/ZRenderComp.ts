
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	export class RenderComp extends ViewComp {

		protected viewNode: ccs.Node

		setUpView() {
		}

		init(view: ViewBase) {
			this.host = view
			this._enabled = true
			this.onInit()

			this.setUpView()
			this.host.view.appendChild(this.viewNode)

			return this
		}

		onEnable() {
			this.viewNode.show()
		}
		onDisable() {
			this.viewNode.hide()
		}

	}

}

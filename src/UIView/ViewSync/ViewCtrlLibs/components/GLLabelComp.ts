
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {

	/**
	 * 椭圆
	 */
	export class GLLabelComp extends RenderComp {

		protected viewNode: ccs.Label

		private _text: string;
		public get text(): string {
			return this._text;
		}
		public set text(value: string) {
			this._text = value;
			this.updateText()
		}

		protected updateText() {
			this.viewNode.attr({
				text: this._text,
			})
		}

		onInit() {
			this._text = ""
		}

		protected setUpView() {
			const view = new ccs.Label(this._text);
			view.attr({
				anchor: [0.5, 0.5],
			})

			this.viewNode = view

			this.updateCommonStyleSettings()
		}

	}

}

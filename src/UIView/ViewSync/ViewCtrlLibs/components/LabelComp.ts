
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {
	const $ = jquery

	/**
	 * 原生label
	 */
	export class LabelComp extends RenderComp {

		init(view: ViewBase) {
			this.host = view
			this._enabled = true
			this._text = ""
			this.onInit()
			return this
		}

		onInit() {
			this.initView();
		}

		private _text: string;
		public get text(): string {
			return this._text || ""
		}
		public set text(value: string) {
			this._text = value;

			this.updateText()
		}

		get editorId() {
			return this.host.oid.replace(/\#/g, "__")
		}

		/**
		 * 初始化视图
		 */
		protected initView() {
			let editorId = this.editorId;
			// < p class="input" contenteditable = "true" style = "overflow-y:auto;overflow-x: hidden; " > </p>
			let p1 = $(`
		<div id="${editorId}" class="label-container" style="position: absolute; top: 0px; left: 0px; transform: translate(-50%,-40%);">
			<div class="scaleNode">
				<p class="label" value="" ></p>
			</div>
		</div>`);
			$("#editors").append(p1);

			let p1Text = p1.find(".scaleNode").find(".label")

			this.updateText();
			this.updateTransform();

			this.viewNode = new ccs.Group()
		}

		updateText() {
			let p1Text = $(`#${this.editorId}`).find(".scaleNode").find(".label")
			p1Text.text(this._text)
		}

		updateTransform() {
			let worldPosition = this.webPagePosition
			let worldScale = this.worldScale
			let p1 = $(`#${this.editorId}`)
			let pScale = p1.find(".scaleNode")
			p1.css("left", worldPosition.x)
			p1.css("top", worldPosition.y)
			pScale.css("transform", `scale(${worldScale.x},${worldScale.y})`)
		}

	}

}

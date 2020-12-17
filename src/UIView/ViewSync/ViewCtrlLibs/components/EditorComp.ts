
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {
	const $ = jquery

	export class EditorComp extends ViewComp {
		protected labelView: spritejs.Label

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

		onEnable() {

			let labelView = new spritejs.Label()
			labelView.attr({
				anchor: [0.5, 0.5],
				pos: [0, 0],
			})
			let parent = this.host.view.parent as spritejs.Group
			parent.appendChild(labelView)
			this.labelView = labelView

			let worldPosition = this.getWorldPosition()
			// $(function () {
			// 	$('<div />', {
			// 		id: self.host.oid,
			// 		name: 'editor-container',
			// 		type: 'div',
			// 		textContent: self["label"],
			// 	}).appendTo($('#editors'));
			// 	$('<p />', {
			// 		name: 'editor',
			// 		type: 'p',
			// 		textContent: self["label"],
			// 	}).appendTo($('#editors'));
			// });
			// const $ = require("jquery")
			let editorId = this.editorId
			let p1 = $(`
		<div id="${editorId}" class="topic-container" style="position: absolute; top: 0px; left: 0px; transform: translate(-50%,-40%);">
			<div class="scaleNode">
				<p class="input" contenteditable="true" style="overflow-y:auto;overflow-x: hidden; "></p>
			</div>
		</div>`)
			$("#editors").append(p1)

			this.updateText()

			this.updateTransform()
		}

		onDisable() {
			$("#editor").remove(`#${this.editorId}`)
		}

		updateText() {
			let p1Text = $(`#${this.editorId}`).find(".scaleNode").find(".input")
			p1Text.text(this._text)

			this.labelView.attr({
				text: this._text,
			})
		}

		updateTransform() {
			let worldPosition = this.getWebPagePosition()
			let worldScale = this.getWorldScale()
			let p1 = $(`#${this.editorId}`)
			let pScale = p1.find(".scaleNode")
			p1.css("left", worldPosition.x)
			p1.css("top", worldPosition.y)
			pScale.css("transform", `scale(${worldScale.x},${worldScale.y})`)

			let pos = this.host.position
			let scale = this.host.scale
			this.labelView.attr({
				pos: [pos.x, pos.y,],
				scale: [scale.x, scale.y,],
			})
		}

	}

}

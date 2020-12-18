
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {
	const $ = jquery

	export class EditorComp extends ViewComp {

		compName = "editorcomp"

		onInit() {
			this.timer = new lang.Intervals().init()
		}

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

			this.initView();
			this.initEvent()

		}

		protected timer: lang.Intervals
		/**
		 * 初始化事件
		 */
		protected clickTimes: number = 0
		resetClickTimer() {
			this.timer.clearNamedInterval(this.compName)
			this.timer.setNamedInterval(this.compName, () => {
				this.clickTimes = Math.max(this.clickTimes - 1, 0)
			}, 200)
		}
		protected initEvent() {
			this.onNamedEvent(this.compName, UIEventKey.click, (evt) => {
				this.clickTimes++
				this.resetClickTimer()

				if (this.clickTimes >= 2) {
					if (this.onDoubleClick()) {
						this.clickTimes = 0
					}
				}
			})
			this.resetClickTimer()
		}

		onDoubleClick() {
			this.isWritable = true
			return true
		}

		releaseEvent() {
			this.offNameEvent(this.compName)
			this.timer.clearAllInterval()
		}

		/**
		 * 初始化视图
		 */
		private initView() {
			let labelView = new spritejs.Label();
			labelView.attr({
				anchor: [0.5, 0.5],
				pos: [0, 0],
				pointerEvents: "none",
			});
			let parent = this.host.view.parent as spritejs.Group;
			parent.appendChild(labelView);
			this.labelView = labelView;

			let editorId = this.editorId;
			// < p class="input" contenteditable = "true" style = "overflow-y:auto;overflow-x: hidden; " > </p>
			let p1 = $(`
		<div id="${editorId}" class="topic-container" style="position: absolute; top: 0px; left: 0px; transform: translate(-50%,-40%);">
			<div class="scaleNode">
				<textarea class="input" style="width:500px;height:300px;overflow-y:hidden;overflow-x:hidden;" value=""></textarea>
			</div>
		</div>`);
			$("#editors").append(p1);

			let p1Text = p1.find(".scaleNode").find(".input")
			const self = this;
			p1Text.on('input propertychange', (evt) => {
				self._text = evt.target["value"];

				self.updateText();
				// let p1Text = $(`#${self.editorId}`).find(".scaleNode").find(".input");
				p1Text.css("height", function () {
					return p1Text[0].scrollHeight - 4;
				});
				p1Text.css("width", function () {
					return p1Text[0].scrollWidth - 4;
				});
			});

			p1Text.on("blur", (evt) => {
				this.isWritable = false
			})

			this.updateText();
			this.updateTransform();

			this.isWritable = false;
		}

		onDisable() {
			$("#editor").remove(`#${this.editorId}`)
		}

		updateText() {

			// this.labelView.attr({
			// 	text: this._text,
			// })
			this.labelView.text = this._text
			this.labelView.updateText()

			let p1Text = $(`#${this.editorId}`).find(".scaleNode").find(".input")
			p1Text.val(this._text)
		}

		get textArea() {
			let p1Text = $(`#${this.editorId}`).find(".scaleNode").find(".input")
			return p1Text
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

		private _isWritable: bool = false;
		public get isWritable(): bool {
			return this._isWritable;
		}
		public set isWritable(value: bool) {
			this._isWritable = value;

			if (this._isWritable) {
				this.enterWriteMode()
			} else {
				this.enterReadMode()
			}
		}

		protected enterReadMode() {
			this.labelView.show()

			let p1 = $(`#${this.editorId}`)
			p1.hide()

		}

		protected enterWriteMode() {
			this.labelView.hide()

			let p1 = $(`#${this.editorId}`)
			p1.show()

			this.textArea.focus()
		}

	}

}

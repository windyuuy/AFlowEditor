
/// <reference path="../../../../deps/jquery/jquery.js" />

namespace flowui {
	const $ = jquery

	export enum EditorEvent {
		enteredit = "enteredit",
		leaveedit = "leaveedit",
	}

	export class EditorComp extends RenderComp {

		event: lang.event.SEvent<any>

		init(view: ViewBase) {
			this.host = view
			this._enabled = true
			this._hint = "点我输入..."
			this._text = ""
			this.event = new lang.event.SEvent<any>()
			this.onInit()
			return this
		}

		onInit() {
			this.timer = new lang.Intervals().init()

			this.initView();
		}

		releaseView() {
			$("#editor").remove(`#${this.editorId}`)

			this.viewNode.remove()
			this.viewNode = null
		}

		onDestory() {
			this.releaseView()
		}

		protected viewNode: spritejs.Label

		/**
		 * 最大文本宽度
		 */
		maxCountPerLine: number = 100

		/**
		 * 自动折叠
		 */
		autoWrap: bool = true

		/**
		 * 可自动交互
		 */
		autoInteractive: bool = true

		/**
		 * 提示文本
		 */
		protected _hint: string
		public get hint(): string {
			return this._hint
		}
		public set hint(value: string) {
			this._hint = value

			this.updateText()
		}

		private _text: string;
		public get text(): string {
			return this._text || ""
		}
		public set text(value: string) {
			this._text = value;

			this.updateText()
		}

		protected get showingText() {
			let showText = this._text || this._hint
			if (showText.length > 10) {
				showText = showText.trim().slice(0, 6) + " ..."
			}
			return showText
		}

		get editorId() {
			return this.host.oid.replace(/\#/g, "__")
		}

		onEnable() {
			this.initEvent()
		}

		onDisable() {
			this.releaseEvent()
		}

		protected timer: lang.Intervals
		/**
		 * 初始化事件
		 */
		protected clickTimes: number = 0
		resetClickTimer() {
			this.timer.clearNamedInterval(this.typeName)
			this.timer.setNamedInterval(this.typeName, () => {
				this.clickTimes = Math.max(this.clickTimes - 1, 0)
			}, 200)
		}
		protected initEvent() {
			this.onNamedEvent(this.typeName, UIEventKey.click, (evt) => {
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
			if (this.autoInteractive) {
				this.isWritable = true
			}
			return true
		}

		releaseEvent() {
			this.offNameEvent(this.typeName)
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
			let parent = this.host.view
			parent.appendChild(labelView);
			this.viewNode = labelView;

			let editorId = this.editorId;
			// < p class="input" contenteditable = "true" style = "overflow-y:auto;overflow-x: hidden; " > </p>
			let p1 = $(`
		<div id="${editorId}" class="editor-container" style="position: absolute; top: 0px; left: 0px; transform: translate(-50%,-40%);">
			<div class="scaleNode">
				<textarea class="input" style="overflow:auto;word-break:break-all;" cols="20" value="" ></textarea>
			</div>
		</div>`);
			$("#editors").append(p1);

			let p1Text = p1.find(".scaleNode").find(".input")
			const self = this;
			p1Text.on('input propertychange', (evt) => {
				self._text = evt.target["value"];

				self.updateText();
			});

			p1Text.on("blur", (evt) => {
				this.isWritable = false
			})

			this.updateText();
			this.updateTransform();

			this.isWritable = false;
		}

		updateEditorSize() {
			const self = this;
			let p1Text = $(`#${self.editorId}`).find(".scaleNode").find(".input");
			p1Text.css("width", function () {
				let content = p1Text.val().toString()
				let lines = content.split("\n")
				let maxLine = lang.helper.ArrayHelper.max(lines, l => l.length)
				let maxCount = Math.min(maxLine.length, self.maxCountPerLine)

				maxCount = Math.max(maxCount, 0)
				p1Text.attr({
					cols: "" + maxCount,
				})

				// TODO: 待改进
				setTimeout(() => {
					if (p1Text[0].scrollHeight > 0) {
						p1Text.css("height", function () {
							return p1Text[0].scrollHeight - 4;
						});
					}
				}, 100)
			});
		}

		updateText() {
			this.viewNode.text = this.showingText
			this.viewNode.updateText()

			let p1Text = $(`#${this.editorId}`).find(".scaleNode").find(".input")
			p1Text.val(this._text)
			p1Text.attr({
				placeholder: this.showingText,
			})

			this.updateEditorSize()
		}

		get textArea() {
			let p1Text = $(`#${this.editorId}`).find(".scaleNode").find(".input")
			return p1Text
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
			this.viewNode.show()

			let p1 = $(`#${this.editorId}`)
			p1.val(this._text)
			p1.hide()

			this.event.emit(EditorEvent.leaveedit, {})
		}

		protected enterWriteMode() {
			this.viewNode.hide()

			let p1 = $(`#${this.editorId}`)
			p1.val(this._text)
			p1.show()

			this.textArea.focus()

			this.event.emit(EditorEvent.enteredit, {})
		}

	}

}

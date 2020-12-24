
namespace flowui {

	export enum MouseEvent {
		click = "click",
		doubleclick = "doubleclick",
	}

	export class MouseAreaComp extends RenderComp {

		event: lang.event.SEvent<any>

		init(view: ViewBase) {
			this.host = view
			this._enabled = true
			this.event = new lang.event.SEvent<any>()
			this.onInit()
			return this
		}

		onInit() {
			this.timer = new lang.Intervals().init()
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
				this.onClick()

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

		onClick() {
			this.event.emit(MouseEvent.click, {})
		}

		onDoubleClick() {
			this.event.emit(MouseEvent.doubleclick, {})
			return true
		}

		releaseEvent() {
			this.offNameEvent(this.typeName)
			this.timer.clearAllInterval()
		}

	}

}

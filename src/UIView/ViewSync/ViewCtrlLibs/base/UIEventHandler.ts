/// <reference path="../../../../basic/Guesture.ts" />

namespace flowui {

	import GuestureAnalyzer = kitten.guesture.GuestureAnalyzer
	import DragGuestureInfo = kitten.guesture.DragGuestureInfo

	export import UIEvent = spritejs.Event
	export import EventOptions = spritejs.EventOptions

	export class UIEventHandlerA {
		view: spritejs.Node
		guestureAnalyzer: GuestureAnalyzer

		init(view: spritejs.Node) {
			let guestureAnalyzer = new GuestureAnalyzer().init()
			this.guestureAnalyzer = guestureAnalyzer

			this.view = view

			view.addEventListener(UIEventKey.mousedown, (evt => {
				let vec = new Vector3()
				vec.x = evt.x
				vec.y = evt.y
				guestureAnalyzer.inputTouchPoints(true, [vec])

				this.updateMouseInput(UIEventKey.mousedown)
			}))
			view.addEventListener(UIEventKey.mousemove, (evt) => {
				let vec = new Vector3()
				vec.x = evt.x
				vec.y = evt.y
				guestureAnalyzer.inputTouchPoints(true, [vec])

				this.updateMouseInput(UIEventKey.mousemove)
			})
			view.addEventListener(UIEventKey.mouseup, (evt) => {
				let vec = new Vector3()
				vec.x = evt.x
				vec.y = evt.y
				guestureAnalyzer.inputTouchPoints(false, [vec])

				this.updateMouseInput(UIEventKey.mouseup)
			})

			this._eventCallbacks = new lang.event.SEvent<UIEvent>()

			return this
		}

		protected _eventCallbacks: lang.event.SEvent<UIEvent>

		onEvent(key: UIEventKey, call: (event: UIEvent) => void, options?: EventOptions) {
			if (key in DefaultUIEventKey) {
				this.view.addEventListener(key, call, options)
			} else {
				this._eventCallbacks.on(key, call)
			}
		}

		offEvent(key: UIEventKey, call: (event: UIEvent) => void, options?: EventOptions) {
			this.view.removeEventListener(key, call)
			this._eventCallbacks.off(key, call)
		}

		protected isDraging: boolean = false

		updateMouseInput(key: UIEventKey) {
			const guestureAnalyzer = this.guestureAnalyzer
			if (this._eventCallbacks.exist(UIEventKey.dragmove)) {
				let info = guestureAnalyzer.getCurrentGuesture()
				if (info instanceof DragGuestureInfo) {
					let pt = info.getOldPoint()

					const data = {
						x: pt.x,
						y: pt.y,
					} as any

					if (!this.isDraging) {
						let beginPos = info.getOldPoint()
						this._eventCallbacks.emit(UIEventKey.dragbegin, {
							x: beginPos.x,
							y: beginPos.y,
						} as any)
						this._eventCallbacks.emit(UIEventKey.dragmove, data)
					} else if (key == UIEventKey.mouseup) {
						this._eventCallbacks.emit(UIEventKey.dragmove, data)
						this._eventCallbacks.emit(UIEventKey.dragend, data)
					} else[
						this._eventCallbacks.emit(UIEventKey.dragmove, data)
					]
				}
			}
		}
	}

	export class EventListenrInfo {
		name: string
		key: UIEventKey
		call: (evt: UIEvent) => void
		options?: EventOptions
	}

	export class UIEventHandler extends UIEventHandlerA {
		eventInfos: Table<EventListenrInfo>
		init(view: spritejs.Node) {
			this.eventInfos = CleanTable(this.eventInfos)
			return super.init(view)
		}
		onNamedEvent(name: string, key: UIEventKey, call: (evt: UIEvent) => void, options?: EventOptions) {
			let eventInfo = new EventListenrInfo()
			eventInfo.name = name
			eventInfo.key = key
			eventInfo.call = call
			eventInfo.options = options
			this.eventInfos[name] = eventInfo
			this.onEvent(key, call, options)
		}
		offNameEvent(name: string) {
			let eventInfo = this.eventInfos[name]
			this.offEvent(eventInfo.key, eventInfo.call, eventInfo.options)
			delete this.eventInfos[name]
		}
		onClick(call: (event) => void) {
			return this.onEvent(UIEventKey.click, call)
		}

		onDragMove(call: (event) => void) {
			return this.onEvent(UIEventKey.dragmove, call)
		}
	}

}

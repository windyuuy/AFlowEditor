
namespace flowui {

	export enum DragEvent {
		dragbegin = "dragbegin",
		dragmove = "dragmove",
		dragend = "dragend",
	}

	export class DragableComp extends ViewComp {

		touchLayer: LayerView = null

		hostPos: Vector2 = new Vector2()
		beginPos: Vector2 = new Vector2()
		curPos: Vector2 = new Vector2()
		isDraging: bool = false
		isFollowDrag: bool = true

		/**
		 * 阻止事件冒泡
		 */
		stopPropagation: bool = true

		event: lang.event.SEvent<any>

		onInit() {
			this.event = new lang.event.SEvent<any>()
		}

		protected toStopPropagation(evt: UIEvent) {
			if (this.stopPropagation) {
				evt.stopPropagation()
			}
		}

		onAdd() {
			const touchLayer = dataManager.getTypeFeatureGroup(TouchLayerView)[0]
			this.touchLayer = touchLayer

			// listen self
			this.host.event.onNamedEvent(this.typeName, UIEventKey.mousedown, (evt) => {
				this.isDraging = true

				this.toStopPropagation(evt)
			})
			this.host.event.onNamedEvent(this.typeName, UIEventKey.mouseup, (evt) => {
				this.isDraging = false

				this.toStopPropagation(evt)
			})

			// listen layer
			touchLayer.event.onNamedEvent(this.typeName, UIEventKey.mousedown, (evt) => {
				this.toStopPropagation(evt)

				this.beginPos.x = evt.x
				this.beginPos.y = evt.y
				this.curPos.merge(this.beginPos)
				this.hostPos = this.host.position.clone()

				this.onDragBegin()
			})
			touchLayer.event.onNamedEvent(this.typeName, UIEventKey.mousemove, (evt) => {
				this.toStopPropagation(evt)
				this.curPos.x = evt.x
				this.curPos.y = evt.y

				this.onDrag()

			})
			touchLayer.event.onNamedEvent(this.typeName, UIEventKey.mouseup, (evt) => {
				this.toStopPropagation(evt)
				this.isDraging = false
				this.curPos.x = evt.x
				this.curPos.y = evt.y

				this.onDrag()
				this.onDragEnd()

			})
		}

		onRemove() {
			this.touchLayer.event.offNameEvent(this.typeName)
		}

		onDrag() {
			if (this._enabled) {
				if (this.isDraging) {
					if (this.isFollowDrag) {
						let offset: Vector2 = this.curPos.clone().subDown(this.beginPos)
						let scale = this.touchLayer.scale
						let scaledPos = new Vector2(offset.x / scale.x, offset.y / scale.y).addUp(this.hostPos)
						this.host.position = scaledPos
					}

					this.host.event.emit("onDragUpdate", {
						target: this,
					})

					this.event.emit(DragEvent.dragmove, {})

					this.host["onUpdateTransform"](true)
				}
			}
		}

		onDragBegin() {
			this.event.emit(DragEvent.dragbegin, {})
		}

		onDragEnd() {
			this.event.emit(DragEvent.dragend, {})
			this.host["onUpdateTransform"](true)
		}

	}

}

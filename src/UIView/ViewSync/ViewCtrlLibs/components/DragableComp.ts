
namespace flowui {

	export class DragableComp extends ViewComp {

		touchLayer: LayerView = null

		hostPos: Vector2 = new Vector2()
		beginPos: Vector2 = new Vector2()
		curPos: Vector2 = new Vector2()
		isDraging: bool = false

		onAdd() {
			const touchLayer = dataManager.getTypeFeatureGroup(TouchLayerView)[0]
			this.touchLayer = touchLayer

			// listen self
			this.host.event.onNamedEvent(this.typeName, UIEventKey.mousedown, (evt) => {
				this.isDraging = true
			})
			this.host.event.onNamedEvent(this.typeName, UIEventKey.mouseup, (evt) => {
				this.isDraging = false
			})

			// listen layer
			touchLayer.event.onNamedEvent(this.typeName, UIEventKey.mousedown, (evt) => {
				this.beginPos.x = evt.x
				this.beginPos.y = evt.y
				this.curPos.merge(this.beginPos)
				this.hostPos = this.host.position.clone()
			})
			touchLayer.event.onNamedEvent(this.typeName, UIEventKey.mousemove, (evt) => {
				this.curPos.x = evt.x
				this.curPos.y = evt.y

				this.onDrag()
			})
			touchLayer.event.onNamedEvent(this.typeName, UIEventKey.mouseup, (evt) => {
				this.isDraging = false
				this.curPos.x = evt.x
				this.curPos.y = evt.y

				this.onDrag()
			})
		}

		onRemove() {
			this.touchLayer.event.offNameEvent(this.typeName)
		}

		onDrag() {
			if (this._enabled) {
				if (this.isDraging) {
					let offset: Vector2 = this.curPos.clone().subDown(this.beginPos)
					let scale = this.touchLayer.scale
					let scaledPos = new Vector2(offset.x / scale.x, offset.y / scale.y).addUp(this.hostPos)
					this.host.position = scaledPos
					this.host["onUpdateTransform"](true)
				}
			}
		}
	}

}

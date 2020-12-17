
namespace flowui {

	export class DragableComp extends ViewComp {

		touchLayer: LayerView = null

		beginPos: Vector2 = new Vector2()
		curPos: Vector2 = new Vector2()
		isDraging: bool = false

		onAdd() {
			const touchLayer = dataManager.getTypeFeatureGroup(TouchLayerView)[0]
			this.touchLayer = touchLayer

			touchLayer.event.onNamedEvent("dragcomp", UIEventKey.mousedown, (evt) => {
				this.isDraging = true
				this.beginPos.x = evt.x
				this.beginPos.y = evt.y
				this.curPos.merge(this.beginPos)
			})
			touchLayer.event.onNamedEvent("dragcomp", UIEventKey.mousemove, (evt) => {
				this.curPos.x = evt.x
				this.curPos.y = evt.y

				this.onDrag(this.curPos)
			})
			touchLayer.event.onNamedEvent("dragcomp", UIEventKey.mouseup, (evt) => {
				this.isDraging = false
				this.curPos.x = evt.x
				this.curPos.y = evt.y

				this.onDrag(this.curPos)
			})
		}

		onRemove() {
			this.touchLayer.event.offNameEvent("dragcomp")
		}

		onDrag(pos: Vector2) {
			if (this._enabled) {
				if (this.isDraging) {
					this.host.position = pos
				}
			}
		}
	}

}

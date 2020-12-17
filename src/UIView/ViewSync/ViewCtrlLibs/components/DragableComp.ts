
namespace flowui {

	export class DragableComp extends ViewComp {

		beginPos: Vector2 = new Vector2()
		curPos: Vector2 = new Vector2()

		onAdd() {
			this.view.event.onNamedEvent("dragcomp", UIEventKey.mousedown, (evt) => {
				this.beginPos.x = evt.x
				this.beginPos.y = evt.y
				this.curPos.merge(this.beginPos)
			})
			this.view.event.onNamedEvent("dragcomp", UIEventKey.mousemove, (evt) => {
				this.curPos.x = evt.x
				this.curPos.y = evt.y

				this.onDrag(this.curPos)
			})
			this.view.event.onNamedEvent("dragcomp", UIEventKey.mouseup, (evt) => {
				this.curPos.x = evt.x
				this.curPos.y = evt.y

				this.onDrag(this.curPos)
			})
		}

		onRemove() {
			this.view.event.offNameEvent("dragcomp")
		}

		onDrag(pos: Vector2) {
			if (this._enabled) {
				this.view.position = pos
			}
		}
	}

}

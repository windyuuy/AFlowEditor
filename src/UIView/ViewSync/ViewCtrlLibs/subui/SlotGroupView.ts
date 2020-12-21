
namespace flowui {
	export class SlotGroupView extends NodeView {
		groupView: NodeView

		onLoad() {
			this._slotCount = 0
			this.groupView = this.createChild(null, [RectComp, DragableComp])
			const groupView = this.groupView
			const rectComp = groupView.getComp(RectComp)
			this.groupView.width = 40
			this.groupView.height = 40

		}

		private _slotCount: number
		public get slotsCount(): number {
			return this._slotCount
		}
		public set slotsCount(value: number) {
			this._slotCount = value
			this.groupView.height = 40 + value * 10
		}
	}
}
